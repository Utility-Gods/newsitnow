import { Component } from "solid-js";

import { BadgeDelta } from "../ui/badge-delta";

export const Nav: Component = () => {
  return (
    <header class="bg-secondary py-4 px-6">
      <nav class="mx-auto flex items-center justify-between px-4">
        <h1 class="text-3xl font-black text-white gap-1 flex leading-10">
          <span>ORANGE</span>
          <span class="text-primary">GAS</span>
        </h1>
        <BadgeDelta deltaType="unchanged">Beta Version</BadgeDelta>
      </nav>
    </header>
  );
};

export default Nav;
