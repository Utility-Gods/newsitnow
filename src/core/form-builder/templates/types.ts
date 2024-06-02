import { FormFieldType, FormOption } from "../core/types";

interface FormLabelConfig {
  text: string;
  for: string;
}

interface FormFieldConfig {
  type: FormFieldType;
  name: string;
  // For select fields
  options?: FormOption[];
}

interface FormEntityConfig {
  label: FormLabelConfig;
  field: FormFieldConfig;
}

interface FormActionTypeConfig {
  type: FormFieldType;
  label?: string;
}

interface FormActionMethodConfig {
  method: FormActionMethodConfig;
}

interface FormActionConfig {
  type: FormActionTypeConfig;
  method: FormActionMethodConfig;
}

export interface FormTemplate {
  entities: FormEntityConfig[];
  action: FormActionConfig;
}
