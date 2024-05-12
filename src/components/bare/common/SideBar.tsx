import Close from "@lib/icons/Close";
import Menu from "@lib/icons/Menu";
import Photo from "@lib/icons/Photo";
import { check_if_mobile } from "@lib/utils";
import { A, useLocation, useNavigate, useSearchParams } from "@solidjs/router";
import { Show } from "solid-js";
import { Component, createEffect, createSignal, onMount } from "solid-js";

const SideBar: Component = () => {
  // Implement your component logic here

  const location = useLocation();
  const navigate = useNavigate();

  const [path, setPath] = createSignal(location.pathname);

  const user = localStorage.getItem("user");

  const name = user ? JSON.parse(user)?.user?.username : "User";

  const [urlParams, setParams] = useSearchParams();

  const [isMobile, setMobile] = createSignal(check_if_mobile());

  const resizeObserver = new ResizeObserver((entries) => {
    for (let entry of entries) {
      const isMobile = check_if_mobile();
      setMobile(isMobile);
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

  function handleLogOut() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/auth/login", { replace: true });
  }

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
        <div class="h-full pb-4 overflow-y-auto bg-primary-900/10">
          <div class="p-3 text-md font-bold text-secondary truncate">
            Welcome {name}
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
            <li>
              <A
                href="article"
                class={`flex items-center p-3    hover:bg-secondary hover:text-secondary-foreground    group ${
                  matchPath("/app/article")
                    ? "text-secondary-foreground bg-secondary"
                    : "text-secondary"
                }`}
              >
                <svg
                  class="flex-shrink-0 w-5 h-5 transition duration-75  group- "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 20"
                >
                  <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                </svg>
                <span class="flex-1 ms-3 whitespace-nowrap">Articles</span>
              </A>
            </li>
            <li>
              <A
                href="article"
                class={`flex items-center p-3    hover:bg-secondary hover:text-secondary-foreground    group ${
                  matchPath("/app/media")
                    ? "text-secondary-foreground bg-secondary"
                    : "text-secondary"
                }`}
              >
                <div class="w-5 h-5">
                  <Photo />{" "}
                </div>
                <span class="flex-1 ms-3 whitespace-nowrap">Media</span>
              </A>
            </li>
            <li>
              <div
                onClick={() => handleLogOut()}
                class={`flex items-center cursor-pointer p-3 w-full  hover:bg-secondary hover:text-secondary-foreground    group ${
                  matchPath("/app/signin")
                    ? "text-secondary-foreground bg-secondary"
                    : "text-secondary"
                }`}
              >
                <svg
                  class="flex-shrink-0 w-5 h-5 transition duration-75  group- "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 16"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                  />
                </svg>
                <span class="flex-1 ms-3 whitespace-nowrap">Sign Out</span>
              </div>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};
export default SideBar;
