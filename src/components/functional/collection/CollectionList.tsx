import { fetch_collections } from "@lib/service/collection";
import {
  Component,
  createEffect,
  createResource,
  For,
  mergeProps,
} from "solid-js";
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
  setActiveCollection: (id: string) => void;
};

const CollectionList: Component<CollectionListProps> = (props) => {
  console.log("CollectionList props", props);

  const [collectionList] = createResource(fetch_collections);

  createEffect(() => {
    console.log("CollectionList", collectionList());
  });
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
        <For each={collectionList()?.data}>
          {({ attributes: c }) => (
            <TableRow>
              <TableCell class="font-medium">{c.name}</TableCell>
              <TableCell>{c.content}</TableCell>
              <TableCell>
                <BadgeDelta deltaType="moderateIncrease">
                  {/* {c.status.toUpperCase()} */}
                </BadgeDelta>
              </TableCell>
              <TableCell class="text-right">
                {new Date(c.created_on).toLocaleDateString()}
              </TableCell>
              <TableCell class="text-right gap-2 flex">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    console.log("Viewing collection", c);
                    props.openDetails(true);
                    props.setActiveCollection(c.id);
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
      </TableBody>
    </Table>
  );
};

export default CollectionList;
