import { A } from "@solidjs/router";
import { Component, createEffect, createResource, Show } from "solid-js";
import BreadCrumb from "~/components/bare/common/BreadCrumb";
import PageSkeleton from "~/components/bare/common/PageSkeleton";
import { BadgeDelta } from "~/components/ui/badge-delta";

const fetch_collections = async (id) => {
  try {
    const res = await fetch("http://localhost:1337/api/collections/" + 18);
    if (!res.ok) {
      throw new Error("Failed to fetch collections");
    }
    return await res.json();
  } catch (err) {
    console.log(err);
    return [];
  }
};

const Collection: Component = () => {
  const [collections, { refetch }] = createResource(fetch_collections);

  createEffect(() => {
    console.log(collections());
  });
  return (
    <div class="flex flex-col flex-1 flex-grow overflow-hidden p-3 gap-6">
      <BreadCrumb
        crumbs={[
          { href: "/documentation", label: "Documentation" },
          { href: "/documentation/collection", label: "Collections" },
        ]}
      />
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
                      deltaType={
                        collections().status === "published"
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
              </div>

              <For each={collections()?.articles}>
                {(article) => (
                  <div class="flex p-4 flex-col gap-3 border-border border bg-muted">
                    {" "}
                    <div class="flex justify-between items-center">
                      <div class="flex items-center text-md font-regular text-primary underline underline-offset-2 leading-10">
                        <A href={`/documentation/article/${article.id}`}>
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
