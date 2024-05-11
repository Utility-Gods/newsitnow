import { Component } from "solid-js";

import { A } from "@solidjs/router";

export const Nav: Component = (props) => {
  return (
    <header class="bg-secondary py-4 px-6 flex-shrink-0">
      <nav class="mx-auto flex items-center justify-between">
        <div class="text-3xl font-black flex items-baseline gap-2 justify-between sm:flex-row flex-col">
          <A href="/">
            <div class="">
              <span class="text-text-inverted">ORANGE</span>
              <span class="text-primary">GAS</span>
            </div>
          </A>
          <div class="text-md text-muted">Own your content.</div>
        </div>
        <div class="flex gap-6 items-center">
          <div>
            <A href="/documentation" class="text-primary">
              Documentation
            </A>
          </div>
          <div>
            <A href="/blog" class="text-primary">
              Blog
            </A>
          </div>
          {props.children}
        </div>
      </nav>
    </header>
  );
};

export default Nav;
