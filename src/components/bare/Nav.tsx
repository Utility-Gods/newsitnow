import { Component } from "solid-js";

import { BadgeDelta } from "../ui/badge-delta";

export const Nav: Component = () => {
  return (
    <header class="bg-secondary py-4 px-6">
      <nav class="mx-auto flex items-center justify-between">
        <div class="text-3xl font-black flex items-baseline gap-2 justify-between">
          <div class="">
            <span class="text-text-inverted">ORANGE</span>
            <span class="text-primary">GAS</span>
          </div>
          <div class="text-md text-muted">Own your content.</div>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
