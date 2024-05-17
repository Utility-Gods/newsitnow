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
import { Textarea } from "~/components/ui/textarea";
import {
  CreateOrganizationForm,
  CreateOrganizationSchema,
} from "@lib/schema/forms/create_organization";
import { save_organization } from "@lib/service/organization";

type CreateOrganizationModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  refetch: () => void;
};
export const CreateOrganizationModal: Component<
  CreateOrganizationModalProps
> = (props) => {
  const merged = mergeProps({ open: false, onOpenChange: () => {} }, props);

  const [, { Form, Field, FieldArray }] = createForm<CreateOrganizationForm>({
    validate: valiForm(CreateOrganizationSchema),
  });

  const formValues = {
    name: "",
    description: "",
  };

  const [loading, setLoading] = createSignal(false);

  const handleSubmit: SubmitHandler<CreateOrganizationForm> = async (
    values,
    event,
  ) => {
    setLoading(true);

    event.preventDefault();
    try {
      const result = await save_organization({
        ...values,
        status: "Draft",
      });

      console.log("submitting", result);

      if (result?.isOk()) {
        showToast({
          variant: "success",
          title: "Organization created",
          description: "Organization has been created successfully",
        });
        merged.refetch();
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
        title: e.message ?? "Failed to create organization",
        description:
          e.details.message ??
          "An error occurred while creating the organization",
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
                Create Organization
              </div>
              <div class="text-sm text-muted-foreground">
                Create a new organization and press save when you're done.
              </div>
            </DialogHeader>
            <div class="grid gap-4 py-4">
              <div class="grid grid-cols-4 items-center gap-4">
                <Label for="name" class="text-right">
                  Name
                </Label>
                <Field name="name">
                  {(field, props) => (
                    <div class="flex flex-col col-span-3 gap-1">
                      <Input
                        {...props}
                        id="name"
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
                <Label for="description" class="text-right">
                  Description
                </Label>
                <Field name="description">
                  {(field, props) => (
                    <div class="flex flex-col col-span-3 gap-1">
                      <Textarea {...props} id="description" rows="3" required />
                      <span class="text-secondary text-sm">{field.error}</span>
                    </div>
                  )}
                </Field>
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
              <Button type="submit">Save changes</Button>
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
