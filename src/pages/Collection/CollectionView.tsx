import Share from "@lib/icons/share";
import {
  delete_collection,
  fetch_collection_by_id,
  update_collection,
} from "@lib/service/collection";
import { Collection } from "@lib/types/Collection";
import { get_first_org_id, get_user_id } from "@lib/utils";
import { A, useNavigate, useParams } from "@solidjs/router";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import {
  Component,
  For,
  Show,
  createEffect,
  createResource,
  createSignal,
} from "solid-js";

import Edit from "@lib/icons/Edit";
import Hidden from "@lib/icons/Hidden";
import ThreeDots from "@lib/icons/ThreeDots";
import Trash from "@lib/icons/Trash";
import Empty from "~/components/bare/common/Empty";
import PageSkeleton from "~/components/bare/common/PageSkeleton";
import PageSpinner from "~/components/bare/common/PageSpinner";
import ArticleAttach from "~/components/functional/article/ArticleAttach";
import AreYouSure from "~/components/functional/common/AreYouSure";
import { BadgeDelta } from "~/components/ui/badge-delta";
import { Button } from "~/components/ui/button";
import { showToast } from "~/components/ui/toast";

type CollectionViewProps = {};

const CollectionView: Component = (props: CollectionViewProps) => {
  const params = useParams();
  const org_id = () => params.org_id ?? get_first_org_id();

  const navigate = useNavigate();
  const fetc_collecection_args = () => {
    return {
      id: Number(params.id),
      org_id: org_id(),
    };
  };

  const [collection, { refetch }] = createResource(
    fetc_collecection_args,
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
    return true;
    // return collection_details().creator.id === get_user_id();
  };

  const [openPublishModal, setOpenPublishModal] = createSignal(false);

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
      const result = await update_collection(
        {
          ...collection_details(),
          status,
        },
        org_id(),
      );

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
      setOpenPublishModal(false);
      setLoading(false);
    }
  }

  async function handle_delete_collection(id: number) {
    try {
      setLoading(true);
      const result = await delete_collection(id, org_id());

      console.log("deleting collection", result);
      if (result?.isOk()) {
        refetch();
        showToast({
          variant: "success",
          title: "Collection deleted",
          duration: 5000,
          description: "Collection has been deleted successfully",
        });
        navigate(`/app/${org_id()}/collection`);
      }

      if (result?.isErr()) {
        throw result.error;
      }
    } catch (e) {
      console.log(e);
      showToast({
        variant: "error",
        title: e?.message ?? "Failed to create collection",
        description:
          e?.details?.message ??
          "An error occurred while delete the collection",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div class="flex flex-col flex-1 flex-grow overflow-hidden p-3 gap-6">
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
                    + Attach Article
                  </Button>
                  <Show when={isPublished()}>
                    <A href="share" class="flex items-center gap-1">
                      <Button>
                        <div class="w-4 h-4 mr-2">
                          <Share />
                        </div>
                        <span>Share</span>
                      </Button>
                    </A>
                  </Show>
                  <Show when={!isPublished()}>
                    <Button
                      onClick={() => {
                        setOpenPublishModal(true);
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
                        onClick={() => {}}
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
                            e.stopPropagation();
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
                          e.stopPropagation();
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

            <Show when={collection_details()?.articles?.length === 0}>
              <div class="p-4 text-primary-100 w-full flex-1">
                <Empty message="No articles found" />
              </div>
            </Show>

            <Show when={collection_details()?.articles?.length}>
              <div class="flex flex-col gap-3">
                <div class="w-full flex items-center justify-between">
                  <div class="font-regular text-dim_gray px-3 text-sm underline underline-offset-2">
                    {collection_details()?.articles?.length ?? 0} Articles in
                    this collection
                  </div>
                </div>

                <For each={collection_details()?.articles}>
                  {(article) => (
                    <A
                      href={`/app/${org_id()}/article/${article.id}`}
                      class="flex p-4 flex-col gap-3 border-border border bg-muted"
                    >
                      <div class="flex justify-between items-center">
                        <div class="flex items-center text-md font-regular text-primary underline underline-offset-2 leading-10">
                          {article.name}
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
                    </A>
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

      <AreYouSure
        show={openPublishModal()}
        onSubmit={() => {
          changeStatus("Published");
        }}
        message="Are you sure you want to publish this collection?"
        onOpenChange={() => {
          setOpenPublishModal(false);
        }}
      />
    </div>
  );
};
export default CollectionView;
