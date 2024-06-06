import { Component, createEffect } from "solid-js";

import { type FormField as IFormField } from "../core/types";
import { Theme } from "../themes/types";

const FormField: Component = (props) => {
  const { field, theme } = props as { field: IFormField; theme: Theme };
  console.log(field);
  const type = () => field.field.type;

  createEffect(() => {
    console.log("-=-=-=-=-=-=-=-=-=-=-");
    console.log(theme[type()]);
  });

  return (
    <div class={`${theme.formField}`}>
      <label class={`${theme.label} `}>{field.field.name.toUpperCase()}</label>
      <div innerHTML={field.field.renderWithTheme(theme)}></div>
    </div>
  );
};

export default FormField;
