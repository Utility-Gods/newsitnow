import { delete_article } from "@lib/service/article";
import {
  Component,
  createEffect,
  createSignal,
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

import ArticleShare from "./ArticleShare";
import { A, useNavigate } from "@solidjs/router";
import PageSpinner from "~/components/bare/common/PageSpinner";

import TableRowSkeleton from "~/components/bare/common/TableRowSkeleton";

export type ArticleListProps = {
  articleList: any;
  refetch: () => void;
};

const ArticleList: Component<ArticleListProps> = (props) => {
  const merged = mergeProps(props);

  const { articleList, refetch } = merged;

  const navigate = useNavigate();
  const [openShareModal, setOpenShareModal] = createSignal(false);

  const [loading, setLoading] = createSignal(false);
  createEffect(() => {
    console.log("fetching articles", articleList());
  });

  async function handle_delete_article(id: string) {
    try {
      setLoading(true);
      const result = await delete_article(id);

      console.log("deleting article", result);
      if (result?.isOk()) {
        refetch();
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
    } finally {
      setLoading(false);
    }
  }

  const [activeArticle, setActiveArticle] = createSignal(null);

  function embed_article(c) {
    setActiveArticle(c);
    console.log(activeArticle());
    setOpenShareModal(true);
  }

  return (
    <div class="shadow-md bg-background">
      <Show when={loading()}>
        <PageSpinner />
      </Show>
      <Table class=" border-border border">
        <TableHeader>
          <TableRow>
            <TableHead class="w-1/4">Name</TableHead>
            <TableHead class="w-1/4">Description</TableHead>
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
          <Show when={!articleList.loading} fallback={<TableRowSkeleton />}>
            <Show when={articleList()?.isOk()}>
              <Show when={articleList()?.value.length === 0}>
                <TableRow>
                  <TableCell colspan={5} class="text-center">
                    No articles found
                  </TableCell>
                </TableRow>
              </Show>
              <For each={articleList()?.value}>
                {(c) => (
                  <TableRow>
                    <TableCell class="font-semibold">
                      <div class="allow-3-lines">
                        <A
                          href={`${c.id}`}
                          class="underline text-primary-foreground underline-offset-2"
                        >
                          {c.name}
                        </A>
                      </div>
                    </TableCell>
                    <TableCell class="text-truncate ">
                      <div class="allow-3-lines" innerHTML={c.text}></div>
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
                          console.log("navigating to", c);
                          navigate(`${c.id}`);
                        }}
                      >
                        View
                      </Button>

                      <Button
                        variant={"secondary"}
                        size="sm"
                        onClick={() => embed_article(c)}
                      >
                        <span>Share</span>
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
          </Show>
        </TableBody>
      </Table>
      <ArticleShare
        article={{
          id: activeArticle()?.id,
          attributes: {
            ...activeArticle(),
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

export default ArticleList;
