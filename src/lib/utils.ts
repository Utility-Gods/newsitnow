import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { jwtDecode } from "jwt-decode";
import { User } from "./types/User";
import { Organization } from "./types/Organization";
import { showToast } from "~/components/ui/toast";

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

export function get_user(): User | null {
  const user = localStorage.getItem("user");
  if (!user) {
    return null;
  }
  try {
    const parsed_user = JSON.parse(user) as { user: User };
    return parsed_user.user;
  } catch (e) {
    return null;
  }
}

export function get_user_id(): number | null {
  const user = get_user();

  if (!user) {
    return null;
  }
  return user.id;
}

export function get_user_email(): string | number {
  const user = get_user();

  if (!user) {
    return null;
  }
  return user.email;
}

export function is_logged_in(): boolean {
  const user = get_user();

  if (!user) {
    return false;
  }
  return true;
}

export function get_user_name(): string | null {
  const user = get_user();

  if (!user) {
    return null;
  }
  return user.username;
}

export function get_first_org_id(): number | null {
  const user = get_user();
  if (!user || !user.organizations || user.organizations.length === 0) {
    return null;
  }
  return user.organizations.sort(
    (a, b) =>
      new Date(a.created_on).getMilliseconds() -
      new Date(b.created_on).getMilliseconds(),
  )[0].id;
}

export function get_first_org(): Organization | null {
  const user = get_user();
  if (!user || !user.organizations || user.organizations.length === 0) {
    return null;
  }
  return user.organizations.sort(
    (a, b) =>
      new Date(a.created_on).getMilliseconds() -
      new Date(b.created_on).getMilliseconds(),
  )[0];
}

export function get_user_orgs(): Organization[] | [] {
  const user = get_user();
  if (!user) {
    return [];
  }
  return user.organizations;
}

export function get_org_plan(org_id: number): number | null {
  const user = get_user();

  if (!user) {
    return null;
  }
  const org = user.organizations.find((o) => o.id == org_id);

  if (!org) {
    return null;
  }

  const plan = org.plan;

  if (!plan) {
    return null;
  }

  return plan.id;
}

export function get_org_by_id(org_id: number | null): Organization | null {
  if (!org_id) {
    return null;
  }

  const user = get_user();

  if (!user) {
    return null;
  }

  const org = user.organizations.find((o) => o.id == org_id);

  if (!org) {
    return null;
  }
  return org;
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

  if (!jwtPayload.exp) {
    return false;
  }

  if (jwtPayload.exp * 1000 < currentDate.getTime()) {
    return false;
  }
  return true;
}

export function check_if_mobile() {
  return window.innerWidth < 768;
}

type TError = {
  status: number;
  name: string;
  message: string;
  details: {
    message: string;
  };
};

export function show_error_toast(error: TError) {
  showToast({
    title: error.name + " " + (error.message || "Unknown error"),
    description: error.details.message || "An error occurred",
    variant: "error",
    duration: 5000,
  });
}
