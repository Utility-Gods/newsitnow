import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";

import Share from "@lib/icons/share";

import { Callout, CalloutContent, CalloutTitle } from "~/components/ui/callout";

import PageSpinner from "@components/bare/common/PageSpinner";
import { Component, createResource, createSignal, Show } from "solid-js";

import { fetch_article_by_id } from "@lib/service/article";
import { Button } from "~/components/ui/button";

import { BadgeDelta } from "~/components/ui/badge-delta";
import ArticleShare from "./ArticleShare";

type ArticleDetailsProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  articleId: any;
  refetchArticles: () => void;
};

const ArticleDetails: Component<ArticleDetailsProps> = (props) => {
  const [article] = createResource(props.articleId, fetch_article_by_id);
  const [loading] = createSignal(false);
  const [openShareModal, setOpenShareModal] = createSignal(false);

  const article_details = () => article()?.value?.attributes;

  function embed_article() {
    // we need to show the Share/Embed dialog
    setOpenShareModal(true);
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
                  <div class="flex justify-between items-center ">
                    <div class="text-2xl font-bold text-primary">
                      {article_details().name}
                    </div>
                    <Button onClick={embed_article}>
                      <span>Share</span>
                      <div class="w-4 h-4 ml-2">
                        <Share />
                      </div>
                    </Button>
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
                        {new Date(
                          article_details().createdAt,
                        ).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div class="p-3 border-border border">
                    <div innerHTML={article_details().text} />
                  </div>
                </div>
              </Show>
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
      <ArticleShare
        article={article()?.value}
        show={openShareModal()}
        onShowChange={() => {
          setOpenShareModal(false);
        }}
      />
    </>
  );
};

export default ArticleDetails;
