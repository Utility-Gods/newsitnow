import { FormFieldType, FormRoot } from "../types/types";

const loginForm: FormRoot = {
  entities: [
    {
      label: {
        text: "Username",
        for: "username",
      },
      field: {
        type: FormFieldType.Text,
        name: "username",
      },
    },
    {
      label: {
        text: "Password",
        for: "password",
      },
      field: {
        type: FormFieldType.Password,
        name: "password",
      },
    },
  ],
  action: {
    type: {
      type: "submit",
    },
    method: {
      method: "POST",
    },
  },
};

export default loginForm;
