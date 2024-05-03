import { Component } from "solid-js";
import SideBar from "~/components/bare/home/Sidebar";

const DLayout: Component = (props) => {
  return (
    <div class="w-full gap-3 flex overflow-hidden">
      <SideBar />
      <div class="flex flex-1 w-full">
        <div class="flex gap-4 flex-col p-3 overflow-auto h-full sm:w-[80%] md:[w-69%] w-full mx-auto">
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default DLayout;
