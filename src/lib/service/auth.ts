import { strapi } from "@lib/strapi";
import { err, ok } from "neverthrow";
import { Effect } from "effect";

const user_register = async (
  email: string,
  password: string,
  confirmPassword: string,
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
    // use fetch to call /api/auth/local
    const localAuthEffect = () =>
      Effect.tryPromise({
        try: () =>
          fetch("http://localhost:1337/api/auth/local", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            credentials: "include",
            body: JSON.stringify({
              identifier: email,
              password,
            }),
          }),
        catch: (unknown) => new Error(`something went wrong ${unknown}`), // remap the error
      });

    const res = Effect.runPromise(localAuthEffect());
    const user = await res.then((res) => res.json());

    console.log({ user });
    if (user) {
      localStorage.setItem("token", user.jwt);
      localStorage.setItem("user", JSON.stringify(user.user));
      return ok(user);
    }

    if (user.error) {
      return err(user.error.message);
    }
  } catch (e) {
    console.log(e);
    return err("An error occurred");
  }
};

const get_refresh_token = async () => {
  try {
    const data = {
      refreshToken: localStorage.getItem("token"),
    };

    const getRefreshToken = () =>
      Effect.tryPromise({
        try: () =>
          fetch("http://localhost:1337/api/token/refresh", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: "include",
          }),
        catch: (unknown) => new Error(`something went wrong ${unknown}`),
      });

    const res = Effect.runPromise(getRefreshToken());
    console.log(res);
    const token = await res.then((res) => res.json());
    console.log(token);
    localStorage.setItem("token", token.jwt);
  } catch (err) {
    console.log(err);
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
export {
  user_register,
  user_login,
  send_verification_email,
  verify_email,
  get_refresh_token,
};
