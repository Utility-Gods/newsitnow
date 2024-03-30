import { fetch_articles } from "@lib/service/article";
import { A, createAsync } from "@solidjs/router";
import { Component, For, Show, createEffect } from "solid-js";
import { Button } from "~/components/ui/button";

export const route = {
  load: () => fetch_articles,
};
const Article: Component = () => {
  const list = createAsync(fetch_articles);

  createEffect(() => {
    console.log({ list: list() });
  });

  console.log("coming here");

  console.log({ list });

  return (
    <div class="flex flex-col">
      <div class="text-2xl font-semibold leading-10">Articles</div>
      <Show when={list()}>
        {(data) => (
          <ul class="p-6 text-red-800 font-bold">
            <Button variant="destructive">Click me</Button>
            <For each={data().data}>
              {(post) => (
                <li>
                  {JSON.stringify(post)}
                  <h2>{post.id}</h2>

                  <span>
                    {post.user_created} &bull; {post.collection_id}
                  </span>
                </li>
              )}
            </For>
          </ul>
        )}
      </Show>
    </div>
  );
};

export default Article;
