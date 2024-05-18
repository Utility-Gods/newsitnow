import { type Component, createResource, Show, createSignal } from "solid-js";

import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";

import {
  delete_article,
  fetch_article_by_id,
  update_article,
} from "@lib/service/article";
import { BadgeDelta } from "~/components/ui/badge-delta";
import PageSkeleton from "~/components/bare/common/PageSkeleton";
import { A, useNavigate, useParams, useSearchParams } from "@solidjs/router";

import ArticleUpdate from "~/components/functional/article/ArticleUpdate";
import { Button } from "~/components/ui/button";
import { showToast } from "~/components/ui/toast";

import PageSpinner from "~/components/bare/common/PageSpinner";
import Share from "@lib/icons/share";
import AreYouSure from "~/components/functional/common/AreYouSure";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { get_first_org_id } from "@lib/utils";
import ThreeDots from "@lib/icons/ThreeDots";
import Link from "@lib/icons/link";
import Edit from "@lib/icons/Edit";
import Hidden from "@lib/icons/Hidden";
import Trash from "@lib/icons/Trash";

const ArticleView: Component = (props) => {
  const params = useParams();
  const [urlParams, setParams] = useSearchParams();

  const org_id = () => params.org_id ?? get_first_org_id();

  const navigate = useNavigate();
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

  async function handle_delete_article() {
    try {
      setLoading(true);
      const result = await delete_article(article_details().id);

      if (result?.isOk()) {
        refetch();
        showToast({
          variant: "success",
          title: "Article deleted",
          duration: 5000,
          description: "Article has been deleted successfully",
        });
        navigate(`/app/${org_id()}/articles`);
      }

      if (result?.isErr()) {
        showToast({
          title: "Some error occured",
          duration: 5000,
          description: "Could not delete article, please try again later",
          variant: "error",
        });
      }
    } catch (e) {
      console.log(e);
      showToast({
        variant: "error",
        title: "Failed to delete article",
        duration: 5000,
        description: "An error occurred while deleting the article",
      });
    } finally {
      setLoading(false);
    }
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
      setOpenPublishModal(false);
      setLoading(false);
    }
  }
  return (
    <div class="flex flex-col flex-1 flex-grow  p-3 overflow-hidden">
      <div class="flex justify-between items-center p-3 ">
        <div class="text-2xl font-bold text-primary leading-10">
          Article {editMode() ? "Edit" : "View"}
        </div>
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
                    <Show when={isPublished()}>
                      <A href="share" class="flex items-center gap-1">
                        <Button>
                          <div class="w-4 h-4 mr-2">
                            <Share />
                          </div>
                          <span>Share</span>
                        </Button>
                      </A>
                    </Show>
                    <Show when={!isPublished()}>
                      <Button
                        onClick={() => {
                          setOpenPublishModal(true);
                        }}
                      >
                        Publish
                      </Button>
                    </Show>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <div class="w-6 h-6 rotate-90">
                          <ThreeDots />
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <Show when={isPublished()}>
                          <DropdownMenuItem
                            class="text-primary-foreground focus:bg-error-foreground flex items-center gap-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              changeStatus("Draft");
                            }}
                          >
                            <div class="w-4 h-4">
                              <Hidden />
                            </div>
                            Unpublish
                          </DropdownMenuItem>
                        </Show>
                        <DropdownMenuItem
                          class="text-primary-foreground focus:bg-error-foreground flex items-center gap-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            handle_delete_article();
                          }}
                        >
                          <div class="w-4 h-4">
                            <Trash />
                          </div>
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>

              <div class="ql-snow ">
                <div class="p-3 max-h-full overflow-auto no-scrollbar ql-editor">
                  <div class="" innerHTML={article_details().text}></div>
                </div>
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
