import {
  delete_collection,
  fetch_collection_by_id,
  update_collection,
} from "@lib/service/collection";
import { Collection } from "@lib/types/Collection";
import { get_first_org_id, get_user_id } from "@lib/utils";
import {
  Component,
  Show,
  createEffect,
  createResource,
  createSignal,
} from "solid-js";

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { showToast } from "~/components/ui/toast";
import Hidden from "@lib/icons/Hidden";
import Trash from "@lib/icons/Trash";

import Edit from "@lib/icons/Edit";
import { useNavigate, useParams } from "@solidjs/router";
import ThreeDots from "@lib/icons/ThreeDots";

const CollectionShare: Component = (props) => {
  console.log("props");
  const navigate = useNavigate();
  const collection_id = () => props.params.id;
  const params = useParams();
  const org_id = () => params.org_id ?? get_first_org_id();

  const fetch_collecection_args = () => {
    return {
      id: Number(params.id),
      org_id: org_id(),
    };
  };

  const [collection, { refetch }] = createResource(
    fetch_collecection_args,
    fetch_collection_by_id,
  );

  createEffect(() => {
    console.log(collection(), collection_id());
  });

  const [loading, setLoading] = createSignal(false);

  const [activeTab, setActiveTab] = createSignal("code");

  const collection_details: () => Collection = () => collection()?.value;

  const [showAttachArticle, setShowAttachArticle] = createSignal(false);

  const isAuthor = () => {
    console.log(get_user_id());
    return collection_details().creator.id === get_user_id();
  };

  async function handle_delete_collection(id: string) {
    try {
      setLoading(true);
      const result = await delete_collection(id);

      console.log("deleting collection", result);
      if (result?.isOk()) {
        refetch();
        showToast({
          variant: "success",
          duration: 5000,
          title: "Collection deleted",
          description: "Collection has been deleted successfully",
        });
      }

      if (result?.isErr()) {
        showToast({
          title: "Some error occured",
          duration: 5000,
          description: "Could not delete collection, please try again later",
          variant: "error",
        });
      }
    } catch (e) {
      console.log(e);
      showToast({
        variant: "error",
        duration: 5000,
        title: "Failed to delete collection",
        description: "An error occurred while deleting the collection",
      });
    } finally {
      setLoading(false);
    }
  }

  async function changeStatus(status: string) {
    console.log("publishing Collection");
    try {
      setLoading(true);
      const result = await update_collection({
        ...collection_details(),
        status,
      });

      if (result.isOk()) {
        console.log("collectionpublished");
        showToast({
          title: "Collection status changed to " + status,
          description: "Article has been published",
          variant: "success",
          duration: 5000,
        });
        refetch();
      }

      if (result.isErr()) {
        console.log("error publishing Collection");
        showToast({
          title: "Error",
          description: "Error changing Collection status",
          variant: "error",
          duration: 5000,
        });
      }
    } catch (e) {
      console.log("error publishing Collection", e);
      showToast({
        title: "Error",
        description: "Error changing Collection status",
        variant: "error",
        duration: 5000,
      });
    } finally {
      console.log("done");
      setLoading(false);
    }
  }

  function isPublished() {
    if (!collection_details()) {
      return false;
    }
    return collection_details()?.status === "Published";
  }
  return (
    <div class="flex flex-col flex-1 flex-grow overflow-hidden p-3 gap-3">
      <Show when={!collection.loading} fallback={<PageSkeleton />}>
        <Show when={collection()?.isOk()}>
          <Show
            when={Object.keys(collection_details()).length > 0}
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
                    {collection_details().name}
                  </div>
                  <div class="flex items-end gap-3 text-muted-foreground text-sm">
                    <div class="">
                      {new Date(
                        collection_details().createdAt,
                      ).toLocaleDateString()}
                    </div>
                    <div class="flex gap-2 items-center">
                      <BadgeDelta
                        deltaType={
                          collection_details().status === "Published"
                            ? "increase"
                            : "decrease"
                        }
                      >
                        {collection_details().status}
                      </BadgeDelta>
                    </div>
                  </div>
                </div>
                <Show when={isAuthor()}>
                  <div class="flex gap-3 flex-shrink-0 justify-end">
                    <Button onClick={() => setShowAttachArticle(true)}>
                      + Attach Article
                    </Button>

                    <Show when={!isPublished()}>
                      <Button
                        variant={"secondary"}
                        onClick={() => {
                          changeStatus("Published");
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
                            navigate(
                              `/app/collection/${collection_details().id}`,
                            );
                          }}
                        >
                          <div class="w-4 h-4">
                            <Link />
                          </div>
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          disabled
                          onClick={() => {
                            navigate(
                              `/app/collection/${collection_details().id}?edit=true`,
                            );
                          }}
                          class="text-primary-foreground flex items-center gap-2"
                        >
                          <div class="w-4 h-4">
                            <Edit />
                          </div>
                          Edit
                        </DropdownMenuItem>
                        <Show when={isPublished()}>
                          <DropdownMenuItem
                            onClick={(e) => {
                              changeStatus("Draft");
                            }}
                            class="text-primary-foreground focus:bg-error-foreground flex items-center gap-2"
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
                            handle_delete_collection(collection_details().id);
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
                      This collection is not published
                    </div>
                    <div class="text-muted-foreground">
                      Sharing options are only available for published
                      collections.
                    </div>
                  </div>
                </div>
              }
            >
              <div class=" flex justify-between ">
                <div class="w-1/2 px-3 flex flex-col gap-3">
                  <div class="text-2xl flex-shrink-0 font-bold text-primary leading-10">
                    Share this collection
                  </div>
                  <div class=" flex flex-col">
                    <div
                      class={`${activeTab() == "code" ? "bg-secondary text-secondary-foreground" : ""} p-3`}
                    >
                      <strong>By Code:</strong> Share a snippet of code that
                      others can use to embed or display your collection in
                      their own projects.
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
                      collection, making it easy for anyone to view it on the
                      web.
                    </div>
                  </div>
                  <Callout>
                    <CalloutTitle>Important</CalloutTitle>
                    <CalloutContent>
                      <Show when={activeTab() == "code"}>
                        You can copy the code snippet below and paste it into
                        your website to embed this collection.
                      </Show>
                      <Show when={activeTab() == "api"}>
                        You can use the API key below to access this collection
                        programmatically.
                      </Show>
                      <Show when={activeTab() == "link"}>
                        You can share the link below to share this collection
                        with others.
                      </Show>
                    </CalloutContent>
                  </Callout>
                </div>
                <Tabs
                  defaultValue="account"
                  class="w-full sm:w-1/2"
                  onChange={(e) => {
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
                    <CodeShare
                      collectionId={collection_details().id}
                    ></CodeShare>
                  </TabsContent>
                  <TabsContent value="api">
                    <APIShare collectionId={collection_details().id}></APIShare>
                  </TabsContent>
                  <TabsContent value="link">
                    <LinkShare
                      collectionId={collection_details().text_id}
                    ></LinkShare>
                  </TabsContent>
                </Tabs>
              </div>
            </Show>
          </Show>
          <Show when={showAttachArticle()}>
            <ArticleAttach
              collection={collection}
              onUpdate={() => {
                refetch();
              }}
              show={showAttachArticle()}
              onShowChange={() => setShowAttachArticle(false)}
            />
          </Show>
        </Show>

        <Show when={collection()?.isErr()}>
          <div class="p-4 text-primary-100">Error loading collection</div>
        </Show>
      </Show>

      <Show when={loading()}>
        <PageSpinner />
      </Show>
    </div>
  );
};

export default CollectionShare;
