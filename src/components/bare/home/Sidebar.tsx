import Book from "@lib/icons/Book";
import { A, useLocation, useSearchParams } from "@solidjs/router";
import { Show, onMount } from "solid-js";
import { For } from "solid-js";
import { createResource } from "solid-js";
import { Component, createEffect, createSignal } from "solid-js";
import PageSkeleton from "../common/PageSkeleton";
import { check_if_mobile } from "@lib/utils";
import Close from "@lib/icons/Close";
import Menu from "@lib/icons/Menu";

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

const fetch_blogs = async () => {
  try {
    const res = await fetch("http://localhost:1337/api/collections/" + 20);
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
  const [blogs, { refetch: refetchBlogs }] = createResource(fetch_blogs);

  const [urlParams, setParams] = useSearchParams();
  const location = useLocation();

  const [path, setPath] = createSignal(location.pathname);

  const [isMobile, setMobile] = createSignal(check_if_mobile());

  const resizeObserver = new ResizeObserver((entries) => {
    console.log("resize");
    for (let entry of entries) {
      console.log(entry.contentRect.width);
      const isMobile = check_if_mobile();
      console.log({ isMobile });
      setMobile(isMobile);
      console.log(isMobileAndSidebarVisible());
    }
  });

  onMount(() => {
    resizeObserver.observe(document.body);
  });

  const isMobileAndSidebarVisible = () => {
    console.log({ sidebar: isMobile() && urlParams.sidebar == "true" });
    return isMobile() && urlParams.sidebar == "true";
  };

  createEffect(() => {
    setPath(location.pathname);
  });

  function matchPath(path: string) {
    return (
      location.pathname === path ||
      location.pathname.startsWith(path) ||
      path.startsWith(location.pathname) ||
      location.pathname.includes(path)
    );
  }

  return (
    // JSX code for your component's UI goes here
    <>
      <Show when={isMobile()}>
        <button
          class="absolute top-0 left-0 m-4"
          onClick={() => {
            console.log(urlParams.sidebar);
            setParams({
              sidebar: urlParams.sidebar == "true" ? "false" : "true",
            });
          }}
        >
          <div class="w-6 h-6 text-white">
            <Show when={!isMobileAndSidebarVisible()} fallback={<Close />}>
              <Menu />
            </Show>
          </div>
        </button>
      </Show>
      <aside
        id="default-sidebar"
        class={`text-white z-40 w-80 flex-shrink-0 h-screen transform: -translate-x-full sm:translate-x-0 transition-transform duration-200
          ${isMobile() ? "fixed bg-primary-900" : ""}
          ${isMobileAndSidebarVisible() ? "transform: translate-x-0" : ""}`}
        aria-label="Sidebar"
        style={``}
      >
        <div class="h-full pb-4 overflow-y-auto bg-primary-900/10">
          <A href="/documentation">
            <div class="p-3 text-md font-black text-secondary truncate flex gap-3 items-center">
              <div class="w-6 h-6">
                <Book />
              </div>
              Documentation
            </div>
          </A>
          <ul class="font-medium">
            <li>
              <A
                href="/documentation/collection"
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
                  <For
                    each={collections().articles}
                    fallback={<PageSkeleton />}
                  >
                    {(article) => (
                      <li>
                        <A
                          href={`/documentation/article/${article.id}`}
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
          <A href="/blog">
            <div class="p-3 text-md font-black text-secondary truncate flex gap-3 items-center">
              <div class="w-6 h-6">
                <Book />
              </div>
              Blog
            </div>
          </A>
          <ul class="font-medium">
            <li>
              <A
                href="/blog/collection"
                class={`flex items-center p-3    hover:bg-secondary hover:text-secondary-foreground    group ${
                  matchPath("/documentation/blog")
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
                <span class="flex-1 ms-3 whitespace-nowrap">Blog</span>
              </A>
              <ul class="pl-3">
                <Show when={blogs()}>
                  <For each={blogs().articles} fallback={<PageSkeleton />}>
                    {(article) => (
                      <li>
                        <A
                          href={`/blog/article/${article.id}`}
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
    </>
  );
};
export default SideBar;
