import { get_token } from "@lib/utils";
import { err, ok } from "neverthrow";

// Assuming BASE_URL is the environment variable containing your API URL.
const BASE_URL = import.meta.env.VITE_STRAPI_URL as string;

const fetch_collections = async () => {
  try {
    const token = get_token();

    const reqHeaders = new Headers();
    reqHeaders.append("Authorization", `Bearer ${token}`);

    const response = await fetch(`${BASE_URL}/api/collections`, {
      headers: reqHeaders,
      method: "GET",
    });

    const result = await response.json();

    console.log("fetching collections", result);
    return ok(result);
  } catch (e) {
    console.log(e);
    return err(e);
  }
};

const save_collection = async (data: any) => {
  console.log("sending this payload", data);
  try {
    const token = get_token();

    const reqHeaders = new Headers();
    reqHeaders.append("Authorization", `Bearer ${token}`);
    reqHeaders.append("Content-Type", "application/json");

    const response = await fetch(`${BASE_URL}/api/collections`, {
      method: "POST",
      headers: reqHeaders,
      body: JSON.stringify({ data }),
    });

    const result = await response.json();

    console.log("saving collection", result);
    if (!response.ok) {
      return err(result);
    }
    return ok(result);
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
    const token = get_token();

    const reqHeaders = new Headers();
    reqHeaders.append("Authorization", `Bearer ${token}`);

    const response = await fetch(`${BASE_URL}/api/collections/${id}`, {
      headers: reqHeaders,
      method: "GET",
    });

    const result = await response.json();

    if (!response.ok || !result.data) {
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
    const reqHeaders = new Headers();
    reqHeaders.append("Authorization", `Bearer ${token}`);

    const response = await fetch(`${BASE_URL}/api/collections/${id}`, {
      headers: reqHeaders,
      method: "DELETE",
    });

    const result = await response.json();

    if (!response.ok || !result.data) {
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
