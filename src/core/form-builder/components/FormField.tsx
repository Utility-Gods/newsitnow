import { Component, createEffect } from "solid-js";

import { type FormField as IFormField } from "../core/types";
import { Theme } from "../themes/types";

const FormField: Component = (props) => {
  const { field, theme } = props as { field: IFormField; theme: Theme };
  console.log(field);
  const type = () => field.field.type;

  createEffect(() => {
    console.log(type());
    console.log(theme[type()]);
  });

  return (
    <div class={`${theme.formField}`}>
      <label class={`${theme.label} `}>{field.field.name.toUpperCase()}</label>
      <div class={`${theme[type()]} `} innerHTML={field.field.render()}></div>
    </div>
  );
};

export default FormField;
