import { get_token } from "@lib/utils";
import { err, ok } from "neverthrow";

// Assuming BASE_URL is the environment variable containing your API URL.
const BASE_URL = import.meta.env.VITE_STRAPI_URL as string;

const fetch_organizations = async () => {
  try {
    const token = get_token();

    const reqHeaders = new Headers();
    reqHeaders.append("Authorization", `Bearer ${token}`);

    const response = await fetch(`${BASE_URL}/api/organizations`, {
      headers: reqHeaders,
      method: "GET",
    });

    if (!response.ok) {
      const error = await response.json();
      console.log("Fetch organization error:", error);
      throw error.error;
    }

    const result = await response.json();

    console.log("fetching organizations", result);
    return ok(result);
  } catch (e) {
    console.log(e);
    return err(e);
  }
};

const save_organization = async (data: any) => {
  console.log("sending this payload", data);
  try {
    const token = get_token();

    const reqHeaders = new Headers();
    reqHeaders.append("Authorization", `Bearer ${token}`);
    reqHeaders.append("Content-Type", "application/json");

    const response = await fetch(`${BASE_URL}/api/organizations`, {
      method: "POST",
      headers: reqHeaders,
      body: JSON.stringify({ data }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.log("Fetch organization error:", error);
      throw error.error;
    }

    const result = await response.json();

    return ok(result);
  } catch (e) {
    console.log(e);
    return err(e);
  }
};

const update_organization = async (data: any) => {
  console.log("sending this payload", data);
  try {
    const token = get_token();
    const reqHeaders = new Headers();
    reqHeaders.append("Authorization", `Bearer ${token}`);
    reqHeaders.append("Content-Type", "application/json");

    const response = await fetch(`${BASE_URL}/api/organizations/${data.id}`, {
      method: "PUT",
      headers: reqHeaders,
      body: JSON.stringify({ data }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.log("Fetch organization error:", error);
      throw error.error;
    }

    const result = await response.json();

    return ok(result);
  } catch (e) {
    console.log(e);
    return err(e);
  }
};

const fetch_organization_by_id = async (id: string) => {
  if (!id) {
    return;
  }

  try {
    const token = get_token();

    const reqHeaders = new Headers();
    reqHeaders.append("Authorization", `Bearer ${token}`);

    const response = await fetch(`${BASE_URL}/api/organizations/${id}`, {
      headers: reqHeaders,
      method: "GET",
    });

    if (!response.ok) {
      const error = await response.json();
      console.log("Fetch organization error:", error);
      throw error.error;
    }

    const result = await response.json();

    console.log("fetching organization by id", result);

    return ok(result);
  } catch (e) {
    console.log(e);
    return err(e);
  }
};

const delete_organization = async (id: string) => {
  const token = get_token();
  if (!id) {
    return err("No id provided");
  }

  try {
    const reqHeaders = new Headers();
    reqHeaders.append("Authorization", `Bearer ${token}`);

    const response = await fetch(`${BASE_URL}/api/organizations/${id}`, {
      headers: reqHeaders,
      method: "DELETE",
    });

    if (!response.ok) {
      const error = await response.json();
      console.log("Fetch organization error:", error);
      throw error.error;
    }

    const result = await response.json();

    return ok(result.data);
  } catch (e) {
    console.log(e);
    return err(e);
  }
};

export {
  fetch_organizations,
  save_organization,
  update_organization,
  fetch_organization_by_id,
  delete_organization,
};
