import { Component } from "solid-js";
import BreadCrumb from "~/components/bare/common/BreadCrumb";

const Media: Component = () => {
  return (
    <div class="flex flex-col flex-1 flex-grow overflow-hidden p-3 ">
      <BreadCrumb
        crumbs={[
          { href: "/app", label: "Home" },
          { href: "/app/media", label: "Media" },
        ]}
      />
      <div class="p-3 ">
        <div class="text-2xl font-bold text-primary leading-10">Media</div>
      </div>
    </div>
  );
};

export default Media;
