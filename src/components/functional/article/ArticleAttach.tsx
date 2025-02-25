import { fetch_articles } from "@lib/service/article";
import { update_collection } from "@lib/service/collection";
import { show_error_toast } from "@lib/utils";
import { useParams } from "@solidjs/router";
import { For, createResource, createSignal, onMount } from "solid-js";
import { Show } from "solid-js";
import PageSkeleton from "~/components/bare/common/PageSkeleton";
import PageSpinner from "~/components/bare/common/PageSpinner";
import { BadgeDelta } from "~/components/ui/badge-delta";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "~/components/ui/dialog";
import { Label } from "~/components/ui/label";
import { showToast } from "~/components/ui/toast";

interface ArticleAttachProps {
  collection: any;
  show: boolean;
  onShowChange: (show: boolean) => void;
  onUpdate: () => void;
}

function ArticleAttach(props: ArticleAttachProps) {
  const collection = props.collection;
  const params = useParams();
  const org_id = () => params.org_id ?? get_first_org_id();

  const [articleList] = createResource(org_id, fetch_articles);

  const [loading, setLoading] = createSignal(false);

  const [attachedArticlesIdList, setAttachedArticlesIdList] = createSignal([]);

  onMount(() => {
    setAttachedArticlesIdList(collection()?.value?.articles.map((a) => a.id));
  });

  async function attach_articles() {
    setLoading(true);

    try {
      const updatedCollection = {
        ...collection().value,
        articles: attachedArticlesIdList(),
      };

      const result = await update_collection(updatedCollection, org_id());

      if (result.isOk()) {
        setLoading(false);
        props.onShowChange(false);
        props.onUpdate();
        showToast({
          title: "Success",
          description: "Articles attached successfully",
          variant: "success",
          duration: 5000,
        });
      }

      if (result.isErr()) {
        console.log({ result });
        setLoading(false);
        throw result.error;
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
      show_error_toast(e);
    }
  }
  return (
    <>
      <Show when={loading()}>
        <PageSpinner />
      </Show>
      <Dialog open={props.show} onOpenChange={props.onShowChange}>
        <DialogContent class="w-[600px]">
          <DialogHeader class="space-y-1.5 overflow-hidden">
            <div class="text-lg font-semibold leading-none tracking-tight text-primary">
              Attach Article
            </div>
            <div class="text-sm text-muted-foreground">
              Attach new articles to your collection and press save when you're
              done.
            </div>
          </DialogHeader>
          <Show when={articleList.loading}>
            <PageSkeleton />
          </Show>
          <Show when={articleList()?.isErr()}>
            <div class="text-center text-error-foreground">
              Error loading articles
            </div>
          </Show>
          <Show when={articleList() && articleList()?.isOk()}>
            <Show when={articleList()?.value.length === 0}>
              <div class="text-center">No articles found</div>
            </Show>
            <div class="max-h-[420px] overflow-auto flex flex-col gap-2">
              {/* show a list of articles with check mark to check and select */}
              <For each={articleList()?.value}>
                {(article, index) => (
                  <div class="flex items-center gap-3 p-3 bg-muted justify-between">
                    <div class="flex items center gap-3">
                      <Checkbox
                        checked={attachedArticlesIdList()?.includes(article.id)}
                        id={`article_attach_label_${index()}`}
                        onChange={(checked) => {
                          if (checked) {
                            setAttachedArticlesIdList([
                              ...attachedArticlesIdList(),
                              article.id,
                            ]);
                          } else {
                            setAttachedArticlesIdList(
                              attachedArticlesIdList().filter(
                                (id) => id !== article.id,
                              ),
                            );
                          }
                        }}
                      />
                      <Label for={`article_attach_label_${index()}`}>
                        <div class="text-primary-foreground font-bold text-md w-[220px] truncate">
                          {article.name}
                        </div>
                      </Label>
                    </div>
                    <div class="flex items center gap-3 text-muted-foreground text-sm">
                      <div class="flex gap-2 items-center">
                        <div class="">
                          {new Date(article.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div class="flex gap-2 items-center">
                        <BadgeDelta
                          deltaType={
                            article.status === "Published"
                              ? "increase"
                              : "decrease"
                          }
                        >
                          {article.status}
                        </BadgeDelta>
                      </div>
                    </div>
                  </div>
                )}
              </For>
            </div>
          </Show>
          <DialogFooter>
            <Button
              variant="ghost"
              type="button"
              onClick={() => props.onShowChange(false)}
            >
              Close
            </Button>
            <Button onClick={() => attach_articles()}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ArticleAttach;
