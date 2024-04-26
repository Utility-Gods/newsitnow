import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { jwtDecode } from "jwt-decode";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function get_token() {
  const token = sessionStorage.getItem("token");
  if (!token) {
    return null;
  }
  return token;
}

export function get_user() {
  const user = sessionStorage.getItem("user");
  if (!user) {
    return null;
  }
  return JSON.parse(user);
}

export function check_token_validity() {
  const token = sessionStorage.getItem("token");

  console.log({ token });
  if (!token) {
    return false;
  }
  const jwtPayload = jwtDecode(token);
  let currentDate = new Date();

  console.log({ jwtPayload });
  if (jwtPayload.exp * 1000 < currentDate.getTime()) {
    return false;
  }
  return true;
}
