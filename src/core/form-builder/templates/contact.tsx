import { FormFieldType } from "../core/types";
import { type FormTemplate } from "./types";

const contactForm: FormTemplate = {
  entities: [
    {
      label: {
        text: "Name",
        for: "name",
      },
      field: {
        type: FormFieldType.Text,
        name: "name",
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
        text: "Message",
        for: "message",
      },
      field: {
        type: FormFieldType.Textarea,
        name: "message",
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

export default contactForm;
