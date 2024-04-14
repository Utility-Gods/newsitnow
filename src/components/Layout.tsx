import Nav from "@components/bare/Nav";
import SideBar from "@components/bare/SideBar";
import { Component } from "solid-js";

const Layout: Component = (props) => (
  <div class="flex flex-col w-full h-full">
    <Nav />
    <div class="w-full gap-3 flex overflow-hidden">
      <SideBar />
      <div class="flex flex-1 w-full">{props.children}</div>
    </div>
  </div>
);

export default Layout;
