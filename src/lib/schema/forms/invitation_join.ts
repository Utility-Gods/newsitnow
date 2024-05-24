import * as v from "valibot";

export const InvitationJoinSchema = v.object({
  password: v.string([
    v.minLength(1, "Please enter your password."),
    v.minLength(8, "You password must have 8 characters or more."),
  ]),
  confirmPassword: v.string([
    v.minLength(1, "Please repeat the password once."),
  ]),
});
export type InvitationJoinForm = v.Input<typeof InvitationJoinSchema>;
