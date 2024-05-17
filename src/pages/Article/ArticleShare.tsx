import { get_user_id } from "@lib/utils";
import { Component, Show, createResource, createSignal } from "solid-js";
import Empty from "~/components/bare/common/Empty";
import PageSkeleton from "~/components/bare/common/PageSkeleton";
import PageSpinner from "~/components/bare/common/PageSpinner";
import { BadgeDelta } from "~/components/ui/badge-delta";
import { Button } from "~/components/ui/button";
import API from "@lib/icons/API";
import Code from "@lib/icons/code";
import Link from "@lib/icons/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Callout, CalloutContent, CalloutTitle } from "~/components/ui/callout";

import { fetch_article_by_id, update_article } from "@lib/service/article";
import APIShare from "~/components/functional/article/share/APIShare";
import LinkShare from "~/components/functional/article/share/LinkShare";
import CodeShare from "~/components/functional/article/share/CodeShare";
import ThreeDots from "@lib/icons/ThreeDots";
import { useNavigate } from "@solidjs/router";
import Edit from "@lib/icons/Edit";
import Hidden from "@lib/icons/Hidden";
import { showToast } from "~/components/ui/toast";
import Trash from "@lib/icons/Trash";
import { Article } from "@lib/types/Article";

const ArticleShare: Component = (props) => {
  const navigate = useNavigate();
  const article_id = () => props.params.id;

  const [article, { refetch }] = createResource(
    article_id,
    fetch_article_by_id,
  );

  const [loading, setLoading] = createSignal(false);

  const [shareEvenIfNotPublished, setShareEvenIfNotPublished] =
    createSignal(false);

  const [activeTab, setActiveTab] = createSignal("code");

  const article_details: () => Article = () => article()?.value;

  const isAuthor = () => {
    console.log(get_user_id());
    return article_details().creator.id === get_user_id();
  };

  function isPublished() {
    if (!article_details()) {
      return false;
    }
    return article_details()?.status === "Published";
  }

  async function changeStatus(status: string) {
    console.log("publishing article");
    try {
      setLoading(true);
      const result = await update_article({
        ...article_details(),
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
        showToast({
          title: "Error",
          description: "Error changing article status",
          variant: "error",
          duration: 5000,
        });
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
        duration: 5000,
        title: "Failed to delete article",
        description: "An error occurred while deleting the article",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div class="flex flex-col flex-1 flex-grow overflow-hidden p-3 gap-3">
      <Show when={!article.loading} fallback={<PageSkeleton />}>
        <Show when={article()?.isOk()}>
          <Show
            when={Object.keys(article_details()).length > 0}
            fallback={
              <div class="p-4 text-primary-100 w-full">
                <Empty message="No article found" />
              </div>
            }
          >
            <div class="p-3  border-border border bg-muted flex items-center justify-between flex-shrink-0 gap-6">
              <div class="flex w-full flex-col sm:flex-row justify-between">
                <div class="flex gap-3 items-center">
                  <div class="text-2xl font-bold text-secondary">
                    {article_details().name}
                  </div>
                  <div class="flex items-end gap-3 text-muted-foreground text-sm">
                    <div class="">
                      {new Date(
                        article_details().createdAt,
                      ).toLocaleDateString()}
                    </div>
                    <div class="flex gap-2 items-center">
                      <BadgeDelta
                        deltaType={
                          article_details().status === "Published"
                            ? "increase"
                            : "decrease"
                        }
                      >
                        {article_details().status}
                      </BadgeDelta>
                    </div>
                  </div>
                </div>
                <Show when={isAuthor()}>
                  <div class="flex gap-3 flex-shrink-0 justify-end">
                    <Show when={isAuthor()}>
                      <div class="flex gap-3 flex-shrink-0 justify-end">
                        <Show when={!isPublished()}>
                          <Button
                            onClick={() => {
                              changeStatus("Published");
                            }}
                          >
                            Publish
                          </Button>
                        </Show>
                      </div>
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
                            navigate(`/app/article/${article_details().id}`);
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
                            navigate(
                              `/app/article/${article_details().id}?edit=true`,
                            );
                          }}
                        >
                          <div class="w-4 h-4">
                            <Edit />
                          </div>
                          Edit
                        </DropdownMenuItem>
                        <Show when={isPublished()}>
                          <DropdownMenuItem
                            class="text-primary-foreground focus:bg-error-foreground flex items-center gap-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              changeStatus("Draft");
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
                            handle_delete_article(article_details().id);
                          }}
                        >
                          <div class="w-4 h-4">
                            <Trash />
                          </div>
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </Show>
              </div>
            </div>
            <Show
              when={isPublished()}
              fallback={
                <div class="inset-0 bg-muted bg-opacity-50 backdrop-blur-md flex justify-center items-center h-[220px]">
                  <div class="bg-white p-4 rounded-lg shadow-lg">
                    <div class="text-lg font-bold text-primary-foreground">
                      This article is not published
                    </div>
                    <div class="text-muted-foreground">
                      Sharing options are only available for published articles.
                    </div>
                  </div>
                </div>
              }
            >
              <div class=" flex justify-between">
                <div class="w-1/2 px-3 flex flex-col gap-3">
                  <div class="text-2xl flex-shrink-0 font-bold text-primary leading-10">
                    Share this article
                  </div>
                  <div class="flex flex-col">
                    <div
                      class={`${activeTab() == "code" ? "bg-secondary text-secondary-foreground" : ""} p-3`}
                    >
                      <strong>By Code:</strong> Share a snippet of code that
                      others can use to embed or display your article in their
                      own projects.
                    </div>
                    <div
                      class={`${activeTab() == "api" ? "bg-secondary text-secondary-foreground" : ""} p-3`}
                    >
                      <strong>By API:</strong> Provide access to your article
                      through an API, allowing developers to retrieve article
                      data programmatically.
                    </div>
                    <div
                      class={`${activeTab() == "link" ? "bg-secondary text-secondary-foreground" : ""} p-3`}
                    >
                      <strong>By Link:</strong> Share a direct link to your
                      article, making it easy for anyone to view it on the web.
                    </div>
                  </div>
                  <Callout>
                    <CalloutTitle>Important</CalloutTitle>
                    <CalloutContent>
                      <Show when={activeTab() == "code"}>
                        You can copy the code snippet below and paste it into
                        your website to embed this article.
                      </Show>
                      <Show when={activeTab() == "api"}>
                        You can use the API key below to access this article
                        programmatically.
                      </Show>
                      <Show when={activeTab() == "link"}>
                        You can share the link below to share this article with
                        others.
                      </Show>
                    </CalloutContent>
                  </Callout>
                </div>
                <Tabs
                  defaultValue="account"
                  class="w-full sm:w-1/2"
                  onChange={(e) => {
                    console.log(e);
                    setActiveTab(e);
                  }}
                >
                  <TabsList class="grid w-full grid-cols-3">
                    <TabsTrigger value="code" class="flex items-center gap-2">
                      <div class="w-4 h-4">
                        <Code></Code>
                      </div>
                      <div>Code</div>
                    </TabsTrigger>
                    <TabsTrigger value="api" class="flex items-center gap-2">
                      <div class="w-4 h-4">
                        <API></API>
                      </div>
                      <div>API</div>
                    </TabsTrigger>
                    <TabsTrigger value="link" class="flex items-center gap-2">
                      <div class="w-4 h-4">
                        <Link></Link>
                      </div>
                      <div>Link</div>
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="code">
                    <CodeShare articleId={article_details().id}></CodeShare>
                  </TabsContent>
                  <TabsContent value="api">
                    <APIShare articleId={article_details().id}></APIShare>
                  </TabsContent>
                  <TabsContent value="link">
                    <LinkShare
                      articleId={article_details().text_id}
                    ></LinkShare>
                  </TabsContent>
                </Tabs>
              </div>
            </Show>
          </Show>
        </Show>

        <Show when={article()?.isErr()}>
          <div class="p-4 text-primary-100">Error loading article</div>
        </Show>
      </Show>

      <Show when={loading()}>
        <PageSpinner />
      </Show>
    </div>
  );
};

export default ArticleShare;
