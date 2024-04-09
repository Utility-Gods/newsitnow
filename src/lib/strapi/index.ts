import Strapi from "strapi-sdk-js";

const strapi = new Strapi({
  axiosOptions: {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_STRAPI_API_TOKEN}`,
    },
  },
});

export { strapi };
