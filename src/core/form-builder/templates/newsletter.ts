import { FormFieldType } from "../core/types";
import type { FormTemplate } from "./types";

const newsletterForm: FormTemplate = {
  entities: [
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

export default newsletterForm;
