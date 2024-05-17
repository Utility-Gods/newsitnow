import { FormEntity, FormRoot } from "../types/types";
import {
  EmailFieldFactory,
  FormFieldFactory,
  TextFieldFactory,
  SelectFieldFactory,
} from "./FormFieldFactory";

export class FormBuilder {
  private fields: FormEntity[] = [];
  private factories: { [key: string]: FormFieldFactory } = {
    text: new TextFieldFactory(),
    email: new EmailFieldFactory(),
    select: new SelectFieldFactory(),
    // Register more factories for other field types
  };

  constructor(private formConfig: FormRoot) {
    this.buildForm();
  }

  output() {
    return this.fields;
  }

  private buildForm() {
    for (const entity of this.formConfig.entities) {
      const factory = this.factories[entity.field.type];
      if (factory) {
        const field = factory.createField(
          entity.field.type,
          entity.field.name,
          entity.field.options,
        );
        this.fields.push({ label: entity.label, field });
      }
    }
  }

  // Other methods to handle form actions, validation, submission, etc.
}
