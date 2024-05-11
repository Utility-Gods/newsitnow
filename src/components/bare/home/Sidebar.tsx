import Book from "@lib/icons/Book";
import { A, useLocation } from "@solidjs/router";
import { Show } from "solid-js";
import { For } from "solid-js";
import { createResource } from "solid-js";
import { Component, createEffect, createSignal } from "solid-js";
import PageSkeleton from "../common/PageSkeleton";

const fetch_collections = async () => {
  try {
    const res = await fetch("http://localhost:1337/api/collections/" + 18);
    if (!res.ok) {
      throw new Error("Failed to fetch collections");
    }
    return await res.json();
  } catch (err) {
    console.log(err);
    return [];
  }
};

const SideBar: Component = () => {
  const [collections, { refetch }] = createResource(fetch_collections);

  const location = useLocation();

  const [path, setPath] = createSignal(location.pathname);

  createEffect(() => {
    setPath(location.pathname);
  });

  function matchPath(path: string) {
    console.log(location.pathname, path);
    return (
      location.pathname === path ||
      location.pathname.startsWith(path) ||
      path.startsWith(location.pathname) ||
      location.pathname.includes(path)
    );
  }

  return (
    // JSX code for your component's UI goes here
    <aside
      id="default-sidebar"
      class="text-white z-40 w-80 flex-shrink-0 h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div class="h-full pb-4 overflow-y-auto bg-primary-900/10">
        <div class="p-3 text-md font-black text-secondary truncate flex gap-3 items-center">
          <div class="w-6 h-6">
            <Book />
          </div>
          Documentation
        </div>
        <ul class="font-medium">
          <li>
            <A
              href="collection"
              class={`flex items-center p-3    hover:bg-secondary hover:text-secondary-foreground    group ${
                matchPath("/documentation/collection")
                  ? "text-secondary-foreground bg-secondary"
                  : "text-secondary"
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
            <ul class="pl-3">
              <Show when={collections()}>
                <For each={collections().articles} fallback={<PageSkeleton />}>
                  {(article) => (
                    <li>
                      <A
                        href={`article/${article.id}`}
                        class={`flex items-center p-3    hover:bg-secondary hover:text-secondary-foreground    group ${
                          matchPath(`article/${article.id}`)
                            ? "text-secondary-foreground bg-secondary"
                            : "text-secondary"
                        }`}
                      >
                        <span class="flex-1 ms-3 whitespace-nowrap">
                          {article.name}
                        </span>
                      </A>
                    </li>
                  )}
                </For>
              </Show>
            </ul>
          </li>
        </ul>
      </div>
    </aside>
  );
};
export default SideBar;
