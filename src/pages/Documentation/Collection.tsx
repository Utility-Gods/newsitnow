import { A } from "@solidjs/router";
import {
  Component,
  createEffect,
  createResource,
  createSignal,
  Show,
} from "solid-js";
import CalloutJoin from "~/components/bare/common/CalloutJoin";
import PageSkeleton from "~/components/bare/common/PageSkeleton";
import { BadgeDelta } from "~/components/ui/badge-delta";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";

async function fetch_collections() {
  try {
    const res = await fetch(
      "https://orange-gas-strapi.fly.dev/api/public-collection?populate%5Bcreator%5D%5Bfields%5D%5B0%5D=id&populate%5Bcreator%5D%5Bfields%5D%5B1%5D=username&populate%5Barticles%5D%5Bfields%5D%5B0%5D=id&populate%5Barticles%5D%5Bfields%5D%5B1%5D=name&populate%5Barticles%5D%5Bfields%5D%5B2%5D=status&populate%5Barticles%5D%5Bfields%5D%5B3%5D=createdAt&populate%5Barticles%5D%5Bfields%5D%5B4%5D=text&populate%5Barticles%5D%5Bfields%5D%5B5%5D=text_id&filters%5Bid%5D=18",
    );

    if (!res.ok) {
      throw new Error("Failed to fetch collections");
    }

    return res.json();
  } catch (err) {
    console.log(err);
    return [];
  }
}

type Status = "Published" | "All";

const Collection: Component = () => {
  const [status, setStatus] = createSignal<Status>("Published");
  const [collections, { refetch }] = createResource(status, fetch_collections);

  createEffect(() => {
    console.log("fetching collections");
    console.log(collections());
  });
  return (
    <div class="flex flex-col flex-1 flex-grow overflow-hidden p-3 gap-6">
      <Show
        when={!collections.loading}
        fallback={<PageSkeleton></PageSkeleton>}
      >
        <Show when={collections()}>
          <div class="p-3  border-border border bg-muted flex items-center justify-between flex-shrink-0 gap-6">
            <div class="flex flex-col">
              <div class="flex gap-3 items-end">
                <div class="text-2xl font-bold text-secondary">
                  {collections().name}
                </div>

                <div class="flex items-end gap-3 text-muted-foreground text-sm">
                  <div class="">
                    {new Date(collections().createdAt).toLocaleDateString()}
                  </div>
                  <div class="flex gap-2 items-center">
                    <BadgeDelta
                      innerHTML
                      deltaType={
                        collections().status === "Published"
                          ? "increase"
                          : "decrease"
                      }
                    >
                      {collections().status}
                    </BadgeDelta>
                  </div>
                </div>
              </div>
              <div class="overflow-auto text-muted-foreground text-md clamp-lines line-clamp-3 mt-2">
                {collections().description}
              </div>
            </div>
          </div>
          <Show when={collections()?.articles?.length}>
            <div class="flex flex-col gap-3">
              <div class="w-full flex items-center justify-between">
                <div class="font-regular text-dim_gray px-3 text-sm underline underline-offset-2">
                  {collections()?.articles?.length ?? 0} Articles in this
                  collection
                </div>
                <div class="flex gap-2 items-center">
                  <Checkbox
                    checked={status() == "All"}
                    onChange={() => {
                      if (status() === "Published") {
                        setStatus("All");
                      } else {
                        setStatus("Published");
                      }
                    }}
                  ></Checkbox>
                  <Label>Include Drafts</Label>
                </div>
              </div>

              <For each={collections()?.articles}>
                {(article) => (
                  <div class="flex p-4 flex-col gap-3 border-border border bg-muted">
                    {" "}
                    <div class="flex justify-between items-center">
                      <div class="flex items-center text-md font-regular text-primary underline underline-offset-2 leading-10">
                        <A href={`/documentation/article/${article.text_id}`}>
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
                  </div>
                )}
              </For>
            </div>
          </Show>
        </Show>
      </Show>
    </div>
  );
};

export default Collection;
