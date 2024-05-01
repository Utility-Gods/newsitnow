import { get_token } from "@lib/utils";
import { err, ok } from "neverthrow";

// Assuming you are using this format for your environment variable
const API_URL = import.meta.env.VITE_STRAPI_URL as string;

const upload_image = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("files", file);

    const token = get_token();
    const reqHeaders = new Headers();
    reqHeaders.append("Authorization", `Bearer ${token}`);
    console.log({ reqHeaders });

    const res = await fetch(`${API_URL}/api/upload`, {
      method: "POST",
      body: formData,
      headers: reqHeaders,
    });
    if (!res.ok) {
      const error = await res.json();
      console.log(error);
      return err("An error occurred");
    }
    const data = await res.json();

    console.log("uploading image", data);
    return ok(data);
  } catch (e) {
    console.log(e);
    console.log("An error occurred", e);
  }
  return err("No data");
};

export { upload_image };
