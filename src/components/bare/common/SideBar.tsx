import Article from "@lib/icons/Article";
import Close from "@lib/icons/Close";
import Collection from "@lib/icons/Collection";
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
                <Collection />
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
                <Article />
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
              <A
                href="plan"
                class={`flex items-center p-3    hover:bg-secondary hover:text-secondary-foreground    group ${
                  matchPath("/app/plan")
                    ? "text-secondary-foreground bg-secondary"
                    : "text-secondary"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-6 h-6"
                >
                  <path d="M5.566 4.657A4.505 4.505 0 0 1 6.75 4.5h10.5c.41 0 .806.055 1.183.157A3 3 0 0 0 15.75 3h-7.5a3 3 0 0 0-2.684 1.657ZM2.25 12a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3v-6ZM5.25 7.5c-.41 0-.806.055-1.184.157A3 3 0 0 1 6.75 6h10.5a3 3 0 0 1 2.683 1.657A4.505 4.505 0 0 0 18.75 7.5H5.25Z" />
                </svg>

                <span class="flex-1 ms-3 whitespace-nowrap">Plan</span>
              </A>
            </li>
            <li>
              <div
                onClick={() => {
                  navigate("/app/settings");
                }}
                class={`flex items-center cursor-pointer p-3 w-full  hover:bg-secondary hover:text-secondary-foreground    group ${
                  matchPath("/app/settings")
                    ? "text-secondary-foreground bg-secondary"
                    : "text-secondary"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>

                <span class="flex-1 ms-3 whitespace-nowrap">Settings</span>
              </div>
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
