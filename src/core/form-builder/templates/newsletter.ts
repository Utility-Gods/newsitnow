import { FormFieldType, FormRoot } from "../types/types";

const newsletterForm: FormRoot = {
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
