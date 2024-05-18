import { FormBuilder } from "../comonents/FormBuilder";
import { FormRoot } from "../types/types";

const formConfig: FormRoot = {
  entities: [
    {
      label: { text: "Name", for: "name" },
      field: { type: "text", name: "name" },
    },
    {
      label: { text: "Email", for: "email" },
      field: { type: "email", name: "email" },
    },
    {
      label: { text: "Department", for: "department" },
      field: {
        type: "select",
        name: "department",
        options: [
          { value: "hr", text: "Human Resources" },
          { value: "it", text: "Information Technology" },
          { value: "finance", text: "Finance" },
        ],
      },
    },
    {
      label: { text: "Employment Type", for: "employment-type" },
      field: {
        type: "radio",
        name: "employmentType",
        options: [
          { value: "full-time", text: "Full Time" },
          { value: "part-time", text: "Part Time" },
          { value: "contractor", text: "Contractor" },
        ],
      },
    },
  ],
  action: {
    type: { type: "submit" },
    method: { method: "POST" },
  },
};

const formBuilder = new FormBuilder(formConfig);

console.log(formBuilder.output());
