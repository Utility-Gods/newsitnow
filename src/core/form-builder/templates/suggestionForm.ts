import { FormFieldType } from "../core/types";
import { FormTemplate } from "./types";

const suggestionForm: FormTemplate = {
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
        text: "Category",
        for: "category",
      },
      field: {
        type: FormFieldType.Select,
        name: "category",
        options: [
          { value: "product", label: "Product Suggestion" },
          { value: "feature", label: "Feature Request" },
          { value: "improvement", label: "Improvement Idea" },
          { value: "other", label: "Other" },
        ],
      },
    },
    {
      label: {
        text: "Subject",
        for: "subject",
      },
      field: {
        type: FormFieldType.Text,
        name: "subject",
      },
    },
    {
      label: {
        text: "Suggestion",
        for: "suggestion",
      },
      field: {
        type: FormFieldType.Textarea,
        name: "suggestion",
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

export default suggestionForm;
