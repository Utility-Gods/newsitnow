import { strapi } from "@lib/strapi";
import { Collection } from "@lib/types/Collection";
import { get_token } from "@lib/utils";

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



const delete_collection = async (id: string) => {
  const token = get_token();
  if (!id) {
    return err("No id provided");
  }

  try {
    strapi.setToken(token);
    const result = await strapi.delete<Collection>("collections", id);
    if (!result) {
      return err(result);
    }
    return ok(result.data);
  } catch (e) {
    console.log(e);
    return err(e);
  }
};

export {
  fetch_collections,
  save_collection,
  fetch_collection_by_id,
  delete_collection,
};
