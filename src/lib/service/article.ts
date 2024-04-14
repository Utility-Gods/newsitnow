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

async function generateEmbedCode(articleId: number): Promise<string> {
  const strapiUrl = import.meta.env.VITE_STRAPI_URL; // Replace with your Strapi API URL

  // Generate HTML code
  const htmlCode = `
          <div id="embedded-article"></div>
          <script>
            (function() {
              var articleId = '${articleId}';
      
              // Fetch article data from Strapi API
              fetch('${strapiUrl}/articles/' + articleId)
                .then(response => response.json())
                .then(data => {
                  var articleContent = data.content; // Adjust the property name based on your Strapi schema
                  document.getElementById('embedded-article').innerHTML = articleContent;
                })
                .catch(error => {
                  console.error(error);
                });
            })();
          </script>
        `;

  return htmlCode;
}

export { fetch_articles, save_article, fetch_article_by_id, generateEmbedCode };
