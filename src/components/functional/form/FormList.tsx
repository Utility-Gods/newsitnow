import { delete_form, update_form } from "@lib/service/form";
import { Component, createSignal, For, mergeProps, Show } from "solid-js";
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

import Trash from "@lib/icons/Trash";
import { showToast } from "~/components/ui/toast";

import { useNavigate, useParams } from "@solidjs/router";
import PageSpinner from "~/components/bare/common/PageSpinner";

import TableRowSkeleton from "~/components/bare/common/TableRowSkeleton";
import ThreeDots from "@lib/icons/ThreeDots";

import Edit from "@lib/icons/Edit";
import Link from "@lib/icons/link";
import { Button } from "~/components/ui/button";

import Hidden from "@lib/icons/Hidden";
import { get_user_id } from "@lib/utils";

export type FormListProps = {
  formList: any;
  refetch: () => void;
};

const FormList: Component<FormListProps> = (props) => {
  const merged = mergeProps(props);

  const params = useParams();
  const org_id = () => params.org_id;

  const { formList, refetch } = merged;

  const navigate = useNavigate();

  const [loading, setLoading] = createSignal(false);

  const user_id = () => get_user_id();

  async function handle_delete_form(id: string) {
    try {
      setLoading(true);
      const result = await delete_form(id);

      if (result?.isOk()) {
        refetch();
        showToast({
          variant: "success",
          title: "Form deleted",
          duration: 5000,
          description: "Form has been deleted successfully",
        });
      }

      if (result?.isErr()) {
        showToast({
          title: "Some error occured",
          duration: 5000,
          description: "Could not delete form, please try again later",
          variant: "error",
        });
      }
    } catch (e) {
      console.log(e);
      showToast({
        variant: "error",
        title: "Failed to delete form",
        duration: 5000,
        description: "An error occurred while deleting the form",
      });
    } finally {
      setLoading(false);
    }
  }

  function isPublished(status) {
    return status === "Published";
  }

  async function changeStatus(form, status: string) {
    try {
      setLoading(true);
      const result = await update_form(
        {
          ...form,
          status,
        },
        org_id(),
      );

      if (result.isOk()) {
        console.log("Foorm published");
        showToast({
          title: "Form status changed to " + status,
          description: "Form has been published",
          variant: "success",
          duration: 5000,
        });
        refetch();
      }

      if (result.isErr()) {
        console.log("error publishing form");
        throw result.error;
      }
    } catch (e) {
      console.log("error publishing form", e);
      showToast({
        title: "Error",
        description: "Error changing form status",
        variant: "error",
        duration: 5000,
      });
    } finally {
      console.log("done");
      setLoading(false);
    }
  }

  return (
    <div class="shadow-md bg-background">
      <Show when={loading()}>
        <PageSpinner />
      </Show>
      <Table class=" border-border border">
        <TableHeader>
          <TableRow>
            <TableHead class="w-1/4">Name</TableHead>

            <TableHead class="text-left">Owner</TableHead>
            <TableHead class="text-right">Created At</TableHead>
            <TableHead class="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <Show when={formList()?.isErr()}>
            <TableRow>
              <TableCell colspan={5} class="text-center text-error-foreground">
                {formList()?.error.message}
              </TableCell>
            </TableRow>
          </Show>
          <Show when={!formList.loading} fallback={<TableRowSkeleton />}>
            <Show when={formList()?.isOk()}>
              <Show when={formList()?.value.length === 0}>
                <TableRow>
                  <TableCell colspan={5} class="text-center">
                    No forms found
                  </TableCell>
                </TableRow>
              </Show>
              <For each={formList()?.value}>
                {(c) => (
                  <TableRow
                    onClick={() => navigate(`${c.id}`)}
                    class="cursor-pointer"
                  >
                    <TableCell class="font-semibold">
                      <div class="clamp-lines line-clamp-1">{c.name}</div>
                    </TableCell>

                    <TableCell>
                      <BadgeDelta
                        deltaType={
                          c.status === "Published" ? "increase" : "decrease"
                        }
                      >
                        {c.status}
                      </BadgeDelta>
                    </TableCell>
                    <TableCell class={`font-semibold `}>
                      {c.creator?.username ?? "NA"}
                    </TableCell>
                    <TableCell
                      class={`text-center ${user_id() == c.creator?.id ? "text-primary" : "text-text"}`}
                    >
                      <BadgeDelta
                        deltaType={
                          user_id() == c.creator?.id ? "increase" : "decrease"
                        }
                      >
                        {user_id() == c.creator?.id ? "Owner" : "Collaborator"}
                      </BadgeDelta>
                    </TableCell>

                    <TableCell class="text-right">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell class="text-right gap-2 flex justify-end">
                      <Show
                        when={!isPublished(c.status)}
                        fallback={
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`${c.id}/share`);
                            }}
                          >
                            Share
                          </Button>
                        }
                      >
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            changeStatus(c, "Published");
                          }}
                        >
                          Publish
                        </Button>
                      </Show>

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
                            View
                          </DropdownMenuItem>

                          <Show when={isPublished(c.status)}>
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                changeStatus(c, "Draft");
                              }}
                              class="text-primary-foreground focus:bg-error-foreground flex items-center gap-2"
                            >
                              <div class="w-4 h-4">
                                <Hidden />
                              </div>
                              Unpublish
                            </DropdownMenuItem>
                          </Show>
                          <DropdownMenuItem
                            class="text-primary-foreground focus:bg-error-foreground flex items-center gap-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              handle_delete_form(c.id);
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
    </div>
  );
};

export default FormList;
