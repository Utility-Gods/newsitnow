import { Component, For, Show, createEffect, createSignal } from "solid-js";
import FormActionField from "~/core/form-builder/components/FormActionField";
import FormField from "~/core/form-builder/components/FormField";
import { FormBuilder } from "~/core/form-builder/core/FormBuilder";
import contactForm from "~/core/form-builder/templates/contact";
import loginForm from "~/core/form-builder/templates/login";
import newsletterForm from "~/core/form-builder/templates/newsletter";
import themes from "~/core/form-builder/themes";

const FormCreate: Component = () => {
  const templates = [
    {
      name: "Contact Form",
      template: contactForm,
      description: "A simple contact form",
    },
    {
      name: "Login Form",
      template: loginForm,
      description: "A simple login form",
    },
    {
      name: "Newsletter Form",
      template: newsletterForm,
      description: "A simple newsletter form",
    },
  ];

  createEffect(() => {
    console.log("formDigested", formDigested());
  });

  const [activeTemplate, setActiveTemplate] = createSignal(0);

  const [activeTheme, setActiveTheme] = createSignal(0);
  const formBuilder = () =>
    new FormBuilder(templates[activeTemplate()].template);
  const formDigested = () => formBuilder().output();
  return (
    <div class="flex flex-col flex-1 flex-grow overflow-hidden p-3 ">
      <div class="flex justify-between items-center p-3 ">
        <div class="text-2xl font-bold text-primary leading-10">
          Create Form
        </div>
      </div>
      <div class="px-3 font-semibold text-muted-foreground">
        Select a template
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-3">
        {templates.map((template, index) => (
          <div
            class={`bg-white shadow-md rounded-lg p-3 cursor-pointer `}
            onClick={() => {
              console.log(template.template);
              setActiveTemplate(index);
            }}
          >
            <div class="text-lg font-semibold text-primary">
              {templates[activeTemplate()].name}
            </div>
            <div class="text-text">{template.description}</div>
          </div>
        ))}
      </div>
      <div class="px-3 font-semibold text-muted-foreground">Select a theme</div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-3">
        {themes.map((theme, index) => (
          <div
            class={`bg-white shadow-md rounded-lg p-3 cursor-pointer `}
            onClick={() => {
              console.log(theme.name);
              setActiveTheme(index);
            }}
          >
            <div class="text-lg font-semibold text-primary">{theme.name}</div>
          </div>
        ))}
      </div>
      <div class="p-3">
        <div class="text-lg font-semibold">Form Preview</div>
        <form
          onSubmit={(e) => e.preventDefault()}
          class={themes[activeTheme()].form}
        >
          <For each={formDigested()?.entities ?? []}>
            {(field) => (
              <Show when={field}>
                <FormField field={field} theme={themes[activeTheme()]} />
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
          <FormActionField
            field={formDigested()?.action}
            theme={themes[activeTheme()]}
          />
        </form>
      </div>
    </div>
  );
};

export default FormCreate;
