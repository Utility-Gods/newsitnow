import { Component, createEffect } from "solid-js";

import { type FormField as IFormField } from "../core/types";

const FormField: Component = (props) => {
  const { field, theme } = props as { field: IFormField; theme: any };

  let innerHTML = () => field.field.renderWithTheme(theme());

  return (
    <div class={`${theme().formField}`}>
      <label class={`${theme().label} `}>
        {field.field.name.toUpperCase()}
      </label>
      <div innerHTML={innerHTML()}></div>
    </div>
  );
};

export default FormField;
