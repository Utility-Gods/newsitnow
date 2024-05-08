import { Component, createEffect, createSignal, Show } from "solid-js";
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
import { Label } from "~/components/ui/label";
import {
  UpdateArticleForm,
  UpdateArticleSchema,
} from "@lib/schema/forms/update_article";
import { update_article } from "@lib/service/article";

import Quill from "quill";
import { SolidQuill } from "solid-quill";
import { useNavigate } from "@solidjs/router";
import ImageUpload from "../common/ImageUpload";

type ArticleUpdateProps = {
  article: any;
};
const ArticleUpdate: Component = (props: ArticleUpdateProps) => {
  const { article } = props;
  const navigate = useNavigate();
  const [articleForm, { Form, Field }] = createForm<UpdateArticleForm>({
    validate: valiForm(UpdateArticleSchema),
  });

  createEffect(() => {
    console.log({ formValues, article });
  });

  const formValues = {
    name: article.name,
    photo: article.photo,
    text: article.text,
  };

  const [loading, setLoading] = createSignal(false);

  createEffect(() => {
    console.log({ articleForm });
  });

  const handleSubmit: SubmitHandler<UpdateArticleForm> = async (
    values,
    event,
  ) => {
    console.log("submitting", values);
    setLoading(true);

    event.preventDefault();
    try {
      const result = await update_article({
        ...values,
        photo: formValues.photo,
        status: "Draft",
        id: article.id,
      });
      console.log({ result });

      if (result.isErr()) {
        throw result.error;
      }
      showToast({
        variant: "success",
        title: "Article updated",
        description: "The article has been updated successfully",
      });
      navigate("/app/article");
    } catch (e) {
      console.log(e);
      showToast({
        variant: "error",
        title: "Failed to update article",
        description: "An error occurred while updating the article",
      });
    } finally {
      setLoading(false);
    }
  };

  let quill: Quill;

  return (
    <>
      <div class="flex justify-between items-center p-3 ">
        <div class="text-2xl font-bold text-primary leading-10">
          Update article
        </div>
      </div>
      <div class="flex gap-4 flex-col p-3 overflow-auto h-full">
        <Form onSubmit={handleSubmit} class="flex flex-col">
          <div class="items-center gap-4">
            <div class="flex flex-col gap-1 flex-1">
              <ImageUpload
                value={formValues.photo[0].url ?? ""}
                onUpload={(url) => {
                  formValues.photo = url;
                }}
              />
            </div>
          </div>
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
                    value={formValues.name}
                  />
                  {field.error && (
                    <span class="text-secondary text-sm">{field.error}</span>
                  )}
                </div>
              )}
            </Field>
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
                    innerHTML={formValues.text}
                  />

                  {field.error && (
                    <span class="text-secondary text-sm">{field.error}</span>
                  )}
                </div>
              )}
            </Field>
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

      <Show when={loading()}>
        <PageSpinner />
      </Show>
    </>
  );
};

export default ArticleUpdate;
