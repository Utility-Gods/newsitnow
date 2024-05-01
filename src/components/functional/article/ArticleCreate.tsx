import {
  Component,
  createEffect,
  createSignal,
  mergeProps,
  Show,
} from "solid-js";
import {
  createForm,
  setValue,
  SubmitHandler,
  valiForm,
} from "@modular-forms/solid";
import { showToast } from "~/components/ui/toast";
import { Button } from "~/components/ui/button";

import PageSpinner from "~/components/bare/PageSpinner";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  CreateArticleForm,
  CreateArticleSchema,
} from "@lib/schema/forms/create_article";
import { save_article } from "@lib/service/article";

import Quill from "quill";
import { SolidQuill } from "solid-quill";
import { upload_image } from "@lib/service/common";

type CreateArticleModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
};
export const CreateArticleModal: Component<CreateArticleModalProps> = (
  props,
) => {
  const merged = mergeProps({ open: false, onOpenChange: () => {} }, props);

  const [articleForm, { Form, Field }] = createForm<CreateArticleForm>({
    validate: valiForm(CreateArticleSchema),
  });

  createEffect(() => {
    console.log({ formValues });
  });

  const formValues = {
    name: "",
    photo: [],
    text: {},
  };

  const [loading, setLoading] = createSignal(false);

  createEffect(() => {
    console.log({ articleForm });
  });

  const uploadImage = async (file: File) => {
    console.log({ file });
    setLoading(true);
    const res = await upload_image(file);
    setLoading(false);
    if (res.isErr()) {
      console.log(res.error);
      showToast({
        variant: "error",
        duration: 5000,
        title: "Failed to upload image",
        description: "An error occurred while uploading the image",
      });
    }

    if (res.isOk()) {
      console.log(res.value);
      showToast({
        variant: "success",
        duration: 5000,
        title: "Image uploaded",
        description: "The image has been uploaded successfully",
      });
      formValues.photo = res.value;
      console.log({ formValues });
    }
  };

  const handleSubmit: SubmitHandler<CreateArticleForm> = async (
    values,
    event,
  ) => {
    console.log("submitting", values);
    setLoading(true);

    event.preventDefault();
    try {
      const result = await save_article({
        ...values,
        photo: formValues.photo,
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
      merged.onClose();
      merged.onOpenChange(false);
    } catch (e) {
      console.log(e);
      showToast({
        variant: "error",
        title: "Failed to create article",
        description: "An error occurred while creating the article",
      });
    } finally {
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
                <Label for="photo" class="text-right">
                  Image
                </Label>

                <div class="flex flex-col gap-1">
                  <Input
                    onChange={async (e) => {
                      const file = e.target.files[0];
                      if (!file) return;
                      uploadImage(file);
                    }}
                    accept="image/png, image/jpeg"
                    id="image"
                    type="file"
                  >
                    Upload Image
                  </Input>
                </div>
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
