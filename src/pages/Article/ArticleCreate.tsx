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
import BreadCrumb from "~/components/bare/BreadCrumb";
import { useNavigate } from "@solidjs/router";

const ArticleCreate: Component = (props) => {
  const merged = mergeProps({ open: false, onOpenChange: () => {} }, props);

  const navigate = useNavigate();
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
    <div class="flex flex-col flex-1 flex-grow overflow-hidden p-3 ">
      <BreadCrumb
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/article", label: "Article" },
        ]}
      />
      <div class="flex justify-between items-center p-3 ">
        <div class="text-2xl font-bold text-primary leading-10">
          Create articles
        </div>
      </div>
      <div class="flex gap-4 flex-col p-3 overflow-auto h-full">
        <Form onSubmit={handleSubmit} class="flex flex-col">
          <div class="items-center gap-4">
            <Label for="name" class="text-right">
              Title
            </Label>
            <Field name="name">
              {(field, props) => (
                <div class="flex flex-col gap-1 h-full">
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
          <div class="items-center gap-4">
            <Label for="photo" class="text-right">
              Image
            </Label>

            <div class="flex flex-col gap-1 flex-1">
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
          <div class="items-center gap-4 flex-1">
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
                    <span class="text-secondary text-sm">{field.error}</span>
                  )}
                </div>
              )}
            </Field>
          </div>
        </Form>
        <div class="flex gap-3 items-center justify-end">
          <Button
            variant="ghost"
            type="button"
            onClick={() => {
              navigate("/article");
            }}
          >
            Cancel
          </Button>
          <Button type="submit" size={"lg"} variant="secondary">
            Save changes
          </Button>
        </div>
      </div>

      <Show when={loading()}>
        <PageSpinner />
      </Show>
    </div>
  );
};

export default ArticleCreate;
