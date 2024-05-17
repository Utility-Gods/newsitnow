import { get_token } from "@lib/utils";
import { err, ok } from "neverthrow";

// Assuming BASE_URL is the environment variable containing your API URL.
const BASE_URL = import.meta.env.VITE_STRAPI_URL as string;

const fetch_collections = async (org_id: number) => {
  try {
    const token = get_token();

    const reqHeaders = new Headers();
    reqHeaders.append("Authorization", `Bearer ${token}`);

    const response = await fetch(
      `${BASE_URL}/api/collections?org_id=${org_id}`,
      {
        headers: reqHeaders,
        method: "GET",
      },
    );

    if (!response.ok) {
      const error = await response.json();
      console.log("Fetch collection error:", error);
      throw error.error;
    }

    const result = await response.json();

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

    if (!response.ok) {
      const error = await response.json();
      console.log("Fetch collection error:", error);
      throw error.error;
    }

    const result = await response.json();

    return ok(result);
  } catch (e) {
    console.log(e);
    return err(e);
  }
};

const update_collection = async (data: any) => {
  console.log("sending this payload", data);
  try {
    const token = get_token();
    const reqHeaders = new Headers();
    reqHeaders.append("Authorization", `Bearer ${token}`);
    reqHeaders.append("Content-Type", "application/json");

    const response = await fetch(`${BASE_URL}/api/collections/${data.id}`, {
      method: "PUT",
      headers: reqHeaders,
      body: JSON.stringify({ data }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.log("Fetch collection error:", error);
      throw error.error;
    }

    const result = await response.json();

    return ok(result);
  } catch (e) {
    console.log(e);
    return err(e);
  }
};

const fetch_collection_by_id = async ({ org_id, id }) => {
  if (!id) {
    return;
  }

  try {
    const token = get_token();

    const reqHeaders = new Headers();
    reqHeaders.append("Authorization", `Bearer ${token}`);

    const response = await fetch(
      `${BASE_URL}/api/collections/${id}?org_id=${org_id}`,
      {
        headers: reqHeaders,
        method: "GET",
      },
    );

    if (!response.ok) {
      const error = await response.json();
      console.log("Fetch collection error:", error);
      throw error.error;
    }

    const result = await response.json();

    console.log("fetching collection by id", result);

    return ok(result);
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

    if (!response.ok) {
      const error = await response.json();
      console.log("Fetch collection error:", error);
      throw error.error;
    }

    const result = await response.json();

    return ok(result.data);
  } catch (e) {
    console.log(e);
    return err(e);
  }
};

async function fetch_documentation_collections() {
  try {
    const res = await fetch(
      "https://orange-gas-strapi.fly.dev/api/public-collection?populate%5Bcreator%5D%5Bfields%5D%5B0%5D=id&populate%5Bcreator%5D%5Bfields%5D%5B1%5D=username&populate%5Barticles%5D%5Bfields%5D%5B0%5D=id&populate%5Barticles%5D%5Bfields%5D%5B1%5D=name&populate%5Barticles%5D%5Bfields%5D%5B2%5D=status&populate%5Barticles%5D%5Bfields%5D%5B3%5D=createdAt&populate%5Barticles%5D%5Bfields%5D%5B4%5D=text&populate%5Barticles%5D%5Bfields%5D%5B5%5D=text_id&filters%5Bid%5D=18",
    );

    if (!res.ok) {
      throw new Error("Failed to fetch collections");
    }

    return res.json();
  } catch (err) {
    console.log(err);
    return [];
  }
}

async function fetch_blogs_collections() {
  try {
    const res = await fetch(
      "https://orange-gas-strapi.fly.dev/api/public-collection?populate%5Bcreator%5D%5Bfields%5D%5B0%5D=id&populate%5Bcreator%5D%5Bfields%5D%5B1%5D=username&populate%5Barticles%5D%5Bfields%5D%5B0%5D=id&populate%5Barticles%5D%5Bfields%5D%5B1%5D=name&populate%5Barticles%5D%5Bfields%5D%5B2%5D=status&populate%5Barticles%5D%5Bfields%5D%5B3%5D=createdAt&populate%5Barticles%5D%5Bfields%5D%5B4%5D=text&populate%5Barticles%5D%5Bfields%5D%5B5%5D=text_id&filters%5Bid%5D=20",
    );

    if (!res.ok) {
      throw new Error("Failed to fetch collections");
    }

    return res.json();
  } catch (err) {
    console.log(err);
    return [];
  }
}

export {
  fetch_collections,
  save_collection,
  update_collection,
  fetch_collection_by_id,
  delete_collection,
  fetch_documentation_collections,
  fetch_blogs_collections,
};
