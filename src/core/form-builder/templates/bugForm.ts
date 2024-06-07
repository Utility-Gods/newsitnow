import { FormFieldType } from "../core/types";
import { type FormTemplate } from "./types";

const bugReportForm: FormTemplate = {
  entities: [
    {
      label: {
        text: "Title",
        for: "title",
      },
      field: {
        type: FormFieldType.Text,
        name: "title",
        required: true,
      },
    },
    {
      label: {
        text: "Description",
        for: "description",
      },
      field: {
        type: FormFieldType.Textarea,
        name: "description",
        required: true,
      },
    },
    {
      label: {
        text: "Steps to Reproduce",
        for: "steps",
      },
      field: {
        type: FormFieldType.Textarea,
        name: "steps",
        required: true,
      },
    },
    {
      label: {
        text: "Expected Result",
        for: "expected",
      },
      field: {
        type: FormFieldType.Textarea,
        name: "expected",
      },
    },
    {
      label: {
        text: "Actual Result",
        for: "actual",
      },
      field: {
        type: FormFieldType.Textarea,
        name: "actual",
      },
    },
    {
      label: {
        text: "Browser",
        for: "browser",
      },
      field: {
        type: FormFieldType.Select,
        name: "browser",
        options: [
          { label: "Chrome", value: "chrome" },
          { label: "Firefox", value: "firefox" },
          { label: "Safari", value: "safari" },
          { label: "Edge", value: "edge" },
          { label: "Other", value: "other" },
        ],
      },
    },
    {
      label: {
        text: "Operating System",
        for: "os",
      },
      field: {
        type: FormFieldType.Select,
        name: "os",
        options: [
          { label: "Windows", value: "windows" },
          { label: "macOS", value: "macos" },
          { label: "Linux", value: "linux" },
          { label: "Other", value: "other" },
        ],
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

export default bugReportForm;
