import { strapi } from "@lib/strapi";
import { Article } from "@lib/types/Article";
import { get_token, get_user } from "@lib/utils";
import { err, ok } from "neverthrow";

const fetch_articles = async () => {
  try {
    const token = get_token();

    const user = get_user();

    console.log("fetching user", user);

    strapi.setToken(token);

    const articles = await strapi.find<Article[]>("articles", {
      populate: "*",
      filters: {
        where: {
          $or: [{ author: { id: user.id } }],
        },
      },
    });
    console.log("fetching articles", articles);
    return ok(articles);
  } catch (e) {
    console.log(e);
    return err(e);
  }
};

const save_article = async (data: any) => {
  try {
    const result = await strapi.create<Article>("articles", data);
    console.log("saving article", result);

    if (!result) {
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
    const result = await strapi.findOne<Article>("articles", id);
    if (!result.data) {
      return err(result.data);
    }
    return ok(result.data);
  } catch (e) {
    console.log(e);
    return err(e);
  }
};

const delete_article = async (id: string) => {
  const token = get_token();
  if (!id) {
    return;
  }

  try {
    strapi.setToken(token);
    const result = await strapi.delete<Article>("articles", id);
    if (!result) {
      return err(result);
    }
    return ok(result.data);
  } catch (e) {
    console.log(e);
    return err(e);
  }
};

export { fetch_articles, save_article, fetch_article_by_id, delete_article };
