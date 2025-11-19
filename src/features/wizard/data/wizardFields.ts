import type { UserInfo } from "../model";

export interface Field {
  name: keyof UserInfo;
  placeholder: string;
  type: string;
  label: string;
  validation?: object;
}

export const initialFields: Field[] = [
  {
    name: "firstName",
    placeholder: "First Name",
    type: "text",
    label: "First name:",
    validation: { required: "First name is required" },
  },
  {
    name: "lastName",
    placeholder: "Last Name",
    type: "text",
    label: "Last name:",
    validation: { required: "Last name is required" },
  },
  {
    name: "age",
    placeholder: "Age",
    type: "number",
    label: "Age:",
    validation: {
      required: "Age is required",
      min: { value: 0, message: "Age must be positive" },
      valueAsNumber: true,
    },
  },
  {
    name: "email",
    placeholder: "E-mail",
    type: "email",
    label: "Email:",
    validation: {
      required: "Email is required",
      pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
    },
  },
  {
    name: "startDate",
    placeholder: "",
    type: "date",
    label: "Start date:",
    validation: { required: "Start date is required" },
  },
  {
    name: "location",
    placeholder: "Location",
    type: "text",
    label: "Location:",
    validation: { required: "Location is required" },
  },
  {
    name: "language",
    placeholder: "Language",
    type: "text",
    label: "Language:",
    validation: { required: "Language is required" },
  },
  {
    name: "description",
    placeholder: "Type the description...",
    type: "text",
    label: "Description:",
    validation: { required: "Description is required" },
  },
];
