import { createResource } from "solid-js";
import { Component } from "solid-js";

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

const BlogHome: Component = () => {
  const [collections, { refetch }] = createResource(fetch_collections);

  return (
    <div>
      <div class="text-xl font-semibold">Blog</div>
      <p class="text-md">Coming soon</p>
    </div>
  );
};

export default BlogHome;
