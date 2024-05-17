import { Component } from "solid-js";
import BreadCrumb from "~/components/bare/common/BreadCrumb";
import Empty from "~/components/bare/common/Empty";

const Media: Component = () => {
  return (
    <div class="flex flex-col flex-1 flex-grow overflow-hidden p-3 ">
      <BreadCrumb
        crumbs={[
          { href: "/app", label: "Home" },
          { href: "/app/media", label: "Media" },
        ]}
      />
      <div class="p-3 flex flex-col flex-1">
        <div class="text-2xl font-bold text-primary leading-10">Media</div>
        <Empty message="Work in Development, Come back later" />
      </div>
    </div>
  );
};

export default Media;
