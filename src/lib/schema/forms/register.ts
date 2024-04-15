import * as v from "valibot";

export const RegisterSchema = v.object({
  email: v.string([v.email("Invalid email address")]),
  password: v.string([
    v.minLength(8, "Password must be at least 8 characters long"),
  ]),
  confirmPassword: v.string([
    v.minLength(8, "Password must be at least 8 characters long"),
  ]),
});

export type RegisterForm = v.Input<typeof RegisterSchema>;
