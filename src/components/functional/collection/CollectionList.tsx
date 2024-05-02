import { delete_collection, fetch_collections } from "@lib/service/collection";
import {
  Component,
  createEffect,
  createResource,
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

import CollectionShare from "./CollectionShare";

import { BadgeDelta } from "~/components/ui/badge-delta";
import { Button } from "@components/ui/button";
import { showToast } from "~/components/ui/toast";
import Trash from "@lib/icons/Trash";
import { A } from "@solidjs/router";
import TableRowSkeleton from "~/components/bare/TableRowSkeleton";

export type CollectionListProps = {
  openDetails: (open: boolean) => void;
  onView: (id: string) => void;
  collectionList: any;
  refetch: () => void;
};

const CollectionList: Component<CollectionListProps> = (props) => {
  const merged = mergeProps(props);
  const { collectionList, refetch } = merged;
  const [openShareModal, setOpenShareModal] = createSignal(false);

  createEffect(() => {
    console.log("fetching collections", collectionList());
  });
  async function handle_delete_collection(id: string) {
    try {
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
    }
  }

  const [activeCollection, setActiveCollection] = createSignal(null);

  function embed_collection(c) {
    setActiveCollection(c);
    console.log(activeCollection());
    setOpenShareModal(true);
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
            <TableHead class="w-1/4 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <Show when={collectionList()?.isErr()}>
            <TableRow>
              <TableCell colspan={5} class="text-center text-error-foreground">
                Error loading collections
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
                  <TableRow>
                    <TableCell class="font-semibold">
                      <A
                        href={`${c.id}`}
                        class="underline text-primary-foreground underline-offset-2"
                      >
                        {c.name}
                      </A>
                    </TableCell>
                    <TableCell class="text-truncate">
                      <div class="allow-3-lines">{c.description}</div>
                    </TableCell>
                    <TableCell>
                      <BadgeDelta deltaType="moderateIncrease">
                        {c.status}
                      </BadgeDelta>
                    </TableCell>
                    <TableCell class="text-right">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell class="text-right gap-2 flex justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          merged.openDetails(true);
                          console.log(c);
                          merged.onView(c.id);
                        }}
                      >
                        View
                      </Button>
                      <Button
                        variant={"secondary"}
                        size="sm"
                        onClick={() => embed_collection(c)}
                      >
                        <span>Share</span>
                      </Button>
                      {/* <Button variant="secondary" size="sm">
                      Edit
                    </Button> */}
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handle_delete_collection(c.id)}
                      >
                        <div class="w-4 h-4">
                          <Trash />
                        </div>
                      </Button>
                    </TableCell>
                  </TableRow>
                )}
              </For>
            </Show>
          </Show>
        </TableBody>
      </Table>
      <CollectionShare
        collection={{
          id: activeCollection()?.id,
          attributes: {
            ...activeCollection(),
          },
        }}
        show={openShareModal()}
        onShowChange={() => {
          setOpenShareModal(false);
        }}
      />
    </div>
  );
};

export default CollectionList;
