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
import PageSkeleton from "~/components/bare/common/PageSkeleton";
import { A, useSearchParams } from "@solidjs/router";

import ArticleUpdate from "~/components/functional/article/ArticleUpdate";
import { Button } from "~/components/ui/button";
import { showToast } from "~/components/ui/toast";

import PageSpinner from "~/components/bare/common/PageSpinner";
import Share from "@lib/icons/share";
import AreYouSure from "~/components/functional/common/AreYouSure";

const ArticleView: Component = (props) => {
  const [urlParams, setParams] = useSearchParams();

  const [loading, setLoading] = createSignal(false);
  const editMode = () => urlParams["edit"] == "true";

  const [article, { refetch }] = createResource(
    props.params.id,
    fetch_article_by_id,
  );

  const article_details = () => article()?.value;

  const [openPublishModal, setOpenPublishModal] = createSignal(false);

  const article_image = () => article_details()?.photo?.[0].url ?? null;

  const isPublished = () => {
    if (!article_details()) return false;
    return article_details()?.status === "Published";
  };

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
      setOpenPublishModal(false);
      setLoading(false);
    }
  }
  return (
    <div class="flex flex-col flex-1 flex-grow  p-3 overflow-hidden">
      <div class="flex items-center justify-between">
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
                    <Button>
                      <A href="share" class="flex items-center gap-1">
                        <div class="w-4 h-4 mr-2">
                          <Share />
                        </div>
                        <span>Share</span>
                      </A>
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
                          setOpenPublishModal(true);
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
              <ArticleUpdate article={article_details()} />
            </div>
          </Show>
        </Show>
        <Show when={article()?.isErr()}>
          <div class="p-4 text-primary-100">Error loading article</div>
        </Show>
      </Show>

      <Show when={loading()}>
        <PageSpinner />
      </Show>

      <AreYouSure
        show={openPublishModal()}
        onSubmit={() => {
          changeStatus("Published");
        }}
        message="Are you sure you want to publish this article?"
        onOpenChange={() => {
          setOpenPublishModal(false);
        }}
      />
    </div>
  );
};

export default ArticleView;
