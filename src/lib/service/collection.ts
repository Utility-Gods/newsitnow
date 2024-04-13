import { strapi } from "@lib/strapi";
import { Collection } from "@lib/types/Collection";
import { err, ok } from "neverthrow";

const fetch_collections = async () => {
  try {
    const result = await strapi.find<Collection[]>("collections");
    return ok(result);
  } catch (e) {
    console.log(e);
    return err(e);
  }
};

const save_collection = async (data: any) => {
  try {
    const result = await strapi.create<Collection>("collections", data);
    if (!result.data) {
      return err(result.data);
    }
    return ok(result.data);
  } catch (e) {
    console.log(e);
    return err(e);
  }
};
const fetch_collection_by_id = async (id: string) => {
  if (!id) {
    return;
  }
  try {
    const result = await strapi.findOne<Collection>("collections", id);
    if (!result.data) {
      return err(result.data);
    }
    return ok(result.data);
  } catch (e) {
    console.log(e);
    return err(e);
  }
};

export { fetch_collections, save_collection, fetch_collection_by_id };
