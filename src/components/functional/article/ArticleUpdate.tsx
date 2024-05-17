import { type Component, createSignal, Show } from "solid-js";
import {
  createForm,
  setValue,
  SubmitHandler,
  valiForm,
} from "@modular-forms/solid";
import { showToast } from "~/components/ui/toast";
import { Button } from "~/components/ui/button";

import PageSpinner from "~/components/bare/common/PageSpinner";

import { Input } from "~/components/ui/input";
import {
  UpdateArticleForm,
  UpdateArticleSchema,
} from "@lib/schema/forms/update_article";
import { update_article } from "@lib/service/article";

import Quill from "quill";
import { SolidQuill } from "~/components/functional/editor/SolidQuill";

import { useNavigate, useParams } from "@solidjs/router";
import ImageUpload from "../common/ImageUpload";

type ArticleUpdateProps = {
  article: Record<string, any>;
};
const ArticleUpdate: Component = (props: ArticleUpdateProps) => {
  const params = useParams();
  const org_id = () => params.org_id;

  const { article } = props;

  const navigate = useNavigate();

  const formValues = {
    name: article.name,
    photo: article.photo ?? [],
    text: article.text,
  };
  const [articleForm, { Form, Field }] = createForm<UpdateArticleForm>({
    validate: valiForm(UpdateArticleSchema),
    initialValues: formValues,
  });

  const [loading, setLoading] = createSignal(false);

  const handleSubmit: SubmitHandler<UpdateArticleForm> = async (
    values,
    event,
  ) => {
    setLoading(true);

    event.preventDefault();
    try {
      const result = await update_article({
        ...values,
        photo: formValues.photo,
        status: "Draft",
        id: article.id,
      });

      if (result.isErr()) {
        throw result.error;
      }
      showToast({
        variant: "success",
        title: "Article updated",
        description: "The article has been updated successfully",
      });
      navigate(`/app/${org_id()}/article`);
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
      <div class="flex gap-4 flex-col p-3 overflow-auto h-[90%]">
        <Form onSubmit={handleSubmit} class="flex flex-col gap-3 h-full">
          <div class="flex-1 overflow-scroll gap-2 flex flex-col no-scrollbar ">
            <div class="items-center gap-4">
              <div class="flex flex-col gap-1 flex-1">
                <ImageUpload
                  value={formValues?.photo[0] ?? {}}
                  onUpload={(url) => {
                    formValues.photo = url;
                  }}
                />
              </div>
            </div>
            <div class="items-center gap-4">
              <Field name="name">
                {(field, props) => (
                  <div class="flex flex-col gap-1 h-full">
                    <Input
                      placeholder="Title"
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
                                console.log({ op });
                                return op;
                              });
                            }
                            return delta;
                          },
                        );
                      }}
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
          </div>
          <div class="flex gap-3 items-center justify-end mt-3">
            <Button
              variant="ghost"
              type="button"
              onClick={() => {
                navigate(`/app/${org_id()}/article`);
              }}
            >
              Cancel
            </Button>
            <Button type="submit" size={"lg"}>
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
