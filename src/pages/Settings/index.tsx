import { Component } from "solid-js";
import BreadCrumb from "~/components/bare/common/BreadCrumb";

const Settings: Component = () => {
  return (
    <div class="flex flex-col flex-1 flex-grow overflow-hidden p-3 ">
      <BreadCrumb
        crumbs={[
          { href: "/app", label: "Home" },
          { href: "/app/Settings", label: "settings" },
        ]}
      />
      <div class="p-3 ">
        <div class="text-2xl font-bold text-primary leading-10">Settings</div>
      </div>
    </div>
  );
};

export default Settings;
