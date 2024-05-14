import { get_token } from "@lib/utils";
import qs from "qs";

async function generateEmbedCode(collectionId: number): Promise<string> {
  const strapiUrl = "https://orange-gas-strapi.fly.dev"; // Replace with your Strapi API URL

  // Generate HTML code
  const htmlCode = `
    <div id="embedded-collection"></div>
       <script>
       (function() {
         var collectionId = ${collectionId};

         // Fetch collection data from Strapi API
         fetch('\${strapiUrl}/api/collections/' + collectionId, {
           headers: {
             Authorization: 'Bearer <Auth_token>' // Replace YOUR_AUTH_TOKEN with your actual token
           }
         })
         .then(response => response.json())
         .then(data => {
           console.log({data})
           var collectionContent = data; // Adjust the property name based on your Strapi schema
           console.log(collectionContent);
           document.getElementById('embedded-collection').innerHTML = \`
             <div>
                 <h2>\${collectionContent.name}</h2>
                 <p>\${collectionContent.description}</p>
                 <p>Date: \${new Date(collectionContent.createdAt).toLocaleDateString()}</p>
             </div>
           \`;
           // loop through collectionContent.articles and append them to innerHTML

           collectionContent.articles.forEach(article => {
             document.getElementById('embedded-collection').innerHTML += \`
               <div>
                   <h3>\${article.name}</h3>
                   <p>\${article.text}</p>
                   <p>Date: \${new Date(article.createdAt).toLocaleDateString()}</p>
               </div>
             \`;
           });
         });
       })();
       </script>
    `;

  return htmlCode;
}

async function generateEmbedCodeExposed(
  collectionId: number,
  includeDrafts: boolean,
): Promise<string> {
  const strapiUrl = import.meta.env.VITE_PROD_API; // Replace with your Strapi API URL
  // Replace with your Strapi API token
  // Generate HTML code

  const query = qs.stringify({
    populate: {
      creator: {
        fields: ["id", "username"],
      },
      articles: {
        fields: ["id", "name", "status", "createdAt", "text", "text_id"],
        ...(!includeDrafts
          ? {
              filters: {
                status: "Published",
              },
            }
          : {}),
      },
    },
    filters: {
      id: collectionId,
    },
  });
  const htmlCode = `
    <div class="ql-snow">

      <div id="embedded-collection" class="ql-editor"></div>
    </div>
         <script>
         (function() {
           var collectionId = ${collectionId};

           // Fetch collection data from Strapi API
           fetch('${strapiUrl}/api/public-collection?${query}', {
           })
           .then(response => response.json())
           .then(data => {
             console.log({data})
             var collectionContent = data; // Adjust the property name based on your Strapi schema
             console.log(collectionContent);
             document.getElementById('embedded-collection').innerHTML = \`
               <div>
                   <h2>\${collectionContent.name}</h2>
                   <p>\${collectionContent.description}</p>
                   <p>Date: \${new Date(collectionContent.createdAt).toLocaleDateString()}</p>
                   <p><strong>Creator:</strong> \${collectionContent.creator.username}</p>
                   <p><strong>Status:</strong> \${collectionContent.status}</p>
               </div>
             \`;
             // loop through collectionContent.articles and append them to innerHTML

             collectionContent.articles.forEach(article => {
               document.getElementById('embedded-collection').innerHTML += \`
                 <div>
                     <h3>\${article.name}</h3>
                     <p>\${article.text}</p>
                     <p>Date: \${new Date(article.createdAt).toLocaleDateString()}</p>
                     <p><strong>Status:</strong> \${article.status}</p>
                 </div>
               \`;
             });
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

function generateRestAPICode(
  collectionId: number,
  includeDrafts: boolean = false,
): string {
  const strapiUrl = import.meta.env.VITE_PROD_API; // Replace with your Strapi API URL

  const query = qs.stringify({
    populate: {
      creator: {
        fields: ["id", "username"],
      },
      articles: {
        fields: ["id", "name", "status", "createdAt", "text", "text_id"],
        ...(!includeDrafts
          ? {
              filters: {
                status: "Published",
              },
            }
          : {}),
      },
    },
    filters: {
      id: collectionId,
    },
  });

  async function fetch_collections() {
    try {
      const res = await fetch("${strapiUrl}/api/public-collection?${query}");

      if (!res.ok) {
        throw new Error("Failed to fetch collections");
      }

      return res.json();
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  const restAPICode = `
    async function fetch_collections() {
      try {
        const res = await fetch("${strapiUrl}/api/public-collection?${query}");

        if (!res.ok) {
          throw new Error("Failed to fetch collections");
        }

        return res.json();
      } catch (err) {
        console.log(err);
        return [];
      }
    }
    `;

  return restAPICode;
}

function generateRestAPICodeExposed(
  collectionId: number,
  includeDrafts: boolean,
): string {
  const strapiUrl = import.meta.env.VITE_PROD_API; // Replace with your Strapi API URL
  const query = qs.stringify({
    populate: {
      creator: {
        fields: ["id", "username"],
      },
      articles: {
        fields: ["id", "name", "status", "createdAt", "text", "text_id"],
        ...(!includeDrafts
          ? {
              filters: {
                status: "Published",
              },
            }
          : {}),
      },
    },
    filters: {
      id: collectionId,
    },
  });

  const restAPICode = `

    async function fetch_collections() {
      try {
        const res = await fetch("${strapiUrl}/api/public-collection?${query}");

        if (!res.ok) {
          throw new Error("Failed to fetch collections");
        }

        return res.json();
      } catch (err) {
        console.log(err);
        return [];
      }
    }
    `;

  return restAPICode;
}

function generateCollectionShareLink(
  collectionId: number,
  userId: number = 12,
  includeDrafts: boolean,
): string {
  const origin = import.meta.env.VITE_ORIGIN; // Replace with your Strapi API URL

  const link = `${origin}/public/${userId}/collection/${collectionId}?includeDrafts=${includeDrafts}`;

  return link;
}

export {
  generateEmbedCode,
  generateEmbedCodeExposed,
  generateRestAPICode,
  generateRestAPICodeExposed,
  generateCollectionShareLink,
};
