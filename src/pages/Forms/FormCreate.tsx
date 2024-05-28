import { Component, For, createEffect, createSignal } from "solid-js";
import { FormBuilder } from "~/core/form-builder/components/FormBuilder";
import contactForm from "~/core/form-builder/templates/contact";
import loginForm from "~/core/form-builder/templates/login";
import newsletterForm from "~/core/form-builder/templates/newsletter";

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

  const [activeTemplate, setActiveTemplate] = createSignal(
    templates[0].template,
  );

  const formBuilder = () => new FormBuilder(activeTemplate());

  createEffect(() => {
    console.log(formDigested());
    console.log(activeTemplate());
  });

  const formDigested = () => formBuilder().output();
  return (
    <div class="flex flex-col flex-1 flex-grow overflow-hidden p-3 ">
      <div class="flex justify-between items-center p-3 ">
        <div class="text-2xl font-bold text-primary leading-10">
          Create Form
        </div>
      </div>
      <div class="text-text p-3 font-semibold">Select a template</div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-3">
        {templates.map((template) => (
          <div
            class="bg-white shadow-md rounded-lg p-3 cursor-pointer"
            onClick={() => {
              console.log(template.template);
              setActiveTemplate(template.template);
            }}
          >
            <div class="text-lg font-semibold text-primary">
              {template.name}
            </div>
            <div class="text-text">{template.description}</div>
          </div>
        ))}
      </div>
      <div class="p-3">
        <For each={formDigested()}>
          {(field) => (
            <div class="p-3">
              {JSON.stringify(field)}
              <For each={field.entities}>
                {(entity) => (
                  <div class="p-3">
                    <div class="text-lg font-semibold text-primary">
                      {entity.name}
                    </div>
                    <div class="text-text">{entity.type}</div>
                    {entity.render()}
                  </div>
                )}
              </For>
            </div>
          )}
        </For>
      </div>
    </div>
  );
};

export default FormCreate;
