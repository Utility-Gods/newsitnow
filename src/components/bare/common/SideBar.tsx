import Collection from "@lib/icons/Collection";
import Article from "@lib/icons/Article";
import { fetch_organizations } from "@lib/service/organization";
import { check_if_mobile } from "@lib/utils";
import { A, useLocation, useNavigate, useSearchParams } from "@solidjs/router";
import { Show, createResource } from "solid-js";
import { Component, createEffect, createSignal, onMount } from "solid-js";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Skeleton } from "~/components/ui/skeleton";
import Photo from "@lib/icons/Photo";

const SideBar: Component = () => {
  // Implement your component logic here

  const location = useLocation();
  const navigate = useNavigate();

  const [path, setPath] = createSignal(location.pathname);

  const user = localStorage.getItem("user");

  const name = user ? JSON.parse(user)?.user?.username : "User";

  const [urlParams, setParams] = useSearchParams();

  const [isMobile, setMobile] = createSignal(check_if_mobile());

  const org_details = () => orgList()?.value?.map((o) => o.name) ?? [];
  const default_org = () => org_details()[0] ?? "";
  const [orgList, { refetch }] = createResource(fetch_organizations);
  const [value, setValue] = createSignal(default_org());

  const resizeObserver = new ResizeObserver((entries) => {
    for (let entry of entries) {
      const isMobile = check_if_mobile();
      setMobile(isMobile);
    }
  });

  createEffect(() => {
    refetch();
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
    return location.pathname === path || location.pathname.startsWith(path);
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
      >
        <div class=" pb-4 overflow-y-auto bg-primary-900/10">
          <div class="p-3 text-md font-bold text-secondary">
            <Show
              when={!orgList.loading}
              fallback={
                <div>
                  <Skeleton class="w-20 h-6 rounded-lg bg-primary-900/20" />
                </div>
              }
            >
              <Show when={orgList()?.isOk()}>
                <div class="mb-2">Organization</div>
                <Select
                  defaultValue={default_org()}
                  onChange={setValue}
                  options={org_details()}
                  placeholder={
                    <div class="flex items-center">
                      <span class="ms-2">Organization</span>
                    </div>
                  }
                  itemComponent={(props) => (
                    <SelectItem item={props.item}>
                      {props.item.rawValue}
                    </SelectItem>
                  )}
                >
                  <SelectTrigger aria-label="Organization">
                    <SelectValue<string>>
                      {(state) => state.selectedOption()}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent class="font-bold"></SelectContent>
                </Select>
              </Show>
            </Show>
          </div>
          <ul class="font-medium">
            <li>
              <A
                href="collection"
                class={`flex items-center p-3    hover:bg-secondary hover:text-secondary-foreground    group ${
                  matchPath("/app/collection")
                    ? "text-secondary-foreground bg-secondary"
                    : "text-secondary"
                }`}
              >
                <div class="w-5 h-5">
                  <Collection />
                </div>
                <span class="flex-1 ms-3 whitespace-nowrap">Collections</span>
              </A>
            </li>
            <li>
              <A
                href="article"
                class={`flex items-center p-3    hover:bg-secondary hover:text-secondary-foreground    group ${
                  matchPath("/app/article")
                    ? "text-secondary-foreground bg-secondary"
                    : "text-secondary"
                }`}
              >
                <div class="w-5 h-5">
                  <Article />
                </div>
                <span class="flex-1 ms-3 whitespace-nowrap">Articles</span>
              </A>
            </li>
            <li>
              <A
                href="article"
                class={` flex items-center p-3    hover:bg-secondary hover:text-secondary-foreground    group ${
                  matchPath("/app/media")
                    ? "text-secondary-foreground bg-secondary"
                    : "text-secondary"
                }`}
              >
                <div class="w-5 h-5">
                  <Photo />
                </div>
                <span class="flex-1 ms-3 whitespace-nowrap">Media</span>
              </A>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};
export default SideBar;
