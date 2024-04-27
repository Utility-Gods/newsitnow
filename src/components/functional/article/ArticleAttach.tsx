import { fetch_articles } from "@lib/service/article";
import { For, createResource } from "solid-js";
import { Show, createEffect } from "solid-js";
import PageSkeleton from "~/components/bare/PageSkeleton";
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

interface ArticleAttachProps {
  collection: any;
  show: boolean;
  onShowChange: (show: boolean) => void;
}

function ArticleAttach(props: ArticleAttachProps) {
  const collection = props.collection;

  const [articleList] = createResource(fetch_articles);

  createEffect(() => {
    console.log(collection());
  });

  async function attach_articles() {
    console.log("attaching articles");
  }
  return (
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
          {/* <Show when={collection()}>
            <div class="bg-muted p-3 w-full">
              <div class="flex items-center gap-3">
                <div class="text-primary-foreground font-bold text-md">
                  {collection().value.name}
                </div>
                <div class="flex items-center gap-3 text-muted-foreground text-sm">
                  <div class="flex gap-2 items-center">
                    <BadgeDelta deltaType="increase">
                      {collection().value.status}
                    </BadgeDelta>
                  </div>
                  <div class="flex gap-2 items-center">
                    <div class="">
                      {new Date(
                        collection().value.createdAt,
                      ).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
              <div class="allow-3-lines">{collection().value.description}</div>
            </div>
          </Show> */}
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

          {/* show a list of articles with check mark to check and select */}
          <For each={articleList()?.value}>
            {(article, index) => (
              <div class="flex items center gap-3 p-3 bg-muted">
                <div class="flex items center gap-3">
                  <Checkbox id={`article_attach_label_${index()}`} />
                  <Label for={`article_attach_label_${index()}`}>
                    <div class="text-primary-foreground font-bold text-md">
                      {article.name}
                    </div>
                  </Label>
                </div>
                <div class="flex items center gap-3 text-muted-foreground text-sm">
                  <div class="flex gap-2 items-center">
                    <BadgeDelta deltaType="increase">
                      {article.status}
                    </BadgeDelta>
                  </div>
                  <div class="flex gap-2 items-center">
                    <div class="">
                      {new Date(article.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div class="allow-3-lines">{article.description}</div>
                </div>
              </div>
            )}
          </For>
        </Show>
        <DialogFooter>
          <Button
            variant="ghost"
            type="button"
            onClick={() => props.onShowChange(false)}
          >
            Close
          </Button>
          <Button onClick={attach_articles()} variant="secondary">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ArticleAttach;
