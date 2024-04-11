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
  CreateArticleForm,
  CreateArticleSchema,
} from "@lib/schema/forms/create_article";
import { save_article } from "@lib/service/article";

type CreateArticleModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};
export const CreateArticleModal: Component<CreateArticleModalProps> = (
  props
) => {
  const merged = mergeProps({ open: false, onOpenChange: () => {} }, props);

  const [, { Form, Field, FieldArray }] = createForm<CreateArticleForm>({
    validate: valiForm(CreateArticleSchema),
  });

  const formValues = {
    name: "",
    content: "",
  };

  const [loading, setLoading] = createSignal(false);

  const handleSubmit: SubmitHandler<CreateArticleForm> = async (
    values,
    event
  ) => {
    setLoading(true);

    event.preventDefault();
    try {
      console.log(values);
      formValues.name = values.name;
      formValues.content = values.content;
      const result = await save_article(formValues);

      if (result.isErr()) {
        throw result.error;
      }
      showToast({
        variant: "success",
        title: "Article created",
        description: "The article has been created successfully",
      });
      console.log(result);
    } catch (e) {
      console.log("------------", e);
      console.log(e);
      showToast({
        variant: "error",
        title: "Failed to create article",
        description: "An error occurred while creating the article",
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
              <DialogTitle>Create Article</DialogTitle>
              <DialogDescription>
                Create a new article and press save when you're done.
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
                <Label for="content" class="text-right">
                  Description
                </Label>
                <Field name="content">
                  {(field, props) => (
                    <div class="flex flex-col col-span-3 gap-1">
                      <Textarea {...props} id="content" rows="3" required />
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
