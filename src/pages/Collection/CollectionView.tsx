import Share from "@lib/icons/share";
import { fetch_collection_by_id } from "@lib/service/collection";
import { Collection } from "@lib/types/Collection";
import { get_user_id } from "@lib/utils";

import {
  Component,
  createResource,
  Show,
  createSignal,
  createEffect,
  For,
} from "solid-js";
import BreadCrumb from "~/components/bare/BreadCrumb";
import Empty from "~/components/bare/Empty";
import PageSkeleton from "~/components/bare/PageSkeleton";
import ArticleAttach from "~/components/functional/article/ArticleAttach";
import CollectionShare from "~/components/functional/collection/CollectionShare";
import { BadgeDelta } from "~/components/ui/badge-delta";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";

type CollectionViewProps = {};

const CollectionView: Component = (props: CollectionViewProps) => {
  const [collection] = createResource(props.params.id, fetch_collection_by_id);

  const [showAttachArticle, setShowAttachArticle] = createSignal(false);

  createEffect(() => {
    console.log(collection());
  });

  const collection_details: () => Collection = () => collection()?.value;

  const isAuthor = () => {
    console.log(get_user_id());
    return collection_details().creator.id === get_user_id();
  };

  const [openShareModal, setOpenShareModal] = createSignal(false);

  function embed_collection() {
    setOpenShareModal(true);
  }

  return (
    <div class="flex flex-col flex-1 flex-grow overflow-hidden p-3 ">
      <BreadCrumb
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/collection", label: "Collection" },
        ]}
      />

      <Show when={collection.loading}>
        <PageSkeleton />
      </Show>
      <Show when={collection()?.isOk()}>
        <Show
          when={Object.keys(collection_details()).length > 0}
          fallback={
            <div class="p-4 text-primary-100 w-full">
              <Empty message="No collection found" />
            </div>
          }
        >
          <div class="flex p-3 flex-col">
            <div class="flex justify-between">
              <div class="flex flex-col">
                <div class="flex items-center text-2xl font-bold text-secondary leading-10">
                  {collection_details().name}
                </div>
              </div>
              <Show when={isAuthor()}>
                <div class="flex gap-3">
                  <Button
                    variant={"outline"}
                    onClick={() => setShowAttachArticle(true)}
                  >
                    + Add Article
                  </Button>
                  <Button variant={"secondary"} onClick={embed_collection}>
                    {" "}
                    <div class="w-4 h-4 mr-2">
                      <Share />
                    </div>
                    <span>Share</span>
                  </Button>
                </div>
              </Show>
            </div>

            <div class="overflow-auto text-muted-foreground">
              {collection_details().description}
            </div>
            <div class="flex gap-2 items-center">
              <div class="">
                {new Date(collection_details().createdAt).toLocaleDateString()}
              </div>
            </div>

            <Show when={collection_details()?.articles?.length === 0}>
              <div class="flex flex-col gap-6  items-center w-full h-full">
                <div class="p-4 text-primary-100 w-full">
                  <Empty message="No articles found" />
                </div>
                <Button
                  variant={"secondary"}
                  onClick={() => setShowAttachArticle(true)}
                >
                  + Add Article
                </Button>
              </div>
            </Show>
          </div>

          <Separator />
          <Show when={collection_details()?.articles?.length}>
            <div class="flex flex-col gap-6 p-3">
              <div class="w-full flex items-center justify-between">
                <div class="text-xl font-bold text-text underline underline-offset-2">
                  List of Attached Articles
                </div>
              </div>

              <For each={collection_details()?.articles}>
                {(article) => (
                  <div class="flex p-4 flex-col gap-3 bg-white">
                    <div class="flex justify-between items-center">
                      <div class="flex items-center text-2xl font-bold text-primary leading-10">
                        {article.name}
                      </div>
                      <div class="flex items center gap-3 text-muted-foreground text-sm">
                        <div class="flex gap-2 items-center">
                          <BadgeDelta deltaType="increase">
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
      </Show>
      <Show when={collection()?.isErr()}>
        <div class="p-4 text-primary-100">Error loading collection</div>
      </Show>
      <Show when={showAttachArticle()}>
        <ArticleAttach
          collection={collection}
          show={showAttachArticle()}
          onShowChange={() => setShowAttachArticle(false)}
        />
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
