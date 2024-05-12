import { get_token, get_user_id } from "@lib/utils";
import { err, ok } from "neverthrow";
import qs from "qs";

const API_URL = import.meta.env.VITE_STRAPI_URL as string;

const fetch_user_plan = async () => {
  try {
    const token = get_token();

    const userId = get_user_id();
    const reqHeaders = new Headers();

    const query = qs.stringify(
      {
        populate: {
          organization: {
            populate: {
              plan: true,
            },
          },
        },
      },
      {
        encodeValuesOnly: true, // prettify URL
      },
    );

    reqHeaders.append("Authorization", `Bearer ${token}`);

    const response = await fetch(`${API_URL}/api/users/${userId}?${query}`, {
      headers: reqHeaders,
      method: "GET",
    });

    const result = await response.json();

    console.log("fetching user plan", result);
    return ok(result);
  } catch (e) {
    console.log(e);
    return err(e);
  }
};

export { fetch_user_plan };
