import { Component, createEffect, createResource, Show } from "solid-js";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

import { fetch_article_by_id } from "@lib/service/article";
import { BadgeDelta } from "~/components/ui/badge-delta";
import BreadCrumb from "~/components/bare/common/BreadCrumb";
import PageSkeleton from "~/components/bare/common/PageSkeleton";
import { useNavigate, useSearchParams } from "@solidjs/router";
import ArticleCreate from "./ArticleCreate";
import ArticleUpdate from "~/components/functional/article/ArticleUpdate";

const ArticleView: Component = (props) => {
  const navigate = useNavigate();
  const [urlParams, setParams] = useSearchParams();
  console.log({ ...urlParams });

  const editMode = () => urlParams["edit"] == "true";

  const [article] = createResource(props.params.id, fetch_article_by_id);

  const article_details = () => article()?.value;

  createEffect(() => {
    console.log(article_details());
  });

  const article_image = () => article_details()?.photo?.[0].url ?? null;

  return (
    <div class="flex flex-col flex-1 flex-grow overflow-auto no-scrollbar p-3 ">
      <div class="flex items-center justify-between">
        <BreadCrumb
          crumbs={[
            { href: "/app/", label: "Home" },
            { href: "/app/article", label: "Article" },
          ]}
        />
        <Tabs
          defaultValue={editMode() ? "edit" : "view"}
          onChange={(e) => {
            console.log(e);
            if (e === "edit") {
              // navigate(`/app/article/${props.params.id}?edit=true`);
              setParams({
                edit: "true",
              });
            }
            if (e === "view") {
              setParams({
                edit: "",
              });
            }
          }}
        >
          <TabsList class="grid w-full grid-cols-2">
            <TabsTrigger value="view">View</TabsTrigger>
            <TabsTrigger value="edit">Edit</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <Show when={article.loading}>
        <PageSkeleton />
      </Show>

      <Show when={article()?.isOk()}>
        <Show when={!editMode()}>
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
                  {article_details().name}
                </div>
                <div class="flex items-end gap-3 text-muted-foreground text-sm">
                  <div class="flex gap-2 items-center">
                    <BadgeDelta deltaType="increase">
                      {article_details().status}
                    </BadgeDelta>
                  </div>
                  <div class="flex gap-2 items-center">
                    <div class="">
                      {new Date(
                        article_details().createdAt,
                      ).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="p-3 max-h-full overflow-auto no-scrollbar">
              <div class="" innerHTML={article_details().text}></div>
            </div>
          </div>
        </Show>
        <Show when={editMode()}>
          <div class="mt-4 flex flex-col p-400 text-primary-100 rounded-sm ">
            <ArticleUpdate article={article_details()} />
          </div>
        </Show>
      </Show>
      <Show when={article()?.isErr()}>
        <div class="p-4 text-primary-100">Error loading article</div>
      </Show>
    </div>
  );
};

export default ArticleView;
