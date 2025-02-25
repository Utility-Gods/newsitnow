import { Show, createEffect } from "solid-js";
import { Component, createResource } from "solid-js";
import PageSkeleton from "~/components/bare/common/PageSkeleton";
import { BadgeDelta } from "~/components/ui/badge-delta";
import qs from "qs";

const fetch_articles = async (id: string) => {
  try {
    const query = qs.stringify({
      populate: {
        author: {
          fields: ["id", "username"],
        },
        photo: {
          fields: ["id", "url"],
        },
      },
      filters: {
        text_id: id,
      },
    });

    const res = await fetch(
      "https://orange-gas-strapi.fly.dev/api/public-article?" + query,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (!res.ok) {
      return null;
    }
    return await res.json();
  } catch (err) {
    console.log(err);
    return null;
  }
};

const Article: Component = (props) => {
  const articleId = () => props.params.id;

  const [article] = createResource(articleId, fetch_articles);

  const article_image = () => article()?.photo?.[0].url ?? null;

  const article_status = () => article()?.status ?? "Draft";

  const delta_type = () => {
    console.log(article_status());
    switch (article_status()) {
      case "Draft":
        return "decrease";
      case "Published":
        return "increase";
      default:
        return "decrease";
    }
  };

  createEffect(() => {
    console.log(article(), article(), article_image());
  });
  return (
    <div class="flex flex-col flex-1 flex-grow overflow-auto no-scrollbar p-3 ">
      <Show when={!article.loading} fallback={<PageSkeleton />}>
        <Show when={article()}>
          <div class="mt-4 flex flex-col p-400 text-primary-100 rounded-sm ">
            <div
              class={`bg-image relative flex items-between flex-col justify-end flex-shrink-0
                ${article_image() ? "h-[240px]" : ""}
              `}
              style={{
                "background-image": `url(${article_image()})`,
              }}
            >
              <div class="flex justify-between items-end p-3 bg-muted">
                <div class="text-2xl font-bold text-primary">
                  {article().name}
                </div>
                <div class="flex items-end gap-3 text-muted-foreground text-sm">
                  <div class="flex gap-2 items-center">
                    <BadgeDelta deltaType={delta_type()}>
                      {article_status()}
                    </BadgeDelta>
                  </div>
                  <div class="flex gap-2 items-center">
                    <div class="">
                      {new Date(article().createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="ql-snow ">
              <div class="p-3 max-h-full overflow-auto no-scrollbar ql-editor">
                <div class="" innerHTML={article().text}></div>
              </div>
            </div>
          </div>
        </Show>
      </Show>
    </div>
  );
};

export default Article;
