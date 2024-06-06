import { FormFieldType } from "../core/types";
import { FormTemplate } from "./types";

const registrationForm: FormTemplate = {
  entities: [
    {
      label: {
        text: "First Name",
        for: "firstName",
      },
      field: {
        type: FormFieldType.Text,
        name: "firstName",
      },
    },
    {
      label: {
        text: "Last Name",
        for: "lastName",
      },
      field: {
        type: FormFieldType.Text,
        name: "lastName",
      },
    },
    {
      label: {
        text: "Email",
        for: "email",
      },
      field: {
        type: FormFieldType.Email,
        name: "email",
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
    {
      label: {
        text: "Confirm Password",
        for: "confirmPassword",
      },
      field: {
        type: FormFieldType.Password,
        name: "confirmPassword",
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

export default registrationForm;
