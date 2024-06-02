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
}
