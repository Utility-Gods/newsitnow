import { Component, createEffect } from "solid-js";

import { type FormAction } from "../core/types";
import { Theme } from "../themes/types";

const FormActionField: Component = (props) => {
  const { field, theme } = props as { field: FormAction; theme: Theme };
  const type = () => field.field.type;

  return (
    <div class={`${theme().formField}`}>
      <div innerHTML={field.field.renderWithTheme(theme())}></div>
    </div>
  );
};

export default FormActionField;
