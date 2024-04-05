import { err, ok } from "neverthrow";

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
          throw new Error("Failed to save collection");
        }
        return ok(response.json());
      })
      .catch((error) => {
        console.log(error);
        return err("some error occured");
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

const fetch_collection_by_id = async (id: string) => {
  const requestOptions: RequestInit = {
    method: "GET",
    redirect: "follow",
  };

  console.log("fetching collection by id", id);

  const collection = await fetch(
    import.meta.env.VITE_DIRECTUS_PROJECT_URL + "items/Collections/" + id,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      return result.data;
    })
    .catch((error) => console.log("error", error));

  return collection;
};

export { fetch_collections, save_collection, fetch_collection_by_id };
