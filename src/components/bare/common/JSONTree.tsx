import { Component, For } from "solid-js";

const JsonTreeViewer: Component<{ data: any }> = (props) => {
  const renderTreeNode = (key: string, value: any, level: number = 0) => {
    if (typeof value === "object") {
      return (
        <div class={`ml-${level * 4}`}>
          <div class="flex items-center">
            <span class="mr-2 cursor-pointer">&#9658;</span>
            <span class="font-bold">{key}:</span>
          </div>
          <div class="hidden">
            <For each={Object.entries(value)}>
              {([nestedKey, nestedValue]) =>
                renderTreeNode(nestedKey, nestedValue, level + 1)
              }
            </For>
          </div>
        </div>
      );
    } else {
      return (
        <div class={`ml-${level * 4}`}>
          <div class="flex items-center">
            <span class="font-bold">{key}:</span>
            <span class="ml-2">{value}</span>
          </div>
        </div>
      );
    }
  };

  const handleClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.tagName === "SPAN" && target.textContent === "►") {
      target.textContent = "▼";
      target.nextElementSibling.nextElementSibling.classList.remove("hidden");
    } else if (target.tagName === "SPAN" && target.textContent === "▼") {
      target.textContent = "►";
      target.nextElementSibling.nextElementSibling.classList.add("hidden");
    }
  };

  return (
    <div class="container mx-auto p-4">
      <div class="bg-white rounded shadow p-4" onClick={handleClick}>
        {props.data.response && (
          <For each={Object.entries(props.data.response)}>
            {([key, value]) => renderTreeNode(key, value)}
          </For>
        )}
      </div>
    </div>
  );
};

export default JsonTreeViewer;
