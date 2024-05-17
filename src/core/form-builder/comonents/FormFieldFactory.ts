import { FormField, FormFieldType, FormOption } from "../types/types";
import { EmailField, SelectField, TextField } from "./FormField";

export interface FormFieldFactory {
  createField(
    type: FormFieldType,
    name: string,
    options?: FormOption[],
  ): FormField;
}

export class TextFieldFactory implements FormFieldFactory {
  createField(type: FormFieldType, name: string): FormField {
    return new TextField(type, name);
  }
}

export class SelectFieldFactory implements FormFieldFactory {
  createField(
    type: FormFieldType,
    name: string,
    options: FormOption[],
  ): FormField {
    return new SelectField(type, name, options);
  }
}

export class EmailFieldFactory implements FormFieldFactory {
  createField(type: FormFieldType, name: string): FormField {
    return new EmailField(type, name);
  }
}
