import { Theme } from "./types";

const themes: Theme[] = [
  {
    name: "light",
    form: "bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4",
    formField: "mb-4",
    label: "block text-gray-700 text-sm font-bold mb-2",
    text: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
    email:
      "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
    select:
      "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
    checkbox: "form-checkbox h-5 w-5 text-blue-600",
    radio: "form-radio h-5 w-5 text-blue-600",
    textarea:
      "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
    error: "text-red-500 text-xs italic",
    button:
      "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline",
    submit:
      "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline",
    reset:
      "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline",
  },
  {
    name: "dark",
    form: "bg-gray-800 shadow-lg rounded px-12 pt-10 pb-12 mb-6",
    formField: "mb-6",
    email:
      "shadow-md appearance-none border rounded w-full py-3 px-4 text-gray-200 leading-tight focus:outline-none focus:border-blue-500",

    label: "block text-gray-200 text-sm font-semibold mb-2",
    text: "shadow-md appearance-none border rounded w-full py-3 px-4 text-gray-200 leading-tight focus:outline-none focus:border-blue-500",
    select:
      "shadow-md appearance-none border rounded w-full py-3 px-4 text-gray-200 leading-tight focus:outline-none focus:border-blue-500",
    checkbox: "form-checkbox h-6 w-6 text-blue-500",
    radio: "form-radio h-6 w-6 text-blue-500",
    textarea:
      "shadow-md appearance-none border rounded w-full py-3 px-4 text-gray-200 leading-tight focus:outline-none focus:border-blue-500",
    error: "text-red-400 text-sm italic mt-2",

    button:
      "bg-blue-600 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline-blue",
    submit:
      "bg-green-600 hover:bg-green-800 text-white font-semibold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline-green",
    reset:
      "bg-red-600 hover:bg-red-800 text-white font-semibold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline-red",
  },
];

export default themes;
