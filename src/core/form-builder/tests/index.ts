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
  ],
  action: {
    type: { type: "submit" },
    method: { method: "POST" },
  },
};

const formBuilder = new FormBuilder(formConfig);

console.log(formBuilder.output());
