import { err, ok } from "neverthrow";
import { Effect } from "effect";

// Assuming you are using this format for your environment variable

console.log({ API_URL });
const user_register = async (
  email: string,
  password: string,
  confirmPassword: string,
) => {
  try {
    if (password !== confirmPassword) {
      return err("Passwords do not match");
    }

    const localAuthRegisterEffect = () =>
      Effect.tryPromise({
        try: () =>
          fetch(`${API_URL}/api/auth/local/register`, {
            // Updated here
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              email,
              password,
              username: email,
            }),
          }),
        catch: (unknown) => new Error(`something went wrong ${unknown}`),
      });

    const res = Effect.runPromise(localAuthRegisterEffect());
    const user = await res.then((res) => res.json());

    console.log({ user });
    return ok(user);
  } catch (e) {
    console.log(e);
    return err(e?.error?.message ?? e?.error ?? e ?? "An error occurred");
  }
};

const user_login = async (email: string, password: string) => {
  try {
    const API_URL = import.meta.env.VITE_STRAPI_URL as string;
    console.log({ API_URL });
    const localAuthEffect = () =>
      Effect.tryPromise({
        try: () =>
          fetch(`${API_URL}/api/auth/local`, {
            // Updated here
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              identifier: email,
              password,
            }),
          }),
        catch: (unknown) => new Error(`something went wrong ${unknown}`),
      });

    const res = Effect.runPromise(localAuthEffect());
    const user = await res.then((res) => res.json());

    console.log({ user });
    if (user) {
      sessionStorage.setItem("token", user.jwt);
      sessionStorage.setItem("user", JSON.stringify(user.user));
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
      refreshToken: sessionStorage.getItem("token"),
    };

    const getRefreshToken = () =>
      Effect.tryPromise({
        try: () =>
          fetch(`${API_URL}/api/token/refresh`, {
            // Updated here
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
    sessionStorage.setItem("token", token.jwt);
  } catch (err) {
    console.log(err);
  }
};

export { user_register, user_login, get_refresh_token };
