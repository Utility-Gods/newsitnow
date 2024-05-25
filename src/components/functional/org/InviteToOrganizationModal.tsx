import { Component, createSignal, mergeProps, Show } from "solid-js";
import { createForm, SubmitHandler, valiForm } from "@modular-forms/solid";
import { showToast } from "~/components/ui/toast";

import PageSpinner from "~/components/bare/common/PageSpinner";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

import {
  InviteToOrgForm,
  InviteToOrgSchema,
} from "@lib/schema/forms/invite_to_org";
import { invite_user } from "@lib/service/invitation";
import { get_first_org_id, get_user_id } from "@lib/utils";
import { useParams } from "@solidjs/router";
import ChangeOrg from "./ChangeOrg";
import { Organization } from "@lib/types/Organization";
import Email from "@lib/icons/Email";
import Lock from "@lib/icons/Lock";

type InviteToOrganizationModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  refetch: () => void;
};
export const InviteToOrganizationModal: Component<
  InviteToOrganizationModalProps
> = (props) => {
  const merged = mergeProps({ open: false, onOpenChange: () => {} }, props);
  const params = useParams();
  const org_id = () => params.org_id ?? get_first_org_id();

  const [selectedOrg, setSelectedOrg] = createSignal<number>(Number(org_id()));

  const [, { Form, Field }] = createForm<InviteToOrgForm>({
    validate: valiForm(InviteToOrgSchema),
  });

  const [loading, setLoading] = createSignal(false);

  const handleSubmit: SubmitHandler<InviteToOrgForm> = async (
    values,
    event,
  ) => {
    setLoading(true);

    console.log({ values });

    event.preventDefault();
    try {
      const result = await invite_user({
        ...values,
        organization: selectedOrg(),
        invited_by: get_user_id(),
      });

      console.log("submitting", result);

      if (result?.isOk()) {
        showToast({
          variant: "success",
          title: "Invitation created successfully",
          description:
            "An invitation mail is on the way, once accepted the user will be added to the organization.",
        });
        merged.onOpenChange(false);
      }

      if (result?.isErr()) {
        console.log(result.error, "----------");
        throw result.error;
      }
      merged.onOpenChange(false);
    } catch (e) {
      console.log(e);
      showToast({
        variant: "error",
        title: e?.message ?? "Failed to create invitation",
        description:
          e?.details?.message ??
          "An error occurred while creating the invitation",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={merged.open} onOpenChange={merged.onOpenChange}>
        <DialogContent class="sm:max-w-[550px] w-[80%] md:w-[60%]">
          <Form onSubmit={handleSubmit}>
            <DialogHeader>
              <div class="text-lg font-semibold leading-none tracking-tight text-primary">
                Invite User
              </div>
              <div class="text-sm text-muted-foreground">
                Enter the email address of the user you want to invite to the
                organization and press invite.
              </div>
            </DialogHeader>
            <div class="flex flex-row gap-3">
              <ChangeOrg
                onChange={(o: Organization) => {
                  console.log(o);
                  setSelectedOrg(o.id);
                  console.log(selectedOrg());
                }}
              />
            </div>
            <div class="grid gap-4 py-4">
              <div class="grid grid-cols-4 items-center gap-4">
                <Label for="name" class="flex items-center gap-2">
                  <div class="w-6 h-6">
                    <Email />
                  </div>
                  <span>Email</span>
                </Label>
                <Field name="email">
                  {(field, props) => (
                    <div class="flex flex-col col-span-3 gap-1">
                      <Input
                        {...props}
                        id="email"
                        area-invalid={field.error ? "true" : "false"}
                        required
                      />
                      {field.error && (
                        <span class="text-secondary text-sm">
                          {field.error}
                        </span>
                      )}
                    </div>
                  )}
                </Field>
              </div>
              <div class="grid grid-cols-4 items-center gap-4">
                <Label for="name" class="flex items-center gap-2">
                  <div class="w-6 h-6">
                    <Lock />
                  </div>
                  <span>Role</span>
                </Label>

                <div class="flex flex-col col-span-3 gap-1">
                  <Input id="email" required disabled value="Collaborator" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="ghost"
                type="button"
                onClick={() => merged.onOpenChange(false)}
              >
                Close
              </Button>
              <Button type="submit">Invite</Button>
            </DialogFooter>
          </Form>
        </DialogContent>
      </Dialog>
      <Show when={loading()}>
        <PageSpinner />
      </Show>
    </>
  );
};
