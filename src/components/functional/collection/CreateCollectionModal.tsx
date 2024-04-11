import { Component, createSignal, mergeProps, Show } from "solid-js";
import { createForm, SubmitHandler, valiForm } from "@modular-forms/solid";
import { showToast } from "~/components/ui/toast";

import PageSpinner from "~/components/bare/PageSpinner";
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
import { save_collection } from "@lib/service/collection";
import { ok, err } from "neverthrow";

type CreateCollectionModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};
export const CreateCollectionModal: Component<CreateCollectionModalProps> = (
  props
) => {
  const merged = mergeProps({ open: false, onOpenChange: () => {} }, props);

  const [, { Form, Field, FieldArray }] = createForm<CreateCollectionForm>({
    validate: valiForm(CreateCollectionSchema),
  });

  const formValues = {
    name: "",
    description: "",
  };

  const [loading, setLoading] = createSignal(false);

  console.log(Form);

  const handleSubmit: SubmitHandler<CreateCollectionForm> = async (
    values,
    event
  ) => {
    setLoading(true);

    console.log({ loading: loading() });
    event.preventDefault();
    try {
      console.log(values);
      formValues.name = values.name;
      formValues.description = values.description;
      const result = await save_collection(formValues);

      console.log(result);
      if (result?.isOk()) {
        console.log({ result });
        showToast({
          variant: "success",
          title: "Collection created",
          description: "Collection has been created successfully",
        });
      }

      if (result?.isErr()) {
        showToast({
          title: "Some error occured",
          description: "Could not create collection, please try again later",
          variant: "error",
        });
      }
    } catch (e) {
      console.log("------------", e);
      console.log(e);
      showToast({
        variant: "error",
        title: "Failed to create collection",
        description: "An error occurred while creating the collection",
      });
    } finally {
      merged.onOpenChange(false);
      setLoading(false);
    }
  };

  return (
    <>
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
