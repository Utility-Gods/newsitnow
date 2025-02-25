import { delete_collection, update_collection } from "@lib/service/collection";
import { Component, For, mergeProps, Show, createSignal } from "solid-js";
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
import { Button } from "@components/ui/button";
import { showToast } from "~/components/ui/toast";
import Trash from "@lib/icons/Trash";
import { useNavigate, useParams } from "@solidjs/router";
import TableRowSkeleton from "@components/bare/common/TableRowSkeleton";
import ThreeDots from "@lib/icons/ThreeDots";
import Link from "@lib/icons/link";
import Edit from "@lib/icons/Edit";

import { Collection } from "@lib/types/Collection";
import PageSpinner from "~/components/bare/common/PageSpinner";
import Hidden from "@lib/icons/Hidden";
import { get_user_id, show_error_toast } from "@lib/utils";

export type CollectionListProps = {
  collectionList: any;
  refetch: () => void;
};

const CollectionList: Component<CollectionListProps> = (props) => {
  const merged = mergeProps(props);
  const user_id = () => get_user_id();

  const { collectionList, refetch } = merged;
  const params = useParams();
  const org_id = () => params.org_id;

  const [loading, setLoading] = createSignal(false);
  const navigate = useNavigate();

  async function handle_delete_collection(id: string) {
    try {
      setLoading(true);
      const result = await delete_collection(id, org_id());

      console.log("deleting collection", result);
      if (result?.isOk()) {
        refetch();
        showToast({
          variant: "success",
          title: "Collection deleted",
          duration: 5000,
          description: "Collection has been deleted successfully",
        });
      }

      if (result?.isErr()) {
        throw result.error;
      }
    } catch (e) {
      console.log(e);
      showToast({
        variant: "error",
        title: e?.message ?? "Failed to create collection",
        description:
          e?.details?.message ??
          "An error occurred while delete the collection",
      });
    } finally {
      setLoading(false);
    }
  }

  function isPublished(status: string): boolean {
    return status === "Published";
  }

  async function changeStatus(collection: Collection, status: string) {
    try {
      setLoading(true);
      const result = await update_collection(
        {
          ...collection,
          status,
        },
        org_id(),
      );

      if (result.isOk()) {
        showToast({
          title: "Collection status changed to " + status,
          description: "Article has been published",
          variant: "success",
          duration: 5000,
        });
        refetch();
      }

      if (result.isErr()) {
        console.log("error publishing Collection");
        throw result.error;
      }
    } catch (e) {
      console.log("error publishing Collection", e);
      show_error_toast(e);
    } finally {
      console.log("done");
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
            <TableHead>Status</TableHead>
            <TableHead class="text-left">Owner</TableHead>
            <TableHead class="text-center">Role</TableHead>
            <TableHead class="text-right">Created</TableHead>
            <TableHead class=" text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <Show when={collectionList()?.isErr()}>
            <TableRow>
              <TableCell colspan={5} class="text-center text-error-foreground">
                {collectionList()?.error?.message}
              </TableCell>
            </TableRow>
          </Show>
          <Show when={!collectionList.loading} fallback={<TableRowSkeleton />}>
            <Show when={collectionList()?.isOk()}>
              <Show when={collectionList()?.value?.length === 0}>
                <TableRow>
                  <TableCell colspan={5} class="text-center">
                    No collections found
                  </TableCell>
                </TableRow>
              </Show>
              <For each={collectionList()?.value}>
                {(c) => (
                  <TableRow
                    onClick={() => navigate(`${c.id}`)}
                    class="cursor-pointer"
                  >
                    <TableCell class="font-semibold">{c.name}</TableCell>
                    <TableCell class="text-truncate">
                      <div class="allow-3-lines">{c.description}</div>
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
                          <DropdownMenuItem
                            onClick={() => {}}
                            class="text-primary-foreground flex items-center gap-2"
                          >
                            <div class="w-4 h-4">
                              <Edit />
                            </div>
                            Edit
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
                              handle_delete_collection(c.id);
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

export default CollectionList;
