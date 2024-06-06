import { Component, For, Show, createSignal } from "solid-js";
import { Button } from "~/components/ui/button";
import FormActionField from "~/core/form-builder/components/FormActionField";
import FormField from "~/core/form-builder/components/FormField";
import { FormBuilder } from "~/core/form-builder/core/FormBuilder";
import contactForm from "~/core/form-builder/templates/contact";
import loginForm from "~/core/form-builder/templates/login";
import newsletterForm from "~/core/form-builder/templates/newsletter";
import themes from "~/core/form-builder/themes";
import { Dialog, DialogContent, DialogHeader } from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { save_form } from "@lib/service/form";
import { A, useNavigate, useParams } from "@solidjs/router";
import { get_user_id, show_error_toast } from "@lib/utils";
import { showToast } from "~/components/ui/toast";
import PageSpinner from "~/components/bare/common/PageSpinner";
import registrationForm from "~/core/form-builder/templates/registration";
import feedbackForm from "~/core/form-builder/templates/feedback";
import suggestionForm from "~/core/form-builder/templates/suggestionForm";

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
    name: "Subscription Form",
    template: newsletterForm,
    description: "A simple newsletter subscription form",
  },
  {
    name: "Registration Form",
    template: registrationForm,
    description: "A simple registration form",
  },
  {
    name: "Feedback Form",
    template: feedbackForm,
    description: "A simple feedback form",
  },
  {
    name: "Suggestion Form",
    template: suggestionForm,
    description: "A simple suggestion form",
  },
];
const FormCreate: Component = () => {
  const navigate = useNavigate();
  const params = useParams();

  const org_id = () => params.org_id;

  if (!org_id()) {
    navigate("/");
  }

  const [showSaveModal, setShowSaveModal] = createSignal(false);

  const active_theme = () => themes[activeTheme()];

  const [activeTemplate, setActiveTemplate] = createSignal(0);
  const [formName, setFormName] = createSignal("");

  const [activeTheme, setActiveTheme] = createSignal(0);
  const [loading, setLoading] = createSignal(false);
  const formBuilder = () =>
    new FormBuilder(templates[activeTemplate()].template);
  const formDigested = () => formBuilder().output();

  async function handleSaveFormTemplate() {
    console.log("Save form template", formName());
    console.log("formBuilder JSON", formBuilder().getTemplate());
    console.log("theme", active_theme());

    try {
      setLoading(true);
      const result = await save_form({
        name: formName(),
        template: formBuilder().getTemplate(),
        theme: active_theme(),
        org_id: org_id(),
        creator: get_user_id(),
      });

      console.log("Save form result", result);
      if (result.isErr()) {
        throw result.error;
      }

      if (result.isOk()) {
        showToast({
          title: "Form saved successfully",
          description:
            "Now you can use this form to collect data from your users.",
          duration: 5000,
          variant: "success",
        });
        navigate(`/app/${org_id()}/forms`);
      }
    } catch (e) {
      console.error(e);
      setLoading(false);
      show_error_toast(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div class="flex flex-col flex-1 flex-grow overflow-hidden p-3 ">
      <Show when={loading()}>
        <PageSpinner />
      </Show>
      <div class="flex justify-between items-center p-3 ">
        <div class="text-2xl font-bold text-primary leading-10">
          Create Form
        </div>
      </div>
      <div class="px-3 font-semibold text-muted-foreground">
        Select a template
      </div>
      <div class="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-3 p-3">
        {templates.map((template, index) => (
          <div
            class={` shadow-md rounded-lg p-3 cursor-pointer
              ${activeTemplate() === index ? "bg-secondary text-secondary-foreground" : "bg-white"}
              `}
            onClick={() => {
              setActiveTemplate(index);
            }}
          >
            <div class="flex gap-2 text-lg font-semibold ">{template.name}</div>
            <div>{template.description}</div>
          </div>
        ))}
        <A
          href="https://orangegas.co/action-form/1"
          target="_blank"
          class={` shadow-md rounded-lg p-3 cursor-pointer
            `}
        >
          <div class="flex gap-2 text-lg font-semibold ">
            Request a template
          </div>
        </A>
      </div>
      <div class="px-3 font-semibold text-muted-foreground">Select a theme</div>
      <div class="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-3 p-3">
        {themes.map((theme, index) => (
          <div
            class={`shadow-md rounded-lg p-3 cursor-pointer
                ${activeTheme() === index ? "bg-secondary text-secondary-foreground" : "bg-white"}

              `}
            onClick={() => {
              setActiveTheme(index);
              setActiveTemplate(activeTemplate());
            }}
          >
            <div class="text-lg font-semibold">{theme.name}</div>
          </div>
        ))}
      </div>
      <div class="p-3">
        <div class="px-3 font-semibold text-muted-foreground">Form Preview</div>
        <div class="p-3">
          <form
            onSubmit={(e) => e.preventDefault()}
            class={themes[activeTheme()].form}
          >
            <For each={formDigested()?.entities ?? []}>
              {(field) => (
                <Show when={field}>
                  <FormField field={field} theme={active_theme} />
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
              theme={active_theme}
            />
          </form>
        </div>
      </div>
      <div class="p-3 text-right">
        <Button
          onClick={() => {
            setShowSaveModal(true);
          }}
        >
          Continue
        </Button>
      </div>
      <Dialog
        open={showSaveModal()}
        onOpenChange={() => {
          setShowSaveModal(false);
        }}
      >
        <DialogContent class="w-[600px]">
          <DialogHeader class="space-y-1.5 overflow-hidden gap-2">
            <h2 class="text-lg font-semibold px-2">Give your form a name...</h2>
            <div class="px-2 text-muted-foreground">
              This name will be shown to your users when they fill the form.
            </div>
            <div class="flex flex-col col-span-3 p-2">
              <Input
                id="name"
                area-invalid={"false"}
                value={formName()}
                onChange={(e) => {
                  setFormName(e.currentTarget.value);
                }}
                required
              />
            </div>
            <div class="flex gap-3 justify-end p-2">
              <Button
                onClick={() => {
                  setShowSaveModal(false);
                }}
                variant="outline"
              >
                Cancel
              </Button>
              <Button onClick={() => handleSaveFormTemplate()}>Save</Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FormCreate;
