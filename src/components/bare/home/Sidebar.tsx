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
import Code from "@lib/icons/code";
import Link from "@lib/icons/link";
import {
  fetch_blogs_collections,
  fetch_documentation_collections,
} from "@lib/service/collection";
import { Skeleton } from "~/components/ui/skeleton";

const originURL = import.meta.env.VITE_ORIGIN;

const SideBar: Component = () => {
  const [collections, { refetch }] = createResource(
    fetch_documentation_collections,
  );
  const [blogs, { refetch: refetchBlogs }] = createResource(
    fetch_blogs_collections,
  );

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
        class={`text-white bg-primary-900/10 z-40 w-80 flex-shrink-0 h-screen transform: -translate-x-full sm:translate-x-0 transition-transform duration-200
          ${isMobile() ? "fixed bg-primary-900" : ""}
          ${isMobileAndSidebarVisible() ? "transform: translate-x-0" : ""}`}
        aria-label="Sidebar"
      >
        <div class=" pb-4 overflow-y-auto  h-full flex flex-col gap-6 bg-white">
          <div class=" flex-col gap-3">
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
                  <div class="w-5 h-5">
                    <Collection />
                  </div>
                  <span class="flex-1 ms-3 whitespace-nowrap">Collections</span>
                </A>
                <ul class="pl-3">
                  <Show
                    when={collections()}
                    fallback={
                      <div class="flex gap-5 pt-1 flex-col p-3">
                        <Skeleton height={24} radius={6} />
                        <Skeleton height={24} radius={6} />
                      </div>
                    }
                  >
                    <For
                      each={collections().articles}
                      fallback={<PageSkeleton />}
                    >
                      {(article) => (
                        <li>
                          <A
                            href={`/documentation/article/${article.text_id}`}
                            class={`block truncate items-center p-3    hover:bg-secondary hover:text-secondary-foreground    group ${
                              matchPath(`article/${article.text_id}`)
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
            <A href="/blog/collection">
              <div class="p-3 border-secondary border-b-2 text-text text-md font-black truncate flex gap-3 items-center">
                <div class="w-6 h-6">
                  <News />
                </div>
                Blog
              </div>
            </A>
            <ul class="font-medium">
              <li>
                {/* <A
                  href="/blog/collection"
                  class={`flex items-center p-3    hover:bg-secondary hover:text-secondary-foreground    group ${
                    matchPath("/blog/collection")
                      ? "text-secondary-foreground bg-secondary"
                      : "text-secondary"
                  }`}
                >
                  <div class="w-6 h-6">
                    <News />
                  </div>
                  <span class="flex-1 ms-3 whitespace-nowrap">Blogs</span>
                </A> */}
                <ul class="pl-3">
                  <Show when={blogs()}>
                    <For each={blogs().articles} fallback={<PageSkeleton />}>
                      {(article) => (
                        <li>
                          <A
                            href={`/blog/article/${article.text_id}`}
                            class={`block truncate p-3  hover:bg-secondary hover:text-secondary-foreground    group ${
                              matchPath(`article/${article.text_id}`)
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
          <div>
            <Show
              when={!collections.loading}
              fallback={
                <div class="flex gap-5 pt-1 flex-col p-3">
                  <Skeleton height={24} radius={6} />
                  <Skeleton height={24} radius={6} />
                </div>
              }
            >
              <a
                href={`${originURL}/embed-code/index.html?collection_id=${collections()?.id}`}
                target="_blank"
                class={`truncate flex items-center p-3  hover:bg-secondary hover:text-secondary-foreground  text-secondary  group `}
              >
                <div class="w-6 h-6">
                  <Code />
                </div>
                <span class="flex-1 ms-3 whitespace-nowrap">
                  Embedded Documentation
                </span>
              </a>
              <a
                href={
                  originURL + "/public/2/collection/" + collections()?.text_id
                }
                target="_blank"
                class={`truncate flex items-center p-3  hover:bg-secondary hover:text-secondary-foreground  text-secondary  group `}
              >
                <div class="w-6 h-6">
                  <Link />
                </div>
                <span class="flex-1 ms-3 whitespace-nowrap">
                  Public Documentation
                </span>
              </a>
            </Show>
          </div>
        </div>
      </aside>
    </>
  );
};
export default SideBar;
