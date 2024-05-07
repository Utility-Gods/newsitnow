import { A, useLocation } from "@solidjs/router";
import { Component, createEffect, createSignal } from "solid-js";

const SideBar: Component = () => {
  const location = useLocation();

  const [path, setPath] = createSignal(location.pathname);

  createEffect(() => {
    setPath(location.pathname);
  });

  return (
    // JSX code for your component's UI goes here
    <aside
      id="default-sidebar"
      class="text-white z-40 w-80 flex-shrink-0 h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div class="h-full pb-4 overflow-y-auto bg-secondary ">
        <div class="p-3 text-md font-bold text-white">Documentation</div>
        <ul class="font-medium">
          <li>
            <A
              href="collection"
              class={`flex items-center p-3    hover:bg-white hover:text-text    group ${
                path() === "collection" ? "text-text bg-white" : "text-white"
              }`}
            >
              <svg
                class="flex-shrink-0 w-5 h-5  transition duration-75  group- "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
              </svg>
              <span class="flex-1 ms-3 whitespace-nowrap">Collections</span>
            </A>
          </li>
        </ul>
      </div>
    </aside>
  );
};
export default SideBar;
