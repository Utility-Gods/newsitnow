import { Component } from "solid-js";
import CalloutJoin from "~/components/bare/common/CalloutJoin";
import SideBar from "~/components/bare/home/Sidebar";

const BlogLayout: Component = (props) => {
  return (
    <div class="w-full gap-3 flex overflow-hidden">
      <SideBar />
      <div class="flex flex-1 w-full">
        <div class="flex gap-4 flex-col p-3 overflow-auto h-full  w-full mx-auto">
          {props.children}
          <CalloutJoin />
        </div>
      </div>
    </div>
  );
};

export default BlogLayout;
