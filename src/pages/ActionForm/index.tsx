import { fetch_form_by_id } from "@lib/service/form";

import { useParams } from "@solidjs/router";
import { Show, For } from "solid-js";
import { createEffect, createResource } from "solid-js";
import { Component } from "solid-js";
import FormActionField from "~/core/form-builder/components/FormActionField";
import FormField from "~/core/form-builder/components/FormField";
import { FormBuilder } from "~/core/form-builder/core/FormBuilder";

const ActionForm: Component = (props) => {
  const params = useParams();
  const org_id = () => params.org_id;

  const fetch_form_args = () => {
    return {
      id: Number(params.id),
      org_id: org_id(),
    };
  };

  const form_id = params.form_id;

  const [form, { refetch }] = createResource(fetch_form_args, fetch_form_by_id);

  const form_details = () => form()?.value;

  const theme = () => form_details()?.theme;

  const template = () => form_details()?.template;

  const formBuilder = () => new FormBuilder(template());
  const formDigested = () => formBuilder().output();

  createEffect(() => {
    console.log(form_details(), "-------");
  });
  return (
    <>
      <Show when={!form_details() && form()}>
        <div class="text-muted-foreground">No form found</div>
      </Show>
      <Show when={form_details()}>
        <div class="w-1/2 p-3 space-y-3">
          <div class="font-semibold text-xl text-muted-foreground">
            {form_details().name}
          </div>
          <div>
            <form
              class={theme().form}
              onSubmit={(e) => {
                e.preventDefault();
                console.log("Form submitted");
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
    </>
  );
};

export default ActionForm;
