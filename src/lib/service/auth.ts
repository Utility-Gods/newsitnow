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
    strapi.removeToken();
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


const send_verification_email = async (email: string, token: string) => {
  try {
    const result = await strapi.sendEmailConfirmation({ email });
    return ok(result);
  } catch (e) {
    console.log(e);
    return err(e?.error?.message ?? e?.error ?? e ?? "An error occurred");
  }
};

const verify_email = async (token: string) => {
  try {
    const result = await strapi.authenticateProvider("provider", token);
    return ok(result);
  } catch (e) {
    console.log(e);
    return err(e?.error?.message ?? e?.error ?? e ?? "An error occurred");
  }
};
export { user_register, user_login, send_verification_email, verify_email };
