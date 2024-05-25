import * as v from "valibot";

export const InviteToOrgSchema = v.object({
  email: v.string([v.email("Invalid email address")]),
});

export type InviteToOrgForm = v.Input<typeof InviteToOrgSchema>;
