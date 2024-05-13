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
import Collection from "@lib/icons/Collection";
import News from "@lib/icons/News";

const fetch_collections = async () => {
  try {
    const res = await fetch(
      "https://orange-gas-strapi.fly.dev/api/collections/" + 18,
    );
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
    const res = await fetch(
      "https://orange-gas-strapi.fly.dev/api/collections/" + 20,
    );
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
            <div class="p-3 border-secondary border-b-2 text-text text-md font-black truncate flex gap-3 items-center">
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
                <Collection />
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
                          class={`block truncate items-center p-3    hover:bg-secondary hover:text-secondary-foreground    group ${
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
            <div class="p-3 border-secondary border-b-2 text-text text-md font-black truncate flex gap-3 items-center">
              <div class="w-6 h-6">
                <News />
              </div>
              Blog
            </div>
          </A>
          <ul class="font-medium">
            <li>
              <A
                href="/blog/collection"
                class={`flex items-center p-3    hover:bg-secondary hover:text-secondary-foreground    group ${
                  matchPath("/blog/collection")
                    ? "text-secondary-foreground bg-secondary"
                    : "text-secondary"
                }`}
              >
                <News />
                <span class="flex-1 ms-3 whitespace-nowrap">Blogs</span>
              </A>
              <ul class="pl-3">
                <Show when={blogs()}>
                  <For each={blogs().articles} fallback={<PageSkeleton />}>
                    {(article) => (
                      <li>
                        <A
                          href={`/blog/article/${article.id}`}
                          class={`block truncate p-3  hover:bg-secondary hover:text-secondary-foreground    group ${
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
