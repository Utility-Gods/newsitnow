import { fetch_collection_by_id } from "@lib/service/collection";
import { Collection } from "@lib/types/Collection";

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
import { BadgeDelta } from "~/components/ui/badge-delta";
import { Button } from "~/components/ui/button";
import { Callout, CalloutContent, CalloutTitle } from "~/components/ui/callout";
import { Separator } from "~/components/ui/separator";

type CollectionViewProps = {};

const CollectionView: Component = (props: CollectionViewProps) => {
  const [collection] = createResource(props.params.id, fetch_collection_by_id);

  const [showAttachArticle, setShowAttachArticle] = createSignal(false);

  createEffect(() => {
    console.log(collection());
  });

  const collection_details: () => Collection = () => collection()?.value;

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
        <div class="flex p-3 flex-col">
          <div class="flex justify-between items-center">
            <div class="flex items-center text-2xl font-bold text-primary leading-10">
              {collection_details().name}
            </div>
            <div class="flex items-center gap-3 text-muted-foreground text-sm">
              <div class="flex gap-2 items-center">
                <BadgeDelta deltaType="increase">
                  {collection_details().status}
                </BadgeDelta>
              </div>
              <div class="flex gap-2 items-center">
                <div class="">
                  {new Date(
                    collection_details().createdAt,
                  ).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
          <div class="overflow-auto">{collection_details().description}</div>

          <Show when={collection_details().articles.length === 0}>
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

        <Show when={collection_details().articles.length}>
          <div class="flex flex-col gap-6 p-4">
            <div class="w-full text-right">
              <Button
                variant={"secondary"}
                onClick={() => setShowAttachArticle(true)}
              >
                + Add Article
              </Button>
            </div>
            <For each={collection_details()?.articles}>
              {(article) => (
                <div class="flex p-3 flex-col gap-3 bg-white">
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
                  <div class="overflow-auto allow-3-lines">{article.text}</div>
                </div>
              )}
            </For>
          </div>
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
    </div>
  );
};
export default CollectionView;
