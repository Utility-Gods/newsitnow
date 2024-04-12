import { strapi } from "@lib/strapi";
import { Collection } from "@lib/types/Collection";
import { err, ok } from "neverthrow";

const save_collection = async (data: any) => {
  const result = await strapi.create<Collection>("collections", data);

  if (!result.data) {
    return err(result.data);
  }
  return ok(result.data);
};

const fetch_collections = async () => {
  const collections = await strapi.find<Collection[]>("collections");

  console.log("fetching collections", collections);
  return collections;
};

const fetch_collection_by_id = async (id: string) => {
  const collection = await strapi.findOne<Collection>("collections", id);
  return collection;
};

export { fetch_collections, save_collection, fetch_collection_by_id };
