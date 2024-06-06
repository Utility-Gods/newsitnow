import {
  CheckboxField,
  EmailField,
  PasswordField,
  RadioField,
  SelectField,
  SubmitField,
  TextField,
  TextareaField,
} from "./FormField";
import { FormField, FormFieldType, FormOption } from "./types";

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
    options?: FormOption[],
  ): FormField {
    return new SelectField(type, name, options);
  }
}

export class EmailFieldFactory implements FormFieldFactory {
  createField(type: FormFieldType, name: string): FormField {
    return new EmailField(type, name);
  }
}

export class PasswordFieldFactory implements FormFieldFactory {
  createField(type: FormFieldType, name: string): FormField {
    return new PasswordField(type, name);
  }
}

export class RadioFieldFactory implements FormFieldFactory {
  createField(
    type: FormFieldType,
    name: string,
    options: FormOption[],
  ): FormField {
    return new RadioField(type, name, options);
  }
}

export class CheckboxFieldFactory implements FormFieldFactory {
  createField(
    type: FormFieldType,
    name: string,
    options: FormOption[],
  ): FormField {
    return new CheckboxField(type, name, options);
  }
}

export class SubmitFieldFactory implements FormFieldFactory {
  createField(type: FormFieldType, name: string): FormField {
    return new SubmitField(type, name);
  }
}

export class TextareaFactory implements FormFieldFactory {
  createField(type: FormFieldType, name: string): FormField {
    return new TextareaField(type, name);
  }
}
