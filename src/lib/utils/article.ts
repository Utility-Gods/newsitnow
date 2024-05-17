import { get_token } from "@lib/utils";
import qs from "qs";
async function generateEmbedCode(articleId: number): Promise<string> {
  const strapiUrl = import.meta.env.VITE_STRAPI_URL; // Replace with your Strapi API URL

  // Generate HTML code
  const htmlCode = `
    <div id="embedded-article"></div>
    <script>
    (function() {
      var articleId = ${articleId};
      fetch('${strapiUrl}/api/articles/' + articleId, {
      })
      .then(response => response.json())
      .then(data => {
        var articleContent = data;
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

  const query = qs.stringify({
    populate: {
      creator: {
        fields: ["id", "username"],
      },
      articles: {
        fields: ["id", "name", "status", "createdAt", "text", "text_id"],
      },
    },
    filters: {
      id: articleId,
    },
  });
  // Replace with your Strapi API token
  // Generate HTML code
  const htmlCode = `
    <div class="ql-snow">

      <div id="embedded-article" class="ql-editor"></div>
    </div>

    <script>
    (function() {
      var articleId = ${articleId};
      fetch('${strapiUrl}/api/public-article?${query}')
      .then(response => response.json())
      .then(data => {
        var articleContent = data.data.attributes;
        document.getElementById('embedded-article').innerHTML = \`
          <div>
              <h2>\${articleContent.name}</h2>
              <p>\${articleContent.text}</p>
              <p> Status: \${articleContent.status}</p>
              <p>Date: \${new Date(articleContent.createdAt).toLocaleDateString()}</p>
          </div>
        \`;
      });
    })();
    </script>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/quill/2.0.2/quill.core.css"
      integrity="sha512-a7lWBqHHHcLWWynFie8nxZ2haAUHs34w7XiVra9AjlL+/XpDK1GOAGfzcAoLW978tD8/fym7JYxDxg8uPszyfw=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />

    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/quill/2.0.2/quill.snow.css"
      integrity="sha512-ggYQiYwuFFyThzEv6Eo6g/uPLis4oUynsE88ovEde5b2swycOh9SlAI8FL/cL2AkGGNnWADPXcX2UnPIJS2ozw=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />
    `;

  return htmlCode;
}

function generateRestAPICode(articleId: number): string {
  const strapiUrl = import.meta.env.VITE_STRAPI_URL; // Replace with your Strapi API URL

  const strapiToken = get_token(); // Replace with your Strapi API token

  const restAPICode = `
    fetch('${strapiUrl}/api/articles/' + ${articleId})
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

function generateArticleShareLink(articleId: string, userId: number): string {
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
