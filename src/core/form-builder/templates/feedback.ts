import { FormFieldType } from "../core/types";
import { FormTemplate } from "./types";

const feedbackForm: FormTemplate = {
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
        text: "Rating",
        for: "rating",
      },
      field: {
        type: FormFieldType.Select,
        name: "rating",
        options: [
          { value: "1", label: "1 - Poor" },
          { value: "2", label: "2 - Fair" },
          { value: "3", label: "3 - Average" },
          { value: "4", label: "4 - Good" },
          { value: "5", label: "5 - Excellent" },
        ],
      },
    },
    {
      label: {
        text: "Comments",
        for: "comments",
      },
      field: {
        type: FormFieldType.Textarea,
        name: "comments",
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

export default feedbackForm;
