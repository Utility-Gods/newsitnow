import { strapi } from "@lib/strapi";
import { err, ok } from "neverthrow";

const fetch_articles = async () => {


  const articles = await strapi.find("articles");

  return articles;
};

const save_article = async (data: any) => {
  const result = await strapi.create("articles", data);

  if (!result.data) {
    return err(result.data);
  }
  return ok(result.data);
};

const fetch_article_by_id = async (id: string) => {
  console.log("fetch_article_by_id", id);
  if (!id) {
    return;
  }
  const article = await strapi.findOne("articles", id);

  return article;
};

export { fetch_articles, save_article, fetch_article_by_id };
