import { fetch_articles } from "@lib/service/article";
import { Component, createResource, For, mergeProps, Show } from "solid-js";
import {
  Table,
  TableBody,
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

  return (
    <div class="shadow-md bg-background">
      <Table class=" border-border border">
        <TableHeader>
          <TableRow>
            <TableHead class="w-1/4">Name</TableHead>
            <TableHead class="w-[140px]">Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead class="text-right">Created</TableHead>
            <TableHead class="w-1/4 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <Show when={articleList()?.isErr()}>
            <TableRow>
              <TableCell colspan={5} class="text-center text-error-foreground">
                Error loading articles
              </TableCell>
            </TableRow>
          </Show>
          <Show when={articleList()?.isOk()}>
            <For each={articleList()?.value?.data}>
              {({ attributes: c, id }) => (
                <TableRow>
                  <TableCell class="font-semibold">{c.name}</TableCell>
                  <TableCell class="text-truncate ">
                    <div class="allow-3-lines">{c.content}</div>
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

export default ArticleList;
