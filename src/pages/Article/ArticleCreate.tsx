import { Component, createEffect, createSignal, onMount, Show } from "solid-js";
import {
  createForm,
  setValue,
  SubmitHandler,
  valiForm,
} from "@modular-forms/solid";
import { showToast } from "~/components/ui/toast";
import { Button } from "~/components/ui/button";

import PageSpinner from "~/components/bare/common/PageSkeleton";

import { Input } from "~/components/ui/input";

import {
  CreateArticleForm,
  CreateArticleSchema,
} from "@lib/schema/forms/create_article";
import { save_article } from "@lib/service/article";

import Quill from "quill";
import { SolidQuill } from "solid-quill";
import { upload_image } from "@lib/service/common";
import BreadCrumb from "~/components/bare/common/BreadCrumb";
import { useNavigate } from "@solidjs/router";
import ImageUpload from "~/components/functional/common/ImageUpload";

const ArticleCreate: Component = (props) => {
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
        throw result.error.error;
      }
      showToast({
        variant: "success",
        title: "Article created",
        description: "The article has been created successfully",
      });
      navigate("/app/article");
    } catch (e) {
      console.log(e);
      showToast({
        variant: "error",
        title: e.message ?? "Failed to create article",
        description:
          e.details.message ?? "An error occurred while creating the article",
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
          { href: "/app", label: "Home" },
          { href: "/app/article", label: "Article" },
        ]}
      />
      <div class="flex justify-between items-center p-3 ">
        <div class="text-2xl font-bold text-primary leading-10">
          Create articles
        </div>
      </div>

      <Show when={!loading()} children fallback={<PageSpinner />}>
        <div class="flex gap-4 flex-col p-3 overflow-auto">
          <Form onSubmit={handleSubmit} class="flex flex-col">
            <div class="flex-1 overflow-scroll gap-2 flex flex-col no-scrollbar">
              <div class="">
                <ImageUpload
                  onUpload={(url) => {
                    formValues.photo = url;
                  }}
                />
              </div>
              <div class="items-center gap-4">
                {/* <Label for="name" class="text-right">
                Title
              </Label> */}
                <Field name="name">
                  {(field, props) => (
                    <div class="flex flex-col gap-1 h-full">
                      <Input
                        placeholder="Title"
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

              <div class="items-center gap-4 flex-1">
                {/* <Label for="text" class="text-right">
                Content
              </Label> */}

                <Field name="text">
                  {(field, props) => (
                    <div class="flex flex-col">
                      <SolidQuill
                        id="text"
                        onReady={(quill) => {
                          quill.clipboard.addMatcher(
                            Node.ELEMENT_NODE,
                            (node, delta) => {
                              if (node.style && node.style.fontSize) {
                                const size = node.style.fontSize;
                                delta.ops = delta.ops.map((op) => {
                                  if (
                                    op.insert &&
                                    typeof op.insert === "string"
                                  ) {
                                    op.attributes = op.attributes || {};
                                    op.attributes.size = size;
                                  }
                                  // Adjusts the background and text color for the Quill editor's content
                                  op.attributes.background = "none";
                                  op.attributes.color = "#000000";
                                  op.attributes.fontSize = node.style.fontSize;
                                  console.log({ op });
                                  return op;
                                });
                              }
                              return delta;
                            },
                          );
                        }}
                        modules={{
                          toolbar: [
                            [{ header: "1" }, { header: "2" }],
                            ["bold", "italic", "underline", "strike"],
                            [{ list: "ordered" }, { list: "bullet" }],
                            ["link", "image"],
                            ["clean"],
                          ],
                        }}
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

            <div class="flex gap-3 items-center justify-end mt-3">
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
          </Form>
        </div>
      </Show>
    </div>
  );
};

export default ArticleCreate;
