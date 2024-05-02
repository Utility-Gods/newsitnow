import Cat from "@lib/icons/Cat";
import { Component } from "solid-js";

type EmptyProps = {
  message?: string;
};

const Empty: Component = (props: EmptyProps) => {
  return (
    <div class="w-full h-full flex-col text-primary flex items-center justify-center">
      <div class="w-48 h-48 font-thin animate-bounce">
        <Cat />
      </div>
      <div class="text-2xl">{props.message ?? "Nothing to show"}</div>
    </div>
  );
};

export default Empty;
