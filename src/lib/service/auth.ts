import { strapi } from "@lib/strapi";
import { err, ok } from "neverthrow";

const register_user = async (
  email: string,
  password: string,
  confirmPassword: string
) => {
  try {
    if (password !== confirmPassword) {
      return err("Passwords do not match");
    }

    const user = await strapi.register({
      email,
      password,
      username: email,
    });
    return ok(user);
  } catch (e) {
    console.log(e);
    return err(e?.error?.message ?? e?.error ?? e ?? "An error occurred");
  }
};

export { register_user };
