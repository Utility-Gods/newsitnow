import { Component } from "solid-js";
import { Badge } from "~/components/ui/badge";

export const Nav: Component = () => {
  return (
    <header class="bg-secondary py-4 px-6">
      <nav class="mx-auto flex items-center justify-between px-4">
        <h1 class="text-3xl font-black text-white gap-1 flex leading-10">
          <span class="text-primary">SPACE</span>
          <span>FOLD</span>
        </h1>
        <Badge class="bg-white  text-md font-semibold" variant="outline">
          Beta Version
        </Badge>
      </nav>
    </header>
  );
};

export default Nav;
