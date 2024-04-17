import {
  Component,
  createEffect,
  createSignal,
  mergeProps,
  onMount,
  Show,
} from "solid-js";
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

import EditorJS, { OutputData } from "@editorjs/editorjs";

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

  const [editorIsReady, setReady] = createSignal(false);

  // temporary random id solution for testing

  let editorData: OutputData;

  const randomHolderId = "myHolder"; //(Math.floor(Math.random() * 100) + 1).toString();

  const createEditor = async () => {
    const instance = new EditorJS({
      autofocus: true,
      holder: randomHolderId,
      data: editorData,
    });

    console.log(instance);
    await instance.isReady;
    setReady(true);
  };

  let isEditorReady = false;

  createEffect(() => {
    // check if the randomHolderId div
    if (document.getElementById(randomHolderId) && !isEditorReady) {
      console.log("element found");
      createEditor();
      isEditorReady = true;
    } else {
      console.log("no element found");
    }
  });

  const handleSubmit: SubmitHandler<CreateArticleForm> = async (
    values,
    event
  ) => {
    console;
    setLoading(true);

    event.preventDefault();
    try {
      formValues.name = values.name;
      formValues.content = values.content;
      const result = await save_article(formValues);
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

  return (
    <>
      <Dialog open={merged.open} onOpenChange={merged.onOpenChange}>
        <DialogContent class="sm:max-w-[550px] w-[80%] md:w-[60%]">
          <Form onSubmit={handleSubmit}>
            <DialogHeader>
              <div class="text-lg font-semibold leading-none tracking-tight text-primary">
                Create Article
              </div>
              <div class="text-sm text-muted-foreground">
                Create a new article and press save when you're done.
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
              <div class="grid grid-cols-4 items-center gap-4">
                <div
                  id={randomHolderId}
                  class="rounded-md border border-slate-100 px-16"
                ></div>
                <Show when={!editorIsReady()}>loading...</Show>
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
