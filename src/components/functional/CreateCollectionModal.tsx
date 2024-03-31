import { Component, mergeProps } from "solid-js";
import { createForm, SubmitHandler, valiForm } from "@modular-forms/solid";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import {
  CreateCollectionForm,
  CreateCollectionSchema,
} from "@lib/schema/forms/create_collection";

export const CreateCollectionModal: Component = (props) => {
  const merged = mergeProps({ open: false, onOpenChange: () => {} }, props);

  const [createCollectionForm, { Form, Field, FieldArray }] =
    createForm<CreateCollectionForm>({
      validate: valiForm(CreateCollectionSchema),
    });

  console.log(Form);

  const handleSubmit: SubmitHandler<CreateCollectionForm> = (values, event) => {
    event.preventDefault();
    console.log(values);
  };

  return (
    <Dialog open={merged.open} onOpenChange={merged.onOpenChange}>
      <DialogContent class="sm:max-w-[550px] w-[80%] md:w-[60%]">
        <Form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create Collection</DialogTitle>
            <DialogDescription>
              Create a new collection and press save when you're done.
            </DialogDescription>
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
                      <span class="text-secondary text-sm">{field.error}</span>
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
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
