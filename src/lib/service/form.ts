import { get_token } from "@lib/utils";
import { err, ok } from "neverthrow";

const BASE_URL = import.meta.env.VITE_STRAPI_URL as string;

export const fetch_forms = async (org_id: number) => {
  try {
    const token = get_token();

    const reqHeaders = new Headers();
    reqHeaders.append("Authorization", `Bearer ${token}`);

    const response = await fetch(`${BASE_URL}/api/forms?org_id=${org_id}`, {
      headers: reqHeaders,
      method: "GET",
    });
    if (!response.ok) {
      const error = await response.json();
      console.log("Fetch forms error:", error);
      throw error.error;
    }

    const forms = await response.json();

    return ok(forms);
  } catch (e) {
    console.log(e, "-----------");
    return err(e);
  }
};

export const save_form = async (data: any) => {
  try {
    const token = get_token();

    const reqHeaders = new Headers();
    reqHeaders.append("Authorization", `Bearer ${token}`);
    reqHeaders.append("Content-Type", "application/json");

    const response = await fetch(`${BASE_URL}/api/forms`, {
      method: "POST",
      headers: reqHeaders,
      body: JSON.stringify({ data }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.log("Fetch form error:", error);
      throw error.error;
    }

    const result = await response.json();

    return ok(result);
  } catch (e) {
    console.log(e);
    return err(e);
  }
};

export const delete_form = async (id: number) => {
  try {
    const token = get_token();

    const reqHeaders = new Headers();
    reqHeaders.append("Authorization", `Bearer ${token}`);

    const response = await fetch(`${BASE_URL}/api/forms/${id}`, {
      method: "DELETE",
      headers: reqHeaders,
    });

    if (!response.ok) {
      const error = await response.json();
      console.log("Delete form error:", error);
      throw error.error;
    }

    const result = await response.json();

    return ok(result);
  } catch (e) {
    console.log(e);
    return err(e);
  }
};

export const update_form = async (data: any, org_id: string) => {
  try {
    const token = get_token();

    const reqHeaders = new Headers();
    reqHeaders.append("Authorization", `Bearer ${token}`);
    reqHeaders.append("Content-Type", "application/json");

    const response = await fetch(
      `${BASE_URL}/api/forms/${data.id}?org_id=${org_id}`,
      {
        method: "PUT",
        headers: reqHeaders,
        body: JSON.stringify({ data }),
      },
    );

    if (!response.ok) {
      const error = await response.json();
      console.log("Update form error:", error);
      throw error.error;
    }

    const result = await response.json();

    return ok(result);
  } catch (e) {
    console.log(e);
    return err(e);
  }
};

export const fetch_form_by_id = async ({ org_id, id }) => {
  if (!id) {
    return err("form id is missing");
  }

  try {
    const token = get_token();

    const reqHeaders = new Headers();
    reqHeaders.append("Authorization", `Bearer ${token}`);

    const response = await fetch(
      `${BASE_URL}/api/forms/${id}?org_id=${org_id}`,
      {
        headers: reqHeaders,
        method: "GET",
      },
    );
    if (!response.ok) {
      const error = await response.json();
      console.log("Fetch form error:", error);
      throw error.error;
    }

    const form = await response.json();

    return ok(form);
  } catch (e) {
    console.log(e, "-----------");
  }
  return err(e);
};

export const save_form_response = async (data: any) => {
  try {
    const token = get_token();

    const reqHeaders = new Headers();
    reqHeaders.append("Authorization", `Bearer ${token}`);
    reqHeaders.append("Content-Type", "application/json");

    const response = await fetch(`${BASE_URL}/api/form-responses`, {
      method: "POST",
      headers: reqHeaders,
      body: JSON.stringify({ data }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.log("Fetch form response error:", error);
      throw error.error;
    }

    const result = await response.json();

    return ok(result);
  } catch (e) {
    console.log(e);
    return err(e);
  }
};

export const count_forms = async (org_id: number) => {
  try {
    const token = get_token();

    const reqHeaders = new Headers();
    reqHeaders.append("Authorization", `Bearer ${token}`);

    const response = await fetch(
      `${BASE_URL}/api/forms/count?org_id=${org_id}`,
      {
        headers: reqHeaders,
        method: "GET",
      },
    );
    if (!response.ok) {
      const error = await response.json();
      console.log("Fetch forms error:", error);
      throw error.error;
    }

    const forms = await response.json();

    return ok(forms);
  } catch (e) {
    console.log(e, "-----------");
    return err(e);
  }
};
