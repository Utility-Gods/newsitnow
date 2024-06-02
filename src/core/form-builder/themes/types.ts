interface FormFieldStyles {
  formField: string;
  label: string;
  input: string;
  select: string;
  checkbox: string;
  radio: string;
  textarea: string;
  error: string;
}

// interface FormButtonStyles {
//   button: string;
//   submit: string;
//   reset: string;
// }

// interface FormStyles {
//   form: string;
//   fields: FormFieldStyles;
//   buttons: FormButtonStyles;
// }

export interface Theme {
  name: string;
  form: string;
  formField: FormFieldStyles;
}
