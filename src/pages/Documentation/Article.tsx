import { Show, createEffect } from "solid-js";
import { Component, createResource } from "solid-js";
import BreadCrumb from "~/components/bare/common/BreadCrumb";
import PageSkeleton from "~/components/bare/common/PageSkeleton";
import { BadgeDelta } from "~/components/ui/badge-delta";

const fetch_articles = async (id: string) => {
  try {
    const res = await fetch("http://localhost:1337/api/articles/" + id, {});
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

  const [article] = createResource(articleId(), fetch_articles);

  const article_image = () => article()?.photo?.[0].url ?? null;

  createEffect(() => {
    console.log(article(), article());
  });
  return (
    <div class="flex flex-col flex-1 flex-grow overflow-auto no-scrollbar p-3 ">
      <BreadCrumb
        crumbs={[
          { href: "/documentation/", label: "Home" },
          { href: "/documentation/collections", label: "Collections" },
        ]}
      />
      <Show when={article.loading}>
        <PageSkeleton />
      </Show>

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
                  <div class="">
                    {new Date(article().createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="p-3 max-h-full overflow-auto no-scrollbar ql-editor">
            <div class="" innerHTML={article().text}></div>
          </div>
        </div>
      </Show>
    </div>
  );
};

export default Article;
