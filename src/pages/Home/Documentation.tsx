import { Component } from "solid-js";
import SideBar from "~/components/bare/home/Sidebar";

const Documentation: Component = () => {
  return (
    <div class="w-full gap-3 flex overflow-hidden">
      <SideBar />
      <div class="flex flex-1 w-full">
        <div class="flex gap-4 flex-col p-3 overflow-auto h-full sm:w-[80%] md:[w-69%] w-full mx-auto">
          <h1>Documentation</h1>
          <p>This is the documentation page. It is a work in progress.</p>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
