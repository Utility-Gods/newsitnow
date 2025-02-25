import { delete_article, update_article } from "@lib/service/article";
import { Component, createSignal, For, mergeProps, Show } from "solid-js";
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

import Trash from "@lib/icons/Trash";
import { showToast } from "~/components/ui/toast";

import { useNavigate } from "@solidjs/router";
import PageSpinner from "~/components/bare/common/PageSpinner";

import TableRowSkeleton from "~/components/bare/common/TableRowSkeleton";
import ThreeDots from "@lib/icons/ThreeDots";

import Edit from "@lib/icons/Edit";
import Link from "@lib/icons/link";
import { Button } from "~/components/ui/button";
import { Article } from "@lib/types/Article";
import Hidden from "@lib/icons/Hidden";
import { get_user_id, show_error_toast } from "@lib/utils";

export type ArticleListProps = {
  articleList: any;
  refetch: () => void;
};

const ArticleList: Component<ArticleListProps> = (props) => {
  const merged = mergeProps(props);

  const { articleList, refetch } = merged;

  const navigate = useNavigate();

  const [loading, setLoading] = createSignal(false);

  const user_id = () => get_user_id();

  async function handle_delete_article(id: string) {
    try {
      setLoading(true);
      const result = await delete_article(id);

      if (result?.isOk()) {
        refetch();
        showToast({
          variant: "success",
          title: "Article deleted",
          duration: 5000,
          description: "Article has been deleted successfully",
        });
      }

      if (result?.isErr()) {
        showToast({
          title: "Some error occured",
          duration: 5000,
          description: "Could not delete article, please try again later",
          variant: "error",
        });
      }
    } catch (e) {
      console.log(e);
      showToast({
        variant: "error",
        title: "Failed to delete article",
        duration: 5000,
        description: "An error occurred while deleting the article",
      });
    } finally {
      setLoading(false);
    }
  }

  function isPublished(status: string): boolean {
    return status === "Published";
  }

  async function changeStatus(article: Article, status: string) {
    try {
      setLoading(true);
      const result = await update_article({
        ...article,
        status,
      });

      if (result.isOk()) {
        console.log("article published");
        showToast({
          title: "Article status changed to " + status,
          description: "Article has been published",
          variant: "success",
          duration: 5000,
        });
        refetch();
      }

      if (result.isErr()) {
        console.log("error publishing article");
        throw result.error;
      }
    } catch (e) {
      console.log("error publishing article", e);
      showToast({
        title: "Error",
        description: "Error changing article status",
        variant: "error",
        duration: 5000,
      });
    } finally {
      console.log("done");
      setLoading(false);
    }
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
            {/* <TableHead class="w-1/4">Description</TableHead> */}
            <TableHead>Status</TableHead>
            <TableHead class="text-left">Owner</TableHead>
            <TableHead class="text-center">Role</TableHead>
            <TableHead class="text-right">Created At</TableHead>
            <TableHead class="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <Show when={articleList()?.isErr()}>
            <TableRow>
              <TableCell colspan={5} class="text-center text-error-foreground">
                {articleList()?.error.message}
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
                  <TableRow
                    onClick={() => navigate(`${c.id}`)}
                    class="cursor-pointer"
                  >
                    <TableCell class="font-semibold">
                      <div class="clamp-lines line-clamp-1">{c.name}</div>
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
                    <TableCell class={`font-semibold `}>
                      {c.creator?.username ?? "NA"}
                    </TableCell>
                    <TableCell
                      class={`text-center ${user_id() == c.creator?.id ? "text-primary" : "text-text"}`}
                    >
                      <BadgeDelta
                        deltaType={
                          user_id() == c.creator?.id ? "increase" : "decrease"
                        }
                      >
                        {user_id() == c.creator?.id ? "Owner" : "Collaborator"}
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
                          <div class="w-6 h-6 rotate-90">
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
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log("navigating to", c);
                              navigate(`${c.id}?edit=true`);
                            }}
                          >
                            <div class="w-4 h-4">
                              <Edit />
                            </div>
                            Edit
                          </DropdownMenuItem>

                          <Show when={isPublished(c.status)}>
                            <DropdownMenuItem
                              class="text-primary-foreground focus:bg-error-foreground flex items-center gap-2"
                              onClick={(e) => {
                                e.stopPropagation();
                                changeStatus(c, "Draft");
                              }}
                            >
                              <div class="w-4 h-4">
                                <Hidden />
                              </div>
                              Unpublish
                            </DropdownMenuItem>
                          </Show>
                          <DropdownMenuItem
                            class="text-primary-foreground focus:bg-error-foreground flex items-center gap-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              handle_delete_article(c.id);
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
    </div>
  );
};

export default ArticleList;
