import { delete_collection, update_collection } from "@lib/service/collection";
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
import { Button } from "@components/ui/button";
import { showToast } from "~/components/ui/toast";
import Trash from "@lib/icons/Trash";
import { A, useNavigate } from "@solidjs/router";
import TableRowSkeleton from "@components/bare/common/TableRowSkeleton";
import ThreeDots from "@lib/icons/ThreeDots";
import Link from "@lib/icons/link";
import Edit from "@lib/icons/Edit";
import Share from "@lib/icons/share";
import { Collection } from "@lib/types/Collection";
import PageSpinner from "~/components/bare/common/PageSpinner";
import Hidden from "@lib/icons/Hidden";

export type CollectionListProps = {
  collectionList: any;
  refetch: () => void;
};

const CollectionList: Component<CollectionListProps> = (props) => {
  const merged = mergeProps(props);
  const { collectionList, refetch } = merged;

  const [loading, setLoading] = createSignal(false);
  const navigate = useNavigate();

  createEffect(() => {
    console.log("fetching collections", collectionList());
  });

  async function handle_delete_collection(id: string) {
    try {
      setLoading(true);
      const result = await delete_collection(id);

      console.log("deleting collection", result);
      if (result?.isOk()) {
        refetch();
        showToast({
          variant: "success",
          title: "Collection deleted",
          description: "Collection has been deleted successfully",
        });
      }

      if (result?.isErr()) {
        showToast({
          title: "Some error occured",
          description: "Could not delete collection, please try again later",
          variant: "error",
        });
      }
    } catch (e) {
      console.log(e);
      showToast({
        variant: "error",
        title: "Failed to delete collection",
        description: "An error occurred while deleting the collection",
      });
    } finally {
      setLoading(false);
    }
  }

  function isPublished(status: string): boolean {
    return status === "Published";
  }

  async function changeStatus(collection: Collection, status: string) {
    console.log("publishing Collection");
    try {
      setLoading(true);
      const result = await update_collection({
        ...collection,
        status,
      });

      if (result.isOk()) {
        console.log("collectionpublished");
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
        showToast({
          title: "Error",
          description: "Error changing Collection status",
          variant: "error",
          duration: 5000,
        });
      }
    } catch (e) {
      console.log("error publishing Collection", e);
      showToast({
        title: "Error",
        description: "Error changing Collection status",
        variant: "error",
        duration: 5000,
      });
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
                          variant={"secondary"}
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
                          <div class="w-6 h-6">
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

                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`${c.id}/share`);
                            }}
                            class="text-primary-foreground flex items-center gap-2"
                          >
                            <div class="w-4 h-4">
                              <Share />
                            </div>
                            Share
                          </DropdownMenuItem>
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
