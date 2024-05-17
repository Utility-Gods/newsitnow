import { Component, createResource, createSignal, Show } from "solid-js";

import { BadgeDelta } from "~/components/ui/badge-delta";
import qs from "qs";
import { ok, err } from "neverthrow";
import { useParams } from "@solidjs/router";

const fetch_articles = async (id: string) => {
  try {
    const query = qs.stringify({
      populate: {
        author: {
          fields: ["id", "username"],
        },
      },
      filters: {
        text_id: id,
      },
    });

    const res = await fetch(
      "https://orange-gas-strapi.fly.dev/api/public-article?" + query,
    );
    if (!res.ok) {
      return err(res.statusText);
    }

    const result = await res.json();

    console.log(result);

    return ok(result);
  } catch (err) {
    console.log(err);
    return null;
  }
};

const PublicArticle: Component = (props) => {
  const userId = props.params.userId;
  const params = useParams();
  const articleId = params.id;

  const [article] = createResource(props.params.id, fetch_articles);
  const [loading] = createSignal(false);

  const article_details = () => article()?.value;

  return (
    <div class="flex flex-col flex-1 overflow-auto flex-grow p-6">
      <div class="sm:w-4/5 w-full mx-auto">
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
              <div class="flex gap-2 items-center">
                <div class="">
                  {new Date(article_details().createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
            <div
              class="p-3 border-border border no-tailwindcss"
              innerHTML={article_details().text}
            ></div>
          </div>
        </Show>
      </div>
    </div>
  );
};

export default PublicArticle;
