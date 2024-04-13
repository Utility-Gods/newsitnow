import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";

import { Callout, CalloutContent, CalloutTitle } from "~/components/ui/callout";

import PageSpinner from "../../bare/PageSpinner";
import {
  Component,
  createEffect,
  createResource,
  createSignal,
  For,
  mergeProps,
  Show,
} from "solid-js";

import { fetch_article_by_id } from "@lib/service/article";

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
  return (
    <>
      <Sheet open={props.open} onOpenChange={props.onOpenChange}>
        <SheetContent class="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>
              <Callout>
                <CalloutTitle>Detais</CalloutTitle>
                <CalloutContent>
                  You can view the details of the article here and find the code
                  to embed the article in your website.
                </CalloutContent>
              </Callout>
            </SheetTitle>
            <SheetDescription>
              <Show when={article()?.isErr()}>
                <div
                  class="p-400 text
                -primary-100"
                >
                  Error loading article
                </div>
              </Show>
              <Show when={article()?.isOk()}>
                <div class="mt-4 flex flex-col gap-4 p-400 text-primary-100 rounded-sm ">
                  <div class="flex gap-3 items-center">
                    <div class="text-md font-semibold">Name</div>
                    <div class="text-md font-semibold">
                      {article_details().name}
                    </div>
                  </div>
                  <div class="flex gap-3 items-center">
                    <div class="text-md font-semibold">Description</div>
                    <div class="text-md font-semibold text-truncate">
                      {article_details().content}
                    </div>
                  </div>
                  <div class="flex gap-3 items-center">
                    <div class="text-md font-semibold">Created</div>
                    <div class="text-md font-semibold">
                      {new Date(
                        article_details().createdAt
                      ).toLocaleDateString()}
                    </div>
                  </div>
                  <div class="flex gap-3 items-center">
                    <div class="text-md font-semibold">Status</div>
                    <div class="text-md font-semibold">
                      {article_details().status}
                    </div>
                  </div>
                </div>
              </Show>
            </SheetDescription>
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
