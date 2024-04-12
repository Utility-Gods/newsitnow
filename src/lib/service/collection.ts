import { strapi } from "@lib/strapi";
import { err, ok } from "neverthrow";

const save_collection = async (data: any) => {
  const result = await strapi.create("collections", data);

  if (!result.data) {
    return err(result.data);
  }
  return ok(result.data);
};

const fetch_collections = async () => {
  const collections = await strapi.find("collections");

  console.log("fetching collections", collections);
  return collections;
};

const fetch_collection_by_id = async (id: string) => {
  const collection = await strapi.findOne("collections", id);
  return collection;
};

export { fetch_collections, save_collection, fetch_collection_by_id };
