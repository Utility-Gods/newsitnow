import { fetch_collections } from "@lib/service/collection";
import { Component, createResource, For } from "solid-js";
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

const CollectionList: Component = () => {
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
            </TableRow>
          )}
        </For>
      </TableBody>
    </Table>
  );
};

export default CollectionList;
