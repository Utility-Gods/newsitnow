import { fetch_articles } from "@lib/service/article";
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

export type ArticleListProps = {
  openDetails: (open: boolean) => void;
  onView: (id: string) => void;
};

const ArticleList: Component<ArticleListProps> = (props) => {
  const merged = mergeProps(props);
  const [articleList] = createResource(fetch_articles);

  createEffect(() => {
    console.log("ArticleList", articleList());
  });
  return (
    <Table>
      <TableCaption>A list of your articles.</TableCaption>
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
        <For each={articleList()?.data}>
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
                {new Date(c.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell class="text-right gap-2 flex">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    merged.openDetails(true);
                    merged.onView(c.uuid);
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

export default ArticleList;
