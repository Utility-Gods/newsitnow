import { Theme } from "../themes/types";

export type FormRoot = {
  entities: FormEntity[];
  action: FormAction;
};

export type FormEntity = {
  label: FormLabel;
  field: FormField;
  rules?: FormRule[];
};

export type FormLabel = {
  text: string;
  for: string;
};

export type FormField = {
  type: FormFieldType;
  name: string;
  value?: any;
  options?: FormOption[];
  render: (props?: any) => JSX.Element;
  renderWithTheme: (theme: Theme) => JSX.Element;
  [key: string]: any; // Allow additional properties for future extensibility
};

export type FormOption = {
  label: string;
  value: any;
};

export type FormRule = {
  type: FormRuleType;
  params: any; // Rule parameters can vary based on the rule type
};

export enum FormFieldType {
  Text = "text",
  Number = "number",
  Email = "email",
  Password = "password",
  Checkbox = "checkbox",
  Radio = "radio",
  Select = "select",
  Textarea = "textarea",
  // Add more field types as needed
}

export enum FormRuleType {
  Required = "required",
  MaxLength = "maxLength",
  MinLength = "minLength",
  Pattern = "pattern",
  // Add more rule types as needed
}

export type FormAction = {
  label: string;
  field: FormField;
  [key: string]: any; // Al// Allow additional properties for future extensibility
};

export type FormActionType = {
  type: string;
};

export type FormActionMethod = {
  method: string;
};
