import { useNavigate } from "@solidjs/router";
import type { Component } from "solid-js";
import Empty from "~/components/bare/common/Empty";
import { Button } from "~/components/ui/button";

const Forms: Component = () => {
  const navigate = useNavigate();
  return (
    <div class="flex flex-col flex-1 flex-grow overflow-hidden p-3 ">
      <div class="flex justify-between items-center p-3  ">
        <div class="text-2xl font-bold text-primary leading-10">Forms</div>
        <Button
          class="font-bold text-base"
          size="lg"
          onClick={() => {
            navigate("create");
          }}
        >
          Create Form
        </Button>
      </div>
      <Empty message="Work in Development, Come back later" />
    </div>
  );
};

export default Forms;
