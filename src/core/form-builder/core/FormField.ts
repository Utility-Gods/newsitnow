import { Theme } from "../themes/types";
import { FormField, FormFieldType, FormOption } from "./types";

export class TextField implements FormField {
  type: FormFieldType;
  name: string;

  constructor(type: FormFieldType, name: string) {
    this.type = type;
    this.name = name;
  }

  render() {
    return `
      <input type="text" name="${this.name}" />
    `;
  }

  renderWithTheme(theme: Theme) {
    if (!theme) {
      return this.render();
    }
    return `
      <input type="text" name="${this.name}" class="${theme.input}" />
    `;
  }
}

export class SelectField implements FormField {
  type: FormFieldType;
  name: string;
  options: FormOption[];

  constructor(type: FormFieldType, name: string, options?: FormOption[]) {
    this.type = type;
    this.name = name;
    this.options = options || [];
  }

  // render
  render() {
    return `
      <select>
        ${this.options.map((option) => `<option>${option.label}</option>`).join("")}
      </select>
    `;
  }

  renderWithTheme(theme: Theme) {
    if (!theme) {
      return this.render();
    }
    return `
      <select class="${theme.select}">
        ${this.options.map((option) => `<option>${option.label}</option>`).join("")}
      </select>
    `;
  }
}

export class EmailField implements FormField {
  type: FormFieldType;
  name: string;

  constructor(type: FormFieldType, name: string) {
    this.type = type;
    this.name = name;
  }

  render() {
    return `
      <input type="email" name="${this.name}" />
    `;
  }

  renderWithTheme(theme: Theme) {
    console.log("in email field builder class", { theme });
    if (!theme) {
      return this.render();
    }
    return `
      <input type="email" name="${this.name}" class="${theme.email}" />
    `;
  }
}

export class PasswordField implements FormField {
  type: FormFieldType;
  name: string;

  constructor(type: FormFieldType, name: string) {
    this.type = type;
    this.name = name;
  }

  render() {
    return `
      <input type="password" name="${this.name}" />
    `;
  }

  renderWithTheme(theme: Theme) {
    if (!theme) {
      return this.render();
    }
    return `
      <input type="password" name="${this.name}" class="${theme.input}" />
    `;
  }
}

export class RadioField implements FormField {
  type: FormFieldType;
  name: string;
  options: FormOption[];

  constructor(type: FormFieldType, name: string, options: FormOption[]) {
    this.type = type;
    this.name = name;
    this.options = options;
  }

  render() {
    return `
      ${this.options
        .map(
          (option) => `
        <input type="radio" name="${this.name}" value="${option.value}" />
        <label>${option.label}</label>
      `,
        )
        .join("")}
    `;
  }

  renderWithTheme(theme: Theme) {
    if (!theme) {
      return this.render();
    }
    return `
      ${this.options
        .map(
          (option) => `
        <input type="radio" name="${this.name}" value="${option.value}" class="${theme.radio}" />
        <label class="${theme.label}">${option.label}</label>
      `,
        )
        .join("")}
    `;
  }
}

export class CheckboxField implements FormField {
  type: FormFieldType;
  name: string;
  options: FormOption[];

  constructor(type: FormFieldType, name: string, options: FormOption[]) {
    this.type = type;
    this.name = name;
    this.options = options;
  }

  render() {
    return `
      ${this.options
        .map(
          (option) => `
        <input type="checkbox" name="${this.name}" value="${option.value}" />
        <label>${option.label}</label>
      `,
        )
        .join("")}
    `;
  }
  renderWithTheme(theme: Theme) {
    if (!theme) {
      return this.render();
    }
    return `
      ${this.options
        .map(
          (option) => `
        <input type="checkbox" name="${this.name}" value="${option.value}" class="${theme.checkbox}" />
        <label class="${theme.label}">${option.label}</label>
      `,
        )
        .join("")}
    `;
  }
}

export class SubmitField implements FormField {
  type: FormFieldType;
  name: string;

  constructor(type: FormFieldType, name: string) {
    this.type = type;
    this.name = name;
  }

  render() {
    return `
      <button type="submit">${this.name}</button>
    `;
  }

  renderWithTheme(theme: Theme) {
    if (!theme) {
      return this.render();
    }
    return `
      <button type="submit" class="${theme.submit}">${this.name}</button>
    `;
  }
}
