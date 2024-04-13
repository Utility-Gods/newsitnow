import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { Separator } from "~/components/ui/separator";

import CableIcon from "@lib/icons/cable.jsx";

import { Callout, CalloutContent, CalloutTitle } from "~/components/ui/callout";

import PageSpinner from "@components/bare/PageSpinner";
import {
  Component,
  createEffect,
  createResource,
  createSignal,
  Show,
} from "solid-js";

import { fetch_article_by_id } from "@lib/service/article";
import { Button } from "~/components/ui/button";
import { showToast } from "~/components/ui/toast";
import { Badge } from "~/components/ui/badge";
import { BadgeDelta } from "~/components/ui/badge-delta";

type ArticleDetailsProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  articleId: any;
};

const ArticleDetails: Component<ArticleDetailsProps> = (props) => {
  const [article] = createResource(props.articleId, fetch_article_by_id);
  const [loading] = createSignal(false);

  const article_details = () => article()?.value?.attributes;

  createEffect(() => {
    console.log(article());
    console.log(article_details());
  });

  function embed_article() {
    // here we have to implement the logic to embed the article
    // first we need to prepare the code to embed the article
    // then we need to copy the code to clipboard
    // finally we need to show a toast message to the user
    console.log("Embed article");
    const code = `<iframe src="https://example.com/article/${props.articleId}" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>`;
    console.log(code);
    // copy to clipboard
    navigator.clipboard.writeText(code).then(
      function () {
        console.log("Code copied to clipboard");
        showToast({
          title: "Code copied to clipboard",
          description: "You can now paste the code in your website",
          variant: "success",
        });
      },
      function (err) {
        console.error("Could not copy text: ", err);
        showToast({
          title: "Error copying code",
          description: "Please try again",
          variant: "error",
        });
      }
    );
  }
  return (
    <>
      <Sheet open={props.open} onOpenChange={props.onOpenChange}>
        <SheetContent class="w-[400px] sm:w-[540px] overflow-auto no-scrollbar">
          <SheetHeader class="h-full">
            <SheetDescription class="flex flex-col justify-between flex-1">
              <Show when={article()?.isErr()}>
                <div
                  class="p-400 text
                -primary-100"
                >
                  Error loading article
                </div>
              </Show>
              <Show when={article()?.isOk()}>
                <div class="mt-4 flex flex-col gap-3 p-400 text-primary-100 rounded-sm ">
                  <div class="flex justify-between">
                    <div class="text-2xl font-semibold">
                      {article_details().name}
                    </div>
                    <Button variant={"secondary"} onClick={embed_article}>
                      <CableIcon class="w-4 h-4 mr-2" />
                      <span>Embed</span>
                    </Button>
                  </div>
                  <div class="flex items-center gap-3 text-muted-foreground text-sm">
                    <div class="flex gap-2 items-center">
                      <BadgeDelta deltaType="increase">
                        {article_details().status}
                      </BadgeDelta>
                    </div>
                    <div class="flex gap-2 items-center">
                      <div class="">
                        {new Date(
                          article_details().createdAt
                        ).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div class="p-3 max-h-[69vh] overflow-scroll border-border border">
                    {article_details().content}
                  </div>
                </div>
              </Show>
              <Separator />
            </SheetDescription>
            <SheetTitle class="flex items-end justify-end flex-col ">
              <Callout>
                <CalloutTitle>Notice</CalloutTitle>
                <CalloutContent>
                  You can view the details of the article here and find the code
                  to embed the article in your website.
                </CalloutContent>
              </Callout>
            </SheetTitle>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <Show when={loading()}>
        <PageSpinner />
      </Show>
    </>
  );
};

export default ArticleDetails;
