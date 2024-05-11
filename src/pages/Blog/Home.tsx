import { createResource } from "solid-js";
import { Component } from "solid-js";
import { Callout, CalloutContent, CalloutTitle } from "~/components/ui/callout";

const fetch_collections = async () => {
  try {
    const res = await fetch("http://localhost:1337/api/collections/" + 20);
    if (!res.ok) {
      throw new Error("Failed to fetch collections");
    }
    return await res.json();
  } catch (err) {
    console.log(err);
    return [];
  }
};

const BlogHome: Component = () => {
  const [collections, { refetch }] = createResource(fetch_collections);

  return (
    <div class="w-full h-full p-6 flex gap-3 flex-col">
      <div class="text-xl font-semibold">Orange Gas Blog</div>

      <Callout>
        <CalloutTitle>Fold the space</CalloutTitle>
        <CalloutContent>
          This whole blog was created using the Orange Gas Platform. We use our
          own tools to build.
        </CalloutContent>
      </Callout>
    </div>
  );
};

export default BlogHome;
