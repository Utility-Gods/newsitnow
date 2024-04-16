import { strapi } from "@lib/strapi";
import { Article } from "@lib/types/Article";
import { get_token } from "@lib/utils";
import { err, ok } from "neverthrow";

async function generateEmbedCode(articleId: number): Promise<string> {
  const strapiUrl = import.meta.env.VITE_STRAPI_URL; // Replace with your Strapi API URL

  // Generate HTML code
  const htmlCode = `
    <div id="embedded-article"></div>
    <script>
    (function() {
      var articleId = ${articleId};
    
      // Fetch article data from Strapi API
      fetch('${strapiUrl}/api/articles/' + articleId, {
        headers: {
          Authorization: 'Bearer <Your Access Token>' // Replace YOUR_AUTH_TOKEN with your actual token
        }
      })
      .then(response => response.json())
      .then(data => {
        var articleContent = data.data.attributes; // Adjust the property name based on your Strapi schema
        console.log(articleContent);
        document.getElementById('embedded-article').innerHTML = \` 
          <div>
              <h2>\${articleContent.name}</h2>
              <p>\${articleContent.content}</p>
              <p>Date: \${new Date(articleContent.createdAt).toLocaleDateString()}</p>
          </div>
        \`;
      });
    })();
    </script>
    `;

  return htmlCode;
}

async function generateEmbedCodeExposed(articleId: number): Promise<string> {
  const strapiUrl = import.meta.env.VITE_STRAPI_URL; // Replace with your Strapi API URL

  const strapiToken = get_token(); // Replace with your Strapi API token
  // Generate HTML code
  const htmlCode = `
    <div id="embedded-article"></div>
    <script>
    (function() {
      var articleId = ${articleId};
    
      // Fetch article data from Strapi API
      fetch('${strapiUrl}/api/articles/' + articleId, {
        headers: {
          Authorization: 'Bearer ${strapiToken}' // Replace YOUR_AUTH_TOKEN with your actual token
        }
      })
      .then(response => response.json())
      .then(data => {
        var articleContent = data.data.attributes; // Adjust the property name based on your Strapi schema
        console.log(articleContent);
        document.getElementById('embedded-article').innerHTML = \` 
          <div>
              <h2>\${articleContent.name}</h2>
              <p>\${articleContent.content}</p>
              <p>Date: \${new Date(articleContent.createdAt).toLocaleDateString()}</p>
          </div>
        \`;
      });
    })();
    </script>
    `;

  return htmlCode;
}

function generateRestAPICode(articleId: number): string {
  const strapiUrl = import.meta.env.VITE_STRAPI_URL; // Replace with your Strapi API URL

  const strapiToken = get_token(); // Replace with your Strapi API token

  const restAPICode = `
    fetch('${strapiUrl}/api/articles/' + ${articleId}, {
      headers: {
        Authorization: 'Bearer <Your Access Token>'
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    });
    `;

  return restAPICode;
}

function generateRestAPICodeExposed(articleId: number): string {
  const strapiToken = get_token(); // Replace with your Strapi API token
  const strapiUrl = import.meta.env.VITE_STRAPI_URL; // Replace with your Strapi API URL

  const restAPICode = `
    fetch('${strapiUrl}/api/articles/' + ${articleId}, {
      headers: {
        Authorization: 'Bearer ${strapiToken}'
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    });
    `;

  return restAPICode;
}

function generateArticleShareLink(
  articleId: number,
  userId: number = 12
): string {
  const origin = import.meta.env.VITE_ORIGIN; // Replace with your Strapi API URL

  const link = `${origin}/public/${userId}/article/${articleId}`;

  return link;
}

export {
  generateEmbedCode,
  generateEmbedCodeExposed,
  generateRestAPICode,
  generateRestAPICodeExposed,
  generateArticleShareLink,
};
