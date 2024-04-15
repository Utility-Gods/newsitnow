import * as v from "valibot";

export const LoginSchema = v.object({
  email: v.string([v.email("Invalid email address")]),
  password: v.string([
    v.minLength(8, "Password must be at least 8 characters long"),
  ]),
});

export type LoginForm = v.Input<typeof LoginSchema>;
