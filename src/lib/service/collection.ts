const save_collection = async (data: any) => {
  try {
    const requestOptions: RequestInit = {
      method: "POST",
      body: JSON.stringify(data),
    };
    console.log("coming here", data, requestOptions);

    return await fetch(
      import.meta.env.VITE_DIRECTUS_PROJECT_URL + "items/Collections",
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

const fetch_collections = async () => {
  const requestOptions: RequestInit = {
    method: "GET",
    redirect: "follow",
  };

  const collections = await fetch(
    import.meta.env.VITE_DIRECTUS_PROJECT_URL + "items/Collections",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      return result.data;
    })
    .catch((error) => console.log("error", error));

  return collections;
};

export { fetch_collections, save_collection };
