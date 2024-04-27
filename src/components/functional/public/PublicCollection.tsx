import { Component, createResource, createSignal, Show } from "solid-js";

import { fetch_collection_by_id } from "@lib/service/collection";
import { BadgeDelta } from "~/components/ui/badge-delta";
import { For } from "solid-js";
import { Separator } from "~/components/ui/separator";
import Empty from "~/components/bare/Empty";
import { A } from "@solidjs/router";

const PublicCollection: Component = (props) => {
  const userId = props.params.user_id;
  const collectionId = props.params.id;

  console.log(props.params.userId);

  const [collection] = createResource(collectionId, fetch_collection_by_id);
  const [loading] = createSignal(false);

  const collection_details = () => collection()?.value;

  return (
    <div class="flex flex-col flex-1 flex-grow overflow-hidden p-3  w-[69%] m-auto p-6">
      <Show when={collection()?.isErr()}>
        <div class="p-4 text-primary-100">Error loading collection</div>
      </Show>
      <Show when={loading()}>
        <div class="p-4 text-primary-100">Loading collection</div>
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
                        <A href={`/public/${userId}/article/${article.id}`}>
                          {article.name}
                        </A>
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
    </div>
  );
};

export default PublicCollection;
