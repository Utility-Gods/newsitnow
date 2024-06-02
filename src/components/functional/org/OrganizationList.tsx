import { delete_organization } from "@lib/service/organization";
import {
  Component,
  createEffect,
  For,
  mergeProps,
  Show,
  createSignal,
} from "solid-js";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import { BadgeDelta } from "~/components/ui/badge-delta";

import { showToast } from "~/components/ui/toast";
import Trash from "@lib/icons/Trash";
import { useNavigate } from "@solidjs/router";
import TableRowSkeleton from "@components/bare/common/TableRowSkeleton";
import ThreeDots from "@lib/icons/ThreeDots";
import Link from "@lib/icons/link";
import Edit from "@lib/icons/Edit";

import PageSpinner from "~/components/bare/common/PageSpinner";

export type OrganizationListProps = {
  organizationList: any;
  refetch: () => void;
};

const OrganizationList: Component<OrganizationListProps> = (props) => {
  const merged = mergeProps(props);
  const { organizationList, refetch } = merged;

  const [loading, setLoading] = createSignal(false);
  const navigate = useNavigate();

  async function handle_delete_organization(id: string) {
    try {
      setLoading(true);
      const result = await delete_organization(id);

      console.log("deleting organization", result);
      if (result?.isOk()) {
        refetch();
        showToast({
          variant: "success",
          title: "Organization deleted",
          duration: 5000,
          description: "Organization has been deleted successfully",
        });
      }

      if (result?.isErr()) {
        showToast({
          title: "Some error occured",
          duration: 5000,
          description: "Could not delete organization, please try again later",
          variant: "error",
        });
      }
    } catch (e) {
      console.log(e);
      showToast({
        variant: "error",
        duration: 5000,
        title: "Failed to delete organization",
        description: "An error occurred while deleting the organization",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div class="shadow-md bg-white">
      <Table class="border border-border">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Creator</TableHead>
            <TableHead>Status</TableHead>
            <TableHead class="text-right">Created</TableHead>
            <TableHead class=" text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <Show when={organizationList()?.isErr()}>
            <TableRow>
              <TableCell colspan={5} class="text-center text-error-foreground">
                {organizationList()?.error?.message}
              </TableCell>
            </TableRow>
          </Show>
          <Show
            when={!organizationList.loading}
            fallback={<TableRowSkeleton />}
          >
            <Show when={organizationList()?.isOk()}>
              <Show when={organizationList()?.value?.length === 0}>
                <TableRow>
                  <TableCell colspan={5} class="text-center">
                    No organizations found
                  </TableCell>
                </TableRow>
              </Show>
              <For each={organizationList()?.value}>
                {(c) => (
                  <TableRow
                    onClick={() => navigate(`${c.org_id}`)}
                    class="cursor-pointer"
                  >
                    <TableCell class="font-semibold">{c.name}</TableCell>
                    <TableCell class="text-truncate">
                      <div class="allow-3-lines">{c.description}</div>
                    </TableCell>
                    <TableCell>{c.creator.username}</TableCell>
                    <TableCell>
                      <BadgeDelta deltaType={"increase"}>Active</BadgeDelta>
                    </TableCell>
                    <TableCell class="text-right">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell class="text-right gap-2 flex justify-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <div class="w-6 h-6 rotate-90">
                            <ThreeDots />
                          </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            class="text-primary-foreground flex items-center gap-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log("navigating to", c);
                              navigate(`${c.id}`);
                            }}
                          >
                            <div class="w-4 h-4">
                              <Link />
                            </div>
                            View members
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {}}
                            class="text-primary-foreground flex items-center gap-2"
                          >
                            <div class="w-4 h-4">
                              <Edit />
                            </div>
                            Edit
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            class="text-primary-foreground focus:bg-error-foreground flex items-center gap-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              handle_delete_organization(c.id);
                            }}
                          >
                            <div class="w-4 h-4">
                              <Trash />
                            </div>
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )}
              </For>
            </Show>
          </Show>
        </TableBody>
      </Table>

      <Show when={loading()}>
        <PageSpinner />
      </Show>
    </div>
  );
};

export default OrganizationList;
