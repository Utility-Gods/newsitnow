import {
  type Component,
  createEffect,
  createResource,
  Show,
  createSignal,
} from "solid-js";

import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";

import { fetch_article_by_id, update_article } from "@lib/service/article";
import { BadgeDelta } from "~/components/ui/badge-delta";
import BreadCrumb from "~/components/bare/common/BreadCrumb";
import PageSkeleton from "~/components/bare/common/PageSkeleton";
import { useSearchParams } from "@solidjs/router";

import ArticleUpdate from "~/components/functional/article/ArticleUpdate";
import { Button } from "~/components/ui/button";
import { showToast } from "~/components/ui/toast";

import PageSpinner from "~/components/bare/common/PageSpinner";
import Share from "@lib/icons/share";
import ArticleShare from "~/components/functional/article/ArticleShare";

const ArticleView: Component = (props) => {
  const [urlParams, setParams] = useSearchParams();

  const [loading, setLoading] = createSignal(false);
  const editMode = () => urlParams["edit"] == "true";

  const [article, { refetch }] = createResource(
    props.params.id,
    fetch_article_by_id,
  );

  const article_details = () => article()?.value;

  const [openShareModal, setOpenShareModal] = createSignal(false);

  createEffect(() => {
    console.log("article", article_details());
  });
  const article_image = () => article_details()?.photo?.[0].url ?? null;

  const isPublished = () => {
    if (!article_details()) return false;
    return article_details()?.status === "Published";
  };

  function embed_article() {
    if(!isPublished()){
      showToast({
        title: "Can not share article",
        description:"please publish the article first",
        variant: "warning",
        duration: 29000,
      });
      return;
    }
    // we need to show the Share/Embed dialog
    setOpenShareModal(true);
  }

  async function changeStatus(status: string) {
    console.log("publishing article");
    try {
      setLoading(true);
      const result = await update_article({
        ...article_details(),
        status,
      });

      if (result.isOk()) {
        console.log("article published");
        showToast({
          title: "Article status changed to " + status,
          description: "Article has been published",
          variant: "success",
          duration: 5000,
        });
        refetch();
      }

      if (result.isErr()) {
        console.log("error publishing article");
        showToast({
          title: "Error",
          description: "Error changing article status",
          variant: "error",
          duration: 5000,
        });
      }
    } catch (e) {
      console.log("error publishing article", e);
      showToast({
        title: "Error",
        description: "Error changing article status",
        variant: "error",
        duration: 5000,
      });
    } finally {
      console.log("done");
      setLoading(false);
    }
  }
  return (
    <div class="flex flex-col flex-1 flex-grow  p-3 overflow-auto">
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
      <Show when={!article.loading} fallback={<PageSkeleton />}>
        <Show when={article()?.isOk()}>
          <Show when={!editMode()}>
            <div class="mt-4 flex flex-col p-400 text-primary-100 rounded-sm overflow-auto">
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
                  <div class="flex  gap-3 text-muted-foreground items-center text-sm">
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
                        {new Date(
                          article_details().createdAt,
                        ).toLocaleDateString()}
                      </div>
                    </div>
                    <Button variant={"secondary"} onClick={embed_article}>
                      <div class="w-4 h-4 mr-2">
                        <Share />
                      </div>
                      <span>Share</span>
                    </Button>
                    <Show
                      when={!isPublished()}
                      fallback={
                        <Button
                          variant={"destructive"}
                          onClick={() => {
                            changeStatus("Draft");
                          }}
                        >
                          Unpublish
                        </Button>
                      }
                    >
                      <Button
                        variant={"secondary"}
                        onClick={() => {
                          changeStatus("Published");
                        }}
                      >
                        Publish
                      </Button>
                    </Show>
                  </div>
                </div>
              </div>

              <div class="p-3 max-h-full ">
                <div class="" innerHTML={article_details().text}></div>
              </div>
            </div>
          </Show>
          <Show when={editMode()}>
            <div class="mt-4 flex flex-col p-400 text-primary-100 rounded-sm h-full">
              1Update article={article_details()} />
            </div>
          </Show>
        </Show>
        <Show when={article()?.isErr()}>
          <div class="p-4 text-primary-100">Error loading article</div>
        </Show>
      </Show>

      <ArticleShare
        article={{
          id: article_details()?.id,
          attributes: {
            ...article_details(),
          },
        }}
        show={openShareModal()}
        onShowChange={() => {
          setOpenShareModal(false);
        }}
      />

      <Show when={loading()}>
        <PageSpinner />
      </Show>
    </div>
  );
};

export default ArticleView;
