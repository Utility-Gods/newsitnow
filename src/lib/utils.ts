import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { jwtDecode } from "jwt-decode";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function get_token() {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  return token;
}

export function get_user() {
  const user = localStorage.getItem("user");
  if (!user) {
    return null;
  }
  return JSON.parse(user);
}

export function get_user_id() {
  const user = get_user();

  console.log({ user });
  if (!user.user) {
    return null;
  }
  return user.user.id;
}

export function check_token_validity() {
  const token = localStorage.getItem("token");

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

export function check_if_mobile() {
  return window.innerWidth < 768;
}
