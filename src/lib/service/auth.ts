import { strapi } from "@lib/strapi";
import { err, ok } from "neverthrow";

const user_register = async (
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

const user_login = async (email: string, password: string) => {
  try {
    console.log(email, password);
    const user = await strapi.login({
      identifier: email,
      password,
    });
    return ok(user);
  } catch (e) {
    console.log(e);
    return err(e?.error?.message ?? e?.error ?? e ?? "An error occurred");
  }
};

export { user_register, user_login };
