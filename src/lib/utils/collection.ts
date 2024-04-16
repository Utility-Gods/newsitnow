import { get_token } from "@lib/utils";

async function generateEmbedCode(collectionId: number): Promise<string> {
  const strapiUrl = import.meta.env.VITE_STRAPI_URL; // Replace with your Strapi API URL

  // Generate HTML code
  const htmlCode = `
    <div id="embedded-collection"></div>
    <script>
    (function() {
      var collectionId = ${collectionId};
    
      // Fetch collection data from Strapi API
      fetch('${strapiUrl}/api/collections/' + collectionId, {
        headers: {
          Authorization: 'Bearer <Your Access Token>' // Replace YOUR_AUTH_TOKEN with your actual token
        }
      })
      .then(response => response.json())
      .then(data => {
        var collectionContent = data.data.attributes; // Adjust the property name based on your Strapi schema
        console.log(collectionContent);
        document.getElementById('embedded-collection').innerHTML = \` 
          <div>
              <h2>\${collectionContent.name}</h2>
              <p>\${collectionContent.content}</p>
              <p>Date: \${new Date(collectionContent.createdAt).toLocaleDateString()}</p>
          </div>
        \`;
      });
    })();
    </script>
    `;

  return htmlCode;
}

async function generateEmbedCodeExposed(collectionId: number): Promise<string> {
  const strapiUrl = import.meta.env.VITE_STRAPI_URL; // Replace with your Strapi API URL

  const strapiToken = get_token(); // Replace with your Strapi API token
  // Generate HTML code
  const htmlCode = `
    <div id="embedded-collection"></div>
    <script>
    (function() {
      var collectionId = ${collectionId};
    
      // Fetch collection data from Strapi API
      fetch('${strapiUrl}/api/collections/' + collectionId, {
        headers: {
          Authorization: 'Bearer ${strapiToken}' // Replace YOUR_AUTH_TOKEN with your actual token
        }
      })
      .then(response => response.json())
      .then(data => {
        var collectionContent = data.data.attributes; // Adjust the property name based on your Strapi schema
        console.log(collectionContent);
        document.getElementById('embedded-collection').innerHTML = \` 
          <div>
              <h2>\${collectionContent.name}</h2>
              <p>\${collectionContent.content}</p>
              <p>Date: \${new Date(collectionContent.createdAt).toLocaleDateString()}</p>
          </div>
        \`;
      });
    })();
    </script>
    `;

  return htmlCode;
}

function generateRestAPICode(collectionId: number): string {
  const strapiUrl = import.meta.env.VITE_STRAPI_URL; // Replace with your Strapi API URL

  const strapiToken = get_token(); // Replace with your Strapi API token

  const restAPICode = `
    fetch('${strapiUrl}/api/collections/' + ${collectionId}, {
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

function generateRestAPICodeExposed(collectionId: number): string {
  const strapiUrl = import.meta.env.VITE_STRAPI_URL; // Replace with your Strapi API URL

  const strapiToken = get_token(); // Replace with your Strapi API token

  const restAPICode = `
    fetch('${strapiUrl}/api/collections/' + ${collectionId}, {
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

function generateCollectionShareLink(
  collectionId: number,
  userId: number = 12
): string {
  const origin = import.meta.env.VITE_ORIGIN; // Replace with your Strapi API URL

  const link = `${origin}/public/${userId}/collection/${collectionId}`;

  return link;
}

export {
  generateEmbedCode,
  generateEmbedCodeExposed,
  generateRestAPICode,
  generateRestAPICodeExposed,
  generateCollectionShareLink,
};
