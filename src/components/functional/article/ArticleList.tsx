import { delete_article, fetch_articles } from "@lib/service/article";
import {
  Component,
  createEffect,
  createResource,
  For,
  mergeProps,
  Show,
} from "solid-js";
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
import Trash from "@lib/icons/Trash";
import { showToast } from "~/components/ui/toast";

export type ArticleListProps = {
  openDetails: (open: boolean) => void;
  onView: (id: string) => void;
};

const ArticleList: Component<ArticleListProps> = (props) => {
  const merged = mergeProps(props);
  const [articleList] = createResource(fetch_articles);

  createEffect(() => {
    console.log("fetching articles", articleList());
  });

  async function handle_delete_article(id: string) {
    console.log("deleting article", id);
    try {
      const result = await delete_article(id);

      console.log("deleting article", result);
      if (result?.isOk()) {
        fetch_articles();
        showToast({
          variant: "success",
          title: "Article deleted",
          description: "Article has been deleted successfully",
        });
      }

      if (result?.isErr()) {
        showToast({
          title: "Some error occured",
          description: "Could not delete article, please try again later",
          variant: "error",
        });
      }
    } catch (e) {
      console.log(e);
      showToast({
        variant: "error",
        title: "Failed to delete article",
        description: "An error occurred while deleting the article",
      });
    }
  }

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
            <For each={articleList()?.value}>
              {(c) => (
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
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handle_delete_article(c.id)}
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
        </TableBody>
      </Table>
    </div>
  );
};

export default ArticleList;
