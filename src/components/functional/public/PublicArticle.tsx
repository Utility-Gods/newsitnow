import { Component, createResource, createSignal, Show } from "solid-js";

import { fetch_article_by_id } from "@lib/service/article";
import { BadgeDelta } from "~/components/ui/badge-delta";


const PublicArticle: Component = (props) => {
  const userId = props.params.userId;
  const articleId = props.params.id;

  const [article] = createResource(props.params.id, fetch_article_by_id);
  const [loading] = createSignal(false);

  const article_details = () => article()?.value?.attributes;

  return (
    <div class="flex flex-col flex-1 flex-grow overflow-hidden p-3  w-[69%] m-auto p-6">
      <Show when={article()?.isErr()}>
        <div class="p-4 text-primary-100">Error loading article</div>
      </Show>
      <Show when={loading()}>
        <div class="p-4 text-primary-100">Loading article</div>
      </Show>
      <Show when={article()?.isOk()}>
        <div class="mt-4 flex flex-col gap-3 p-400 text-primary-100 rounded-sm ">
          <div class="flex justify-between items-center ">
            <div class="text-2xl font-bold text-primary">
              {article_details().name}
            </div>
          </div>
          <div class="flex items-center gap-3 text-muted-foreground text-sm">
            <div class="flex gap-2 items-center">
              <BadgeDelta deltaType="increase">
                {article_details().status}
              </BadgeDelta>
            </div>
            <div class="flex gap-2 items-center">
              <div class="">
                {new Date(article_details().createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
          <div class="p-3 max-h-[69vh] overflow-auto border-border border">
            {article_details().content}
          </div>
        </div>
      </Show>
    </div>
  );
};

export default PublicArticle;
