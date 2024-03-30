import { A, useLocation } from "@solidjs/router";
import { Component } from "solid-js";

export const Nav: Component = () => {
  const location = useLocation();

  console.log({ location });

  return (
    <header class="bg-red-500 py-4">
      <nav class="container mx-auto flex items-center justify-between px-4">
        <h1 class="text-2xl font-bold text-white">NewItNow</h1>
        <ul class="flex space-x-4">
          <li>
            <A
              href="/"
              class={` text-xl font-semibold hover:text-white ${
                location.pathname === "/" ? "text-white" : "text-black"
              }`}
            >
              Home
            </A>
          </li>
          <li>
            <A
              href="/article"
              class={` text-xl font-semibold hover:text-white ${
                location.pathname === "/article" ? "text-white" : "text-black"
              }`}
            >
              Articles
            </A>
          </li>
          <li>
            <A
              href="/collection"
              class={` text-xl font-semibold hover:text-white ${
                location.pathname === "/collection"
                  ? "text-white"
                  : "text-black"
              }`}
            >
              Collections
            </A>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
