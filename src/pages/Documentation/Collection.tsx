import { A } from "@solidjs/router";
import { Component, createEffect, createResource, Show } from "solid-js";
import PageSkeleton from "~/components/bare/common/PageSkeleton";

const fetch_collections = async () => {
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
    <div>
      <Show
        when={!collections.loading}
        fallback={<PageSkeleton></PageSkeleton>}
      >
        <Show when={collections()}>
          <div class="text-3xl underline underline-offset-2 font-semibold">
            {collections().name}
          </div>
          <div>{collections().description}</div>
          <div>
            {collections().articles.map((a: any) => (
              <A href={"/documentation/article/" + a.id}>{a.name}</A>
            ))}
          </div>
        </Show>
      </Show>
    </div>
  );
};

export default Collection;
