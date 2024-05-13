import { fetch_collection_by_id } from "@lib/service/collection";
import { Collection } from "@lib/types/Collection";
import { get_user_id } from "@lib/utils";
import { Component, Show, createResource, createSignal } from "solid-js";
import BreadCrumb from "~/components/bare/common/BreadCrumb";
import Empty from "~/components/bare/common/Empty";
import PageSkeleton from "~/components/bare/common/PageSkeleton";
import PageSpinner from "~/components/bare/common/PageSpinner";
import ArticleAttach from "~/components/functional/article/ArticleAttach";
import { BadgeDelta } from "~/components/ui/badge-delta";
import { Button } from "~/components/ui/button";
import API from "@lib/icons/API";
import Code from "@lib/icons/code";
import Link from "@lib/icons/link";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Callout, CalloutContent, CalloutTitle } from "~/components/ui/callout";

import APIShare from "~/components/functional/collection/share/APIShare";
import LinkShare from "~/components/functional/collection/share/LinkShare";
import CodeShare from "~/components/functional/collection/share/CodeShare";
import { fetch_article_by_id } from "@lib/service/article";

const ArticleShare: Component = (props) => {
  const article_id = () => props.params.id;

  const [article, { refetch }] = createResource(
    article_id,
    fetch_article_by_id,
  );

  const [loading, setLoading] = createSignal(false);

  const [activeTab, setActiveTab] = createSignal("code");

  const article_details: () => Collection = () => article()?.value;

  const [showAttachArticle, setShowAttachArticle] = createSignal(false);

  const isAuthor = () => {
    console.log(get_user_id());
    return article_details().author.id === get_user_id();
  };

  function isPublished() {
    if (!article_details()) {
      return false;
    }
    return article_details()?.status === "Published";
  }
  return (
    <div class="flex flex-col flex-1 flex-grow overflow-hidden p-3 gap-3">
      <BreadCrumb
        crumbs={[
          { href: "/app", label: "Home" },
          { href: "/app/collection", label: "Collections" },
        ]}
      />

      <Show when={!article.loading} fallback={<PageSkeleton />}>
        <Show when={article()?.isOk()}>
          <Show
            when={Object.keys(article_details()).length > 0}
            fallback={
              <div class="p-4 text-primary-100 w-full">
                <Empty message="No collection found" />
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
                    <Show
                      when={!isPublished()}
                      fallback={
                        <Button
                          variant={"destructive"}
                          onClick={() => {
                            changeStatus("Draft");
                          }}
                        >
                          Unpublish
                        </Button>
                      }
                    >
                      <Button
                        variant={"secondary"}
                        onClick={() => {
                          setOpenPublishModal(true);
                        }}
                      >
                        Publish
                      </Button>
                    </Show>
                  </div>
                </Show>
              </div>
            </div>
            <div class=" flex justify-between ">
              <div class="w-1/2 px-3 flex flex-col gap-3">
                <div class="text-2xl font-bold text-primary leading-10">
                  Sharing Article
                </div>

                <p>Here are the three ways you can share your article:</p>
                <div>
                  <div
                    class={`${activeTab() == "code" ? "bg-secondary text-secondary-foreground" : ""} p-3`}
                  >
                    <strong>By Code:</strong> Share a snippet of code that
                    others can use to embed or display your collection in their
                    own projects.
                  </div>
                  <div
                    class={`${activeTab() == "api" ? "bg-secondary text-secondary-foreground" : ""} p-3`}
                  >
                    <strong>By API:</strong> Provide access to your collection
                    through an API, allowing developers to retrieve collection
                    data programmatically.
                  </div>
                  <div
                    class={`${activeTab() == "link" ? "bg-secondary text-secondary-foreground" : ""} p-3`}
                  >
                    <strong>By Link:</strong> Share a direct link to your
                    collection, making it easy for anyone to view it on the web.
                  </div>
                </div>
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
                  <CodeShare collectionId={article_details().id}></CodeShare>
                </TabsContent>
                <TabsContent value="api">
                  <APIShare collectionId={article_details().id}></APIShare>
                </TabsContent>
                <TabsContent value="link">
                  <LinkShare collectionId={article_details().id}></LinkShare>
                </TabsContent>
              </Tabs>
            </div>
            <Callout>
              <CalloutTitle>Notice</CalloutTitle>
              <CalloutContent>
                Right now we support mainly 3 ways of sharing your colletion.
                Surely we are coming up more way to share your collection with
                the world.
              </CalloutContent>
            </Callout>
          </Show>
          <Show when={showAttachArticle()}>
            <ArticleAttach
              collection={article}
              onUpdate={() => {
                refetch();
              }}
              show={showAttachArticle()}
              onShowChange={() => setShowAttachArticle(false)}
            />
          </Show>
        </Show>

        <Show when={article()?.isErr()}>
          <div class="p-4 text-primary-100">Error loading collection</div>
        </Show>
      </Show>

      <Show when={loading()}>
        <PageSpinner />
      </Show>
    </div>
  );
};

export default ArticleShare;
