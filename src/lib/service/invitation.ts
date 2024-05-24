import { get_token } from "@lib/utils";
import { err, ok } from "neverthrow";

// Assuming BASE_URL is the environment variable containing your API URL.
const BASE_URL = import.meta.env.VITE_STRAPI_URL as string;
import qs from "qs";

export const invite_user = async (data: any) => {
  try {
    const token = get_token();

    const reqHeaders = new Headers();
    reqHeaders.append("Authorization", `Bearer ${token}`);
    reqHeaders.append("Content-Type", "application/json");

    const response = await fetch(`${BASE_URL}/api/invitations`, {
      method: "POST",
      headers: reqHeaders,
      body: JSON.stringify({
        data,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.log("Invite user error:", error);
      throw error.error;
    }

    const result = await response.json();

    return ok(result);
  } catch (e) {
    console.log(e);
    return err(e);
  }
};

export const fetch_invitation_by_id = async (invitation_id: number) => {
  try {
    const token = get_token();

    const reqHeaders = new Headers();
    reqHeaders.append("Authorization", `Bearer ${token}`);

    const query = qs.stringify({
      populate: {
        invited_by: {
          fields: ["id", "email", "name"],
        },
        organization: {
          fields: ["id", "name"],
        },
      },
    });

    const response = await fetch(`${BASE_URL}/api/invitations?${query}`, {
      headers: reqHeaders,
      method: "GET",
    });

    if (!response.ok) {
      const error = await response.json();
      console.log("Fetch invitation error:", error);
      throw error.error;
    }

    const result = await response.json();

    return ok(result);
  } catch (e) {
    console.log(e, "====");
    return err(e);
  }
};

export const verify_invitation = async (data: any) => {
  try {
    console.log("submitting verify invitation");
    if (data.password !== data.confirmPassword) {
      return err("Passwords do not match");
    }

    if (!data.email) {
      return err("Email is required");
    }

    const token = get_token();

    const reqHeaders = new Headers();
    reqHeaders.append("Authorization", `Bearer ${token}`);
    reqHeaders.append("Content-Type", "application/json");

    const response = await fetch(`${BASE_URL}/api/invitations/verify`, {
      method: "POST",
      headers: reqHeaders,
      body: JSON.stringify({
        data,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.log("Verify invitation error:", error);
      throw error.error;
    }

    const result = await response.json();

    return ok(result);
  } catch (e) {
    console.log(e);
    return err(e);
  }
};
