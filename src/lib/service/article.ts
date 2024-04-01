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

  return articles;
};

const save_collection = async (data: any) => {
  const requestOptions: RequestInit = {
    method: "POST",
    body: JSON.stringify(data),
    redirect: "follow",
  };

  try {
    const results = await fetch(
      "https://directus.newsitnowcms.orb.local/items/collections",
      requestOptions
    )
      .then((response) => {
        console.log(response.status);
        if (response.status !== 200) {
          console.log("returning from here 1");
          throw new Error("Failed to save collection");
        }
        console.log("returning from here 3");
        return response.json();
      })
      .catch((error) => {
        throw new Error(error);
      });
  } catch (e) {
    console.log(e);
  }
};

export { fetch_articles, save_collection };
