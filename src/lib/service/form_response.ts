import { get_token } from "@lib/utils";
import { err, ok } from "neverthrow";

const BASE_URL = import.meta.env.VITE_STRAPI_URL as string;

export const fetch_form_response = async ({ id, org_id }) => {
  try {
    console.log("fetching form response", id, org_id);

    const token = get_token();
    const reqHeaders = new Headers();
    reqHeaders.append("Authorization", `Bearer ${token}`);
    reqHeaders.append("Content-Type", "application/json");

    const response = await fetch(
      `${BASE_URL}/api/form-responses?org_id=${org_id}&&form_id=${id}`,
      {
        method: "GET",
        headers: reqHeaders,
      },
    );

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

export const save_form_response = async (data: any) => {
  try {
    console.log("sending this payload", data);
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
