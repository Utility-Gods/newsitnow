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

export { fetch_articles };
