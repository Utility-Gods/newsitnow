import Collection from "@lib/icons/Collection";
import Article from "@lib/icons/Article";
import { fetch_organizations } from "@lib/service/organization";
import { check_if_mobile, get_org_by_id } from "@lib/utils";
import {
  A,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "@solidjs/router";
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
import { Organization } from "@lib/types/Organization";
import Org from "@lib/icons/Org";
import Menu from "@lib/icons/Menu";

const SideBar: Component = () => {
  // Implement your component logic here

  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const org_id = () => params.org_id;

  const [path, setPath] = createSignal(location.pathname);

  const user = localStorage.getItem("user");

  const name = user ? JSON.parse(user)?.user?.username : "User";

  const [urlParams, setParams] = useSearchParams();

  const [isMobile, setMobile] = createSignal(check_if_mobile());

  const org_details = () =>
    orgList()?.value?.map((o) => {
      return { label: o.name, value: o.id, id: o.id };
    }) ?? [];

  const default_org = () =>
    org_details().find((o: Organization) => o.id == Number(org_id())) ||
    org_details()[0];
  const [orgList] = createResource(fetch_organizations);

  const [value, setValue] = createSignal(default_org());

  createEffect(() => {
    console.log("org_details", default_org());
  });

  const resizeObserver = new ResizeObserver((entries) => {
    for (let _ of entries) {
      const isMobile = check_if_mobile();
      setMobile(isMobile);
    }
  });

  onMount(() => {
    resizeObserver.observe(document.body);
  });

  const isMobileAndSidebarVisible = () => {
    return isMobile() && urlParams.sidebar == "true";
  };

  createEffect(() => {
    setPath(location.pathname);
  });

  function matchPath(path: string) {
    return location.pathname === path || location.pathname.includes(path);
  }

  return (
    // JSX code for your component's UI goes here
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
        class={`text-white z-40 w-80 flex-shrink-0 h-screen transform: -translate-x-full sm:translate-x-0 transition-transform duration-200
          ${isMobile() ? "fixed bg-primary-900" : ""}
          ${isMobileAndSidebarVisible() ? "transform: translate-x-0" : ""}`}
        aria-label="Sidebar"
      >
        <div class=" pb-4 overflow-y-auto bg-primary-900/10 h-full">
          <div class="p-3 text-md font-bold text-secondary">
            <Show
              when={!orgList.loading}
              fallback={
                <div class="flex gap-3 pt-1 flex-col">
                  <Skeleton height={20} radius={6} />
                  <Skeleton height={34} radius={6} />
                </div>
              }
            >
              <Show when={orgList()?.isOk()}>
                <div class="mb-2 flex items-center gap-2">
                  <div class="w-5 h-5">
                    <Org />
                  </div>
                  Organization
                </div>
                <Select
                  modal={true}
                  optionValue="value"
                  optionTextValue="label"
                  optionDisabled="disabled"
                  defaultValue={default_org()}
                  value={value()}
                  options={org_details()}
                  onChange={(o) => {
                    console.log("changed", o);
                    setValue(o);
                    navigate(
                      location.pathname.replace(
                        /\/app\/[^/]+/,
                        `/app/${o.value}`,
                      ),
                    );
                  }}
                  placeholder={
                    <div class="flex items-center">
                      <span class="ms-2">Organization</span>
                    </div>
                  }
                  itemComponent={(props) => (
                    <SelectItem item={props.item}>
                      {props.item.rawValue.label}
                    </SelectItem>
                  )}
                >
                  <SelectTrigger aria-label="Organization">
                    <SelectValue<string>>
                      {(state) => state.selectedOption().label}
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
                href={`/app/${org_id()}/collection`}
                class={`flex items-center p-3    hover:bg-secondary hover:text-secondary-foreground    group ${
                  matchPath("/collection")
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
                href={`/app/${org_id()}/article`}
                class={`flex items-center p-3    hover:bg-secondary hover:text-secondary-foreground    group ${
                  matchPath("/article")
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
                href={`/app/${org_id()}/media`}
                class={` flex items-center p-3    hover:bg-secondary hover:text-secondary-foreground    group ${
                  matchPath("/media")
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
