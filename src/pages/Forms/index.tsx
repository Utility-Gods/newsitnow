import type { Component } from "solid-js";
import Empty from "~/components/bare/common/Empty";

const Forms: Component = () => {
  return (
    <div class="flex flex-col flex-1 flex-grow overflow-hidden p-3 ">
      <div class="p-3 flex flex-col flex-1">
        <div class="text-2xl font-bold text-primary leading-10">Forms</div>
        <Empty message="Work in Development, Come back later" />
      </div>
    </div>
  );
};

export default Forms;
