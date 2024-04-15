import type { ClassValue } from "clsx"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function get_token() {
  const user = sessionStorage.getItem("user");
  if (!user) {
    return null;
  }
  const parsed = JSON.parse(user);
  return parsed.jwt;
}