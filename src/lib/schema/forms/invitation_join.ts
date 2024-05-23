import * as v from "valibot";

export const InvitationJoinSchema = v.object(
  {
    email: v.string([
      v.minLength(1, "Please enter your email."),
      v.email("The email address is badly formatted."),
    ]),
    password: v.string([
      v.minLength(1, "Please enter your password."),
      v.minLength(8, "You password must have 8 characters or more."),
    ]),
    confirmPassword: v.string([
      v.minLength(1, "Please repeat the password once."),
    ]),
  },
  [
    v.custom(
      ({ password, confirmPassword }) => password === confirmPassword,
      "The passwords do not match.",
    ),
  ],
);
export type InvitationJoinForm = v.Input<typeof InvitationJoinSchema>;
