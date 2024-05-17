import {
  type Component,
  createEffect,
  createResource,
  createSignal,
  Show,
} from "solid-js";
import { Callout, CalloutContent, CalloutTitle } from "~/components/ui/callout";

import { BadgeDelta } from "~/components/ui/badge-delta";
import { For } from "solid-js";
import { Separator } from "~/components/ui/separator";
import Empty from "~/components/bare/common/Empty";
import { A, useSearchParams } from "@solidjs/router";
import qs from "qs";
import { err, ok } from "neverthrow";
import PageSkeleton from "~/components/bare/common/PageSkeleton";

async function fetch_collections(collectionId: string, includeDrafts: boolean) {
  try {
    const strapiUrl = import.meta.env.VITE_STRAPI_URL; // Replace with your Strapi API URL
    console.log(strapiUrl);
    const query = qs.stringify({
      populate: {
        creator: {
          fields: ["id", "username"],
        },
        articles: {
          fields: ["id", "name", "status", "createdAt", "text", "text_id"],
          ...(!includeDrafts
            ? {
                filters: {
                  status: "Published",
                },
              }
            : {}),
        },
      },
      filters: {
        text_id: collectionId,
      },
    });
    const res = await fetch(`${strapiUrl}/api/public-collection?${query}`);

    if (!res.ok) {
      return err(res.statusText);
    }

    const result = await res.json();

    console.log(result);

    return ok(result);
  } catch (err) {
    console.log(err);
    return [];
  }
}

const PublicCollection: Component = (props) => {
  const userId = props.params.user_id;
  const collectionId = props.params.id;
  const [urlParams, setParams] = useSearchParams();
  const includeDrafts = () => urlParams.includeDrafts === "true";

  createEffect(() => {
    console.log("PublicCollection", userId, collectionId, includeDrafts());
  });

  const [collection] = createResource(collectionId, () =>
    fetch_collections(collectionId, includeDrafts()),
  );

  const [loading] = createSignal(false);

  const collection_details = () => collection()?.value;

  return (
    <Show when={collection()} fallback={<PageSkeleton />}>
      <div class="flex flex-col flex-1 flex-grow p-3 w-full  sm:w-[69%] m-auto ">
        <Callout>
          <CalloutTitle>Attention</CalloutTitle>
          <CalloutContent>
            This collection was created on Orange Gas and share with you using
            the API share method provided by Orange Gas. The content of this
            collection can be updated directly from the Orange Gas platform and
            the changes will be reflected here.
          </CalloutContent>
        </Callout>
        <Show when={collection()?.isErr()}>
          <div class="p-4 text-primary-100">Error loading collection</div>
        </Show>
        <Show when={loading()}>
          <div class="p-4 text-primary-100">Loading collection</div>
        </Show>
        <Show when={collection()?.isOk()}>
          <Show
            when={Object.keys(collection_details()).length > 0}
            fallback={
              <div class="p-4 text-primary-100 w-full">
                <Empty message="No collection found" />
              </div>
            }
          >
            <div class="flex p-3 flex-col">
              <div class="flex justify-between">
                <div class="flex flex-col">
                  <div class="flex items-center text-2xl font-bold text-secondary leading-10">
                    {collection_details().name}
                  </div>
                </div>
              </div>

              <div class=" text-muted-foreground">
                {collection_details().description}
              </div>
              <div class="flex gap-2 items-center">
                <div class="">
                  {new Date(
                    collection_details().createdAt,
                  ).toLocaleDateString()}
                </div>
              </div>

              <Show when={collection_details()?.articles?.length === 0}>
                <div class="flex flex-col gap-6  items-center w-full h-full">
                  <div class="p-4 text-primary-100 w-full">
                    <Empty message="No articles found" />
                  </div>
                </div>
              </Show>
            </div>

            <Separator />
            <Show when={collection_details()?.articles?.length}>
              <div class="flex flex-col gap-3 p-3">
                <div class="w-full flex items-center justify-between">
                  <div class="text-xl font-bold text-text underline underline-offset-2">
                    List of Attached Articles
                  </div>
                </div>

                <For each={collection_details()?.articles}>
                  {(article) => (
                    <div class="flex p-4 flex-col gap-3 bg-white">
                      <div class="flex justify-between items-center">
                        <div class="flex underline underline-offset-2 items-center text-2xl font-bold text-primary leading-10">
                          <A
                            href={`/public/${userId}/article/${article.text_id}`}
                          >
                            {article.name}
                          </A>
                        </div>
                        <div class="flex items center gap-3 text-muted-foreground text-sm">
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
                          <div class="flex gap-2 items-center">
                            <div class="">
                              {new Date(article.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="overflow-auto allow-3-lines"
                        innerHTML={article.text}
                      ></div>
                    </div>
                  )}
                </For>
              </div>
            </Show>
          </Show>
        </Show>
      </div>
    </Show>
  );
};

export default PublicCollection;
