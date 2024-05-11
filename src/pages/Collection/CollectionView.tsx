import Share from "@lib/icons/share";
import {
  fetch_collection_by_id,
  update_collection,
} from "@lib/service/collection";
import { Collection } from "@lib/types/Collection";
import { get_user_id } from "@lib/utils";
import { A } from "@solidjs/router";

import {
  Component,
  createResource,
  Show,
  createSignal,
  createEffect,
  For,
} from "solid-js";
import BreadCrumb from "~/components/bare/common/BreadCrumb";
import Empty from "~/components/bare/common/Empty";
import PageSkeleton from "~/components/bare/common/PageSkeleton";
import PageSpinner from "~/components/bare/common/PageSpinner";
import ArticleAttach from "~/components/functional/article/ArticleAttach";
import CollectionShare from "~/components/functional/collection/CollectionShare";
import { BadgeDelta } from "~/components/ui/badge-delta";
import { Button } from "~/components/ui/button";
import { showToast } from "~/components/ui/toast";

type CollectionViewProps = {};

const CollectionView: Component = (props: CollectionViewProps) => {
  const [collection, { refetch }] = createResource(
    props.params.id,
    fetch_collection_by_id,
  );

  const [showAttachArticle, setShowAttachArticle] = createSignal(false);

  createEffect(() => {
    console.log(collection());
  });

  const [loading, setLoading] = createSignal(false);

  const collection_details: () => Collection = () => collection()?.value;

  const isAuthor = () => {
    console.log(get_user_id());
    return collection_details().creator.id === get_user_id();
  };

  const [openShareModal, setOpenShareModal] = createSignal(false);

  function embed_collection() {
    if (!isPublished()) {
      showToast({
        title: "Error",
        description: "Please publish the collection first",
        variant: "error",
        duration: 5000,
      });
      return;
    }
    setOpenShareModal(true);
  }

  function isPublished() {
    if (!collection_details()) {
      return false;
    }
    return collection_details()?.status === "Published";
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

  return (
    <div class="flex flex-col flex-1 flex-grow overflow-hidden p-3 gap-6">
      <BreadCrumb
        crumbs={[
          { href: "/app", label: "Home" },
          { href: "/app/collection", label: "Collections" },
        ]}
      />

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
              <div class="flex flex-col">
                <div class="flex gap-3 items-end">
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
                <div class="overflow-auto text-muted-foreground text-md clamp-lines line-clamp-3 mt-2">
                  {collection_details().description}
                </div>
              </div>
              <Show when={isAuthor()}>
                <div class="flex gap-3 flex-shrink-0">
                  <Button
                    variant={"outline"}
                    onClick={() => setShowAttachArticle(true)}
                  >
                    + Add Article
                  </Button>
                  <Button variant={"secondary"} onClick={embed_collection}>
                    <div class="w-4 h-4 mr-2">
                      <Share />
                    </div>
                    <span>Share</span>
                  </Button>
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
                        changeStatus("Published");
                      }}
                    >
                      Publish
                    </Button>
                  </Show>
                </div>
              </Show>
            </div>

            <Show when={collection_details()?.articles?.length === 0}>
              <div class="p-4 text-primary-100 w-full flex-1">
                <Empty message="No articles found" />
              </div>
            </Show>

            <Show when={collection_details()?.articles?.length}>
              <div class="flex flex-col">
                <div class="w-full flex items-center justify-between">
                  <div class="font-regular text-dim_gray px-3 text-sm underline underline-offset-2">
                    {collection_details()?.articles?.length ?? 0} Articles in
                    this collection
                  </div>
                </div>

                <For each={collection_details()?.articles}>
                  {(article) => (
                    <div class="flex p-4 flex-col gap-3 border-border border-b">
                      <div class="flex justify-between items-center">
                        <div class="flex items-center text-md font-regular text-primary underline underline-offset-2 leading-10">
                          <A href={`/app/article/${article.id}`}>
                            {article.name}
                          </A>
                        </div>
                        <div class="flex items center gap-3 text-muted-foreground text-sm">
                          <div class="flex gap-2 items-center">
                            <BadgeDelta
                              deltaType={
                                article.status === "Published"
                                  ? "increase"
                                  : "decrease"
                              }
                            >
                              {article.status}
                            </BadgeDelta>
                          </div>
                          <div class="flex gap-2 items-center">
                            <div class="">
                              {new Date(article.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="overflow-auto allow-3-lines"
                        innerHTML={article.text}
                      ></div>
                    </div>
                  )}
                </For>
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

      <CollectionShare
        collection={collection}
        show={openShareModal()}
        onShowChange={() => {
          setOpenShareModal(false);
        }}
      />
    </div>
  );
};
export default CollectionView;
