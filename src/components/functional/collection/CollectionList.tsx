import { fetch_collections } from "@lib/service/collection";
import { Component, createResource, For, mergeProps, Show } from "solid-js";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

import { BadgeDelta } from "~/components/ui/badge-delta";
import { Button } from "@components/ui/button";

export type CollectionListProps = {
  openDetails: (open: boolean) => void;
  onView: (id: string) => void;
};

const CollectionList: Component<CollectionListProps> = (props) => {
  const merged = mergeProps(props);
  const [collectionList] = createResource(fetch_collections);

  return (
    <div class="shadow-md bg-white">
      <Table>
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
          <Show when={collectionList()?.isOk()}>
            <For each={collectionList()?.value?.data}>
              {({ attributes: c, id }) => (
                <TableRow>
                  <TableCell class="font-semibold">{c.name}</TableCell>
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
                        merged.onView(id);
                      }}
                    >
                      View
                    </Button>
                    <Button variant="secondary" size="sm">
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              )}
            </For>
          </Show>
        </TableBody>
      </Table>
    </div>
  );
};

export default CollectionList;
