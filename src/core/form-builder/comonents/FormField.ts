import { FormField, FormFieldType, FormOption } from "../types/types";

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

  constructor(type: FormFieldType, name: string, options: FormOption[]) {
    this.type = type;
    this.name = name;
    this.options = options;
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
