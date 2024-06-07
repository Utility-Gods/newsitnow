import { fetch_form_by_id } from "@lib/service/form";
import { save_form_response } from "@lib/service/form_response";
import { show_error_toast } from "@lib/utils";
import { Dialog, DialogContent, DialogHeader } from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";

import { useParams } from "@solidjs/router";
import { Show, For } from "solid-js";
import { createEffect, createResource } from "solid-js";
import { Component } from "solid-js";
import { showToast } from "~/components/ui/toast";
import FormActionField from "~/core/form-builder/components/FormActionField";
import FormField from "~/core/form-builder/components/FormField";
import { FormBuilder } from "~/core/form-builder/core/FormBuilder";
import { createSignal } from "solid-js";
import { Button } from "~/components/ui/button";
import PageSpinner from "~/components/bare/common/PageSpinner";

const ActionForm: Component = (props) => {
  const params = useParams();
  const org_id = () => params.org_id;

  const fetch_form_args = () => {
    return {
      id: Number(params.id),
      org_id: org_id(),
    };
  };

  const form_id = () => params.id;

  const [form, { refetch }] = createResource(fetch_form_args, fetch_form_by_id);

  const form_details = () => form()?.value;
  const theme = () => form_details()?.theme;
  const template = () => form_details()?.template;

  const formBuilder = () => new FormBuilder(template());
  const formDigested = () => formBuilder().output();

  const [showIdModal, setShowIdModal] = createSignal(false);

  const [userName, setUserName] = createSignal("");
  createEffect(() => {
    console.log(form_id(), "-------");
  });

  const [loading, setLoading] = createSignal(false);

  async function handleFormSubmit() {
    const form = document.getElementById("form");
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    console.log(data);

    try {
      setLoading(true);
      console.log("submitting form", loading());
      const result = await save_form_response({
        form: form_id(),
        response: data,
        creator: userName(),
      });

      if (result.isOk()) {
        console.log("formpublished");
        showToast({
          title: "Response submitted",
          description: "Thanks for submitting the form",
          variant: "success",
          duration: 5000,
        });
        refetch();
        setShowIdModal(false);
      }

      if (result.isErr()) {
        console.log("error publishing Form");
        throw result.error;
      }
    } catch (e) {
      show_error_toast(e);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <Show when={!form_details() && form()}>
        <div class="text-muted-foreground">No form found</div>
      </Show>

      <Show when={!form()}>
        <PageSpinner />
      </Show>
      <Show when={form_details()}>
        <div class="w-full sm:w-1/2 p-3 space-y-3">
          <div class="font-semibold text-xl text-muted-foreground">
            {form_details().name}
          </div>
          <div>
            <form
              id="form"
              class={theme().form}
              onSubmit={(e) => {
                e.preventDefault();
                setShowIdModal(true);
              }}
            >
              <For each={formDigested()?.entities ?? []}>
                {(field) => (
                  <Show when={field}>
                    <FormField field={field} theme={theme} />
                  </Show>
                )}

                {/* {(field) => (
                <div class="p-3">
                  <div class="text-lg font-semibold text-primary">
                    {field.label.text}
                  </div>
                  <div innerHTML={field.field.render()}></div>
                </div>
              )} */}
              </For>
              <FormActionField field={formDigested()?.action} theme={theme} />
            </form>
          </div>
        </div>
      </Show>
      <Dialog
        open={showIdModal()}
        onOpenChange={() => {
          setShowIdModal(false);
        }}
      >
        <DialogContent class="w-[600px]">
          <DialogHeader class="space-y-1.5 overflow-hidden gap-2">
            <h2 class="text-lg font-semibold px-2">Enter your email...</h2>
            <div class="px-2 text-muted-foreground">
              Your email will be used to send you a copy of your response
            </div>
            <div class="flex flex-col col-span-3 p-2">
              <Input
                id="name"
                area-invalid={"false"}
                value={userName()}
                onChange={(e) => {
                  setUserName(e.currentTarget.value);
                }}
                required
              />
            </div>
            <div class="flex gap-3 justify-end p-2">
              <Button
                onClick={() => {
                  setShowIdModal(false);
                }}
                variant="outline"
              >
                Cancel
              </Button>
              <Button onClick={() => handleFormSubmit()}>Submit</Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Show when={loading()}>
        <PageSpinner />
      </Show>
    </>
  );
};

export default ActionForm;
