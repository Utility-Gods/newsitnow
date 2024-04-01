import { fetch_collections } from "@lib/service/collection";
import { Component, createResource, For, mergeProps } from "solid-js";
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

const CollectionList: Component = () => {
  const merged = mergeProps({ openDetails: (open: boolean) => {} });
  const [collectionList] = createResource(fetch_collections);

  return (
    <Table>
      <TableCaption>A list of your collections.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead class="w-[100px]">Name</TableHead>
          <TableHead>Descriptions</TableHead>
          <TableHead>Status</TableHead>
          <TableHead class="text-right">Created</TableHead>
          <TableHead class="w-[100px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <For each={collectionList()}>
          {(c) => (
            <TableRow>
              <TableCell class="font-medium">{c.name}</TableCell>
              <TableCell>{c.description}</TableCell>
              <TableCell>
                <BadgeDelta deltaType="unchanged">
                  {c.status.toUpperCase()}
                </BadgeDelta>
              </TableCell>
              <TableCell class="text-right">
                {new Date(c.date_created).toLocaleDateString()}
              </TableCell>
              <TableCell class="text-right gap-2 flex">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    console.log("Viewing collection", c);
                    merged.openDetails(true);
                  }}
                >
                  View
                </Button>
                <Button variant="destructive" size="sm">
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          )}
        </For>
      </TableBody>
    </Table>
  );
};

export default CollectionList;
