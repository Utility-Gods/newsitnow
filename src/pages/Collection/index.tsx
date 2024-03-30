import { Component } from "solid-js";
import { Button } from "~/components/ui/button";

import PlusIcon from "@lib/icons/plus.svg";
const Collection: Component = () => {
  return (
    <div class="flex flex-col flex-1">
      <div class="flex justify-between items-center w-full">
        <div class="text-2xl font-semibold leading-10">Collections</div>

        <Button class="font-bold text-base text-white" size="lg">
          Create Collection
        </Button>
      </div>
    </div>
  );
};

export default Collection;
