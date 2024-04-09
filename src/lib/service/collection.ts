import { strapi } from "@lib/strapi";
import { err, ok } from "neverthrow";

const save_collection = async (data: any) => {
  try {
    const raw = JSON.stringify({
      name: data.name,
      description: data.description,
    });

    const requestOptions = {
      method: "POST",
      body: raw,
    };

    return await strapi.create("collections", {
      name: data.name,
      description: data.description,
    });
  } catch (e) {
    console.log(e);
  }
};

const fetch_collections = async () => {
  const collections = await strapi.find("collections");

  console.log("fetching collections", collections);
  return collections;
};

const fetch_collection_by_id = async (id: string) => {
  const requestOptions: RequestInit = {
    method: "GET",
    redirect: "follow",
  };

  console.log("fetching collection by id", id);

  const collection = await fetch(
    import.meta.env.VITE_DIRECTUS_PROJECT_URL + "items/Collections/" + id,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      return result.data;
    })
    .catch((error) => console.log("error", error));

  return collection;
};

export { fetch_collections, save_collection, fetch_collection_by_id };
