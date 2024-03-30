import { Component } from "solid-js";
import { Badge } from "../ui/badge";

export const Nav: Component = () => {
  return (
    <header class="bg-red py-4 px-6">
      <nav class="mx-auto flex items-center justify-between px-4">
        <h1 class="text-3xl font-black text-white flex leading-10">
          <span>Space</span>
          <span class="text-primary">Fold</span>
        </h1>
        <Badge class="bg-white text-md font-semibold" variant="outline">
          Beta Version
        </Badge>
      </nav>
    </header>
  );
};

export default Nav;
