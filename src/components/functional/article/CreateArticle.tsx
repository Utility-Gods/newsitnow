import {
  Component,
  createEffect,
  createSignal,
  mergeProps,
  onMount,
  Show,
} from "solid-js";
import {
  createForm,
  setValue,
  SubmitHandler,
  valiForm,
} from "@modular-forms/solid";
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

import Quill from "quill";
import { SolidQuill } from "solid-quill";

type CreateArticleModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};
export const CreateArticleModal: Component<CreateArticleModalProps> = (props) => {
  const merged = mergeProps({ open: false, onOpenChange: () => {} }, props);

  const [articleForm, { Form, Field, FieldArray }] =
    createForm<CreateArticleForm>({
      validate: valiForm(CreateArticleSchema),
    });

  createEffect(() => {
    console.log({ formValues });
  });

  const formValues = {
    name: "",
    content: "",
    text: {},
  };

  const [loading, setLoading] = createSignal(false);

  const [editorIsReady, setReady] = createSignal(false);

  const handleSubmit: SubmitHandler<CreateArticleForm> = async (
    values,
    event
  ) => {
    console.log("submitting", values);
    setLoading(true);

    event.preventDefault();
    try {
    
      const result = await save_article({
        ...values,
        status: "Draft",
      });
      console.log({ result });

      if (result.isErr()) {
        throw result.error;
      }
      showToast({
        variant: "success",
        title: "Article created",
        description: "The article has been created successfully",
      });
    } catch (e) {
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

  let quill: Quill;

  return (
    <>
      <Dialog open={merged.open} onOpenChange={merged.onOpenChange}>
        <DialogContent class="sm:max-w-[60%] w-[80%] h-[60vw]">
          <Form onSubmit={handleSubmit} class="flex flex-col">
            <DialogHeader>
              <div class="text-lg font-semibold leading-none tracking-tight text-primary">
                Create Article
              </div>
              <div class="text-sm text-muted-foreground">
                Create a new article and press save when you're done.
              </div>
            </DialogHeader>
            <div class="flex flex-col gap-4 py-4 flex-1">
              <div class="items-center gap-4">
                <Label for="name" class="text-right">
                  Title
                </Label>
                <Field name="name">
                  {(field, props) => (
                    <div class="flex flex-col gap-1">
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
              <div class="items-center gap-4">
                <Label for="text" class="text-right">
                  Content
                </Label>

                <Field name="text">
                  {(field, props) => (
                    <div class="flex flex-col gap-1">
                      <SolidQuill
                        id="text"
                        placeholder="Write something here..."
                        ref={quill}
                        onTextChange={() => {
                          setValue(articleForm, "text", quill.root.innerHTML);
                        }}
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
            </div>
            <DialogFooter>
              <Button
                variant="ghost"
                type="button"
                onClick={() => merged.onOpenChange(false)}
              >
                Close
              </Button>
              <Button type="submit" variant="secondary">
                Save changes
              </Button>
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
