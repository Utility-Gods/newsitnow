import Cat from "@lib/icons/Cat";
import { Component } from "solid-js";

type EmptyProps = {
  message?: string;
};

const Empty: Component = (props: EmptyProps) => {
  return (
    <div class="w-full h-full flex-col text-muted-foreground flex items-center justify-center">
      <div class="text-2xl p-6">{props.message ?? "Nothing to show"}</div>
      <div class="w-20 h-20">
        <Cat />
      </div>
    </div>
  );
};

export default Empty;
