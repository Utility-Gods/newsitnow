import { err, ok } from "neverthrow";
import { Effect } from "effect";
import { reset } from "effect/MutableList";

// Assuming you are using this format for your environment variable
const API_URL = import.meta.env.VITE_STRAPI_URL as string;

const user_register = async (
  email: string,
  password: string,
  confirmPassword: string,
) => {
  try {
    if (password !== confirmPassword) {
      return err("Passwords do not match");
    }

    const res = await fetch(`${API_URL}/api/auth/local/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        username: email,
      }),
    });
    if (!res.ok) {
      console.log("not ok");
      const error = await res.json();
      return err(error.error.message);
    }
    const user = await res.json();

    console.log({ user });
    return ok(user);
  } catch (e) {
    console.log(e);
    return err(error.error.message);
  }
};

const user_login = async (email: string, password: string) => {
  try {
    const res = await fetch(`${API_URL}/api/auth/local`, {
      // Updated here
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier: email,
        password,
      }),
    });

    if (!res.ok) {
      console.log("not ok");
      const error = await res.json();
      console.log(error.error);
      return err(error.error);
    }
    const user = await res.json();

    if (user) {
      localStorage.setItem("token", user.jwt);
      localStorage.setItem("user", JSON.stringify(user.user));
      return ok(user);
    }

    if (user.error) {
      return err(user.error);
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
    localStorage.setItem("token", token.jwt);
  } catch (err) {
    console.log(err);
  }
};

export { user_register, user_login, get_refresh_token };
