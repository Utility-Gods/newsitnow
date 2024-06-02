import { FormTemplate } from "../templates/types";
import { FormRoot } from "./types";
import {
  EmailFieldFactory,
  FormFieldFactory,
  TextFieldFactory,
  SelectFieldFactory,
  PasswordFieldFactory,
  RadioFieldFactory,
  CheckboxFieldFactory,
  SubmitFieldFactory,
} from "./FormFieldFactory";

export class FormBuilder {
  private fields: FormRoot = { entities: [], action: {} };
  private factories: { [key: string]: FormFieldFactory } = {
    text: new TextFieldFactory(),
    email: new EmailFieldFactory(),
    select: new SelectFieldFactory(),
    password: new PasswordFieldFactory(),
    radio: new RadioFieldFactory(),
    checkbox: new CheckboxFieldFactory(),
    submit: new SubmitFieldFactory(),
    // Register more factories for other field types
  };

  constructor(private formConfig?: FormTemplate) {
    if (formConfig) {
      this.buildForm();
    }
  }

  seed(formConfig: FormTemplate) {
    this.formConfig = formConfig;
    this.buildForm();
  }

  output() {
    return this.fields;
  }

  private buildForm() {
    if (!this.formConfig) {
      return;
    }
    for (const entity of this.formConfig.entities) {
      const factory = this.factories[entity.field.type];
      if (factory) {
        const field = factory.createField(
          entity.field.type,
          entity.field.name,
          entity.field?.options ?? [],
        );
        this.fields.entities.push({ label: entity.label, field });
      }
    }

    const action = this.formConfig.action;
    // Handle form action
    const factory = this.factories[action.type.type];
    if (factory) {
      const field = factory.createField(
        action.type.type,
        action.type.label ?? "Submit",
      );
      this.fields.action = {
        label: action.type.label ?? "Submit",
        field,
        method: action.method.method,
      };
    }
  }

  // Other methods to handle form actions, validation, submission, etc.
}
