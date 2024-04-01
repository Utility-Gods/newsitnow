const fetch_articles = async () => {
  const requestOptions: RequestInit = {
    method: "GET",
    redirect: "follow",
  };

  const articles = await fetch(
    "https://directus.newsitnowcms.orb.local/items/Articles",
    requestOptions
  )
    .then((response) => response.json())
    .catch((error) => console.log("error", error));

  console.log({ articles });
  return articles;
};

const save_collection = async (data: any) => {
  console.log({ data });
  const requestOptions: RequestInit = {
    method: "POST",
    body: JSON.stringify(data),
    redirect: "follow",
  };

  const collection = await fetch(
    "https://directus.newsitnowcms.orb.local/items/Collections",
    requestOptions
  )
    .then((response) => response.json())
    .catch((error) => console.log("error", error));

  console.log({ collection });
  return collection;
};

export { fetch_articles, save_collection };


