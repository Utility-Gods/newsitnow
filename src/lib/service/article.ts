import { get_token } from "@lib/utils";
import { Effect } from "effect";
import { err, ok } from "neverthrow";

// Assuming the environment variable is named REACT_APP_API_URL
const API_URL = import.meta.env.VITE_STRAPI_URL as string;

const fetch_articles = async () => {
  try {
    const token = get_token();
    const reqHeaders = new Headers();
    reqHeaders.append("Authorization", `Bearer ${token}`);
    console.log({ reqHeaders });

    const getArticleEffect = () =>
      Effect.tryPromise({
        try: () =>
          fetch(`${API_URL}/api/articles`, {
            headers: reqHeaders,
            method: "GET",
          }),
        catch: (unknown) => new Error(`something went wrong ${unknown}`),
      });

    const res = Effect.runPromise(getArticleEffect());

    const articles = await res.then((res) => res.json());

    return ok(articles);
  } catch (e) {
    console.log(e);
    return err(e);
  }
};

const save_article = async (data: any) => {
  try {
    console.log({ data });
    const token = get_token();
    const reqHeaders = new Headers();
    reqHeaders.append("Authorization", `Bearer ${token}`);
    reqHeaders.append("Content-Type", "application/json");

    const response = await fetch(`${API_URL}/api/articles`, {
      method: "POST",
      headers: reqHeaders,
      body: JSON.stringify({ data }),
    });

    const result = await response.json();
    console.log("saving article", result);

    if (!response.ok) {
      return err(result);
    }

    return ok(result);
  } catch (e) {
    console.log(e);
    return err(e);
  }
};

const update_article = async (data: any) => {
  try {
    console.log("sending this payload", data);
    const token = get_token();
    const reqHeaders = new Headers();
    reqHeaders.append("Authorization", `Bearer ${token}`);
    reqHeaders.append("Content-Type", "application/json");

    const response = await fetch(`${API_URL}/api/articles/${data.id}`, {
      method: "PUT",
      headers: reqHeaders,
      body: JSON.stringify({ data }),
    });

    const result = await response.json();
    console.log("updating article", result);

    if (!response.ok) {
      return err(result);
    }

    return ok(result);
  } catch (e) {
    console.log(e);
    return err(e);
  }
};

const fetch_article_by_id = async (id: string) => {
  if (!id) {
    return;
  }

  try {
    const token = get_token();
    const reqHeaders = new Headers();
    reqHeaders.append("Authorization", `Bearer ${token}`);

    const response = await fetch(`${API_URL}/api/articles/${id}`, {
      headers: reqHeaders,
      method: "GET",
    });

    const result = await response.json();

    if (!response.ok || !result) {
      return err(result);
    }

    return ok(result);
  } catch (e) {
    console.log(e);
    return err(e);
  }
};

const delete_article = async (id: string) => {
  const token = get_token();
  if (!id) {
    return err("No id provided");
  }

  try {
    const reqHeaders = new Headers();
    reqHeaders.append("Authorization", `Bearer ${token}`);

    const response = await fetch(`${API_URL}/api/articles/${id}`, {
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
  fetch_articles,
  save_article,
  update_article,
  fetch_article_by_id,
  delete_article,
};
