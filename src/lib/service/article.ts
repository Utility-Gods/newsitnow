import { strapi } from "@lib/strapi";
import { Article } from "@lib/types/Article";
import { err, ok } from "neverthrow";

const fetch_articles = async () => {
  try {
    const articles = await strapi.find<Article[]>("articles");
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
    if (!result.data) {
      return err(result.data);
    }
    return ok(result.data);
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

export { fetch_articles, save_article, fetch_article_by_id };
