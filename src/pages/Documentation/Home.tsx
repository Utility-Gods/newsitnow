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

const DHome: Component = () => {
  const [collections, { refetch }] = createResource(fetch_collections);

  return (
    <div>
      <h1>Documentation</h1>
      <p>This is the documentation page. It is a work in progress.</p>
    </div>
  );
};

export default DHome;
