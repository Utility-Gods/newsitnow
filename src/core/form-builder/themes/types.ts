interface FormFieldStyles {
  formField: string;
  label: string;
  input: string;
  select: string;
  checkbox: string;
  radio: string;
  textarea: string;
  error: string;
  submit: string;
  email: string;
  button: string;
}

export interface Theme extends FormFieldStyles {
  name: string;
  form: string;
}
