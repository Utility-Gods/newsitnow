import { Theme } from "./types";

const themes: Theme[] = [
  {
    name: "light",
    form: "bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4",
    formField: "mb-4",
    label: "block text-gray-700 text-sm font-bold mb-2",
    input:
      "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
    email:
      "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
    select:
      "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
    checkbox: "form-checkbox h-5 w-5 text-blue-600",
    radio: "form-radio h-5 w-5 text-blue-600",
    textarea:
      "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
    error: "text-red-500 text-xs italic mt-2",
    button:
      "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline",
    submit:
      "bg-secondary hover:bg-secondary/80 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline",
  },
  {
    name: "dark",
    form: "bg-gray-900 shadow-md rounded px-8 pt-6 pb-8 mb-4",
    formField: "mb-6",
    label: "block text-gray-100 text-sm font-bold mb-2",
    input:
      "bg-gray-800 appearance-none border-2 border-gray-700 rounded w-full py-3 px-4 text-gray-400 leading-tight focus:outline-none focus:bg-gray-700 focus:border-purple-500",
    email:
      "bg-gray-800 appearance-none border-2 border-gray-700 rounded w-full py-3 px-4 text-gray-400 leading-tight focus:outline-none focus:bg-gray-700 focus:border-purple-500",
    select:
      "bg-gray-800 appearance-none border-2 border-gray-700 rounded w-full py-3 px-4 text-gray-400 leading-tight focus:outline-none focus:bg-gray-700 focus:border-purple-500",
    checkbox: "form-checkbox h-6 w-6 text-purple-500",
    radio: "form-radio h-6 w-6 text-purple-500",
    textarea:
      "bg-gray-800 appearance-none border-2 border-gray-700 rounded w-full py-3 px-4 text-gray-400 leading-tight focus:outline-none focus:bg-gray-700 focus:border-purple-500",
    error: "text-red-400 text-sm italic mt-2",
    button:
      "bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline-purple",
    submit:
      "bg-primary hover:bg-primary/80 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline-green",
  },
  {
    name: "material",
    form: "bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4",
    formField: "mb-6",
    label: "block text-gray-600 text-sm font-bold mb-2",
    input:
      "appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
    email:
      "appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
    select:
      "appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
    checkbox: "form-checkbox h-5 w-5 text-blue-500",
    radio: "form-radio h-5 w-5 text-blue-500",
    textarea:
      "appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
    error: "text-red-500 text-xs italic mt-2",
    button:
      "bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
    submit:
      "bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2",
  },
  {
    name: "minimal",
    form: "bg-white px-8 pt-6 pb-8 mb-4",
    formField: "mb-4",
    label: "block text-gray-700 text-sm font-bold mb-2",
    input:
      "appearance-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500",
    email:
      "appearance-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500",
    select:
      "appearance-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500",
    checkbox: "form-checkbox h-4 w-4 text-blue-500",
    radio: "form-radio h-4 w-4 text-blue-500",
    textarea:
      "appearance-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500",
    error: "text-red-500 text-xs italic mt-1",
    button:
      "text-blue-500 hover:text-blue-700 font-semibold py-2 px-4 focus:outline-none",
    submit:
      "text-green-500 hover:text-green-700 font-semibold py-2 px-4 focus:outline-none",
  },
];

export default themes;
