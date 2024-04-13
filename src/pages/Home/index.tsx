import { Component } from "solid-js";
import { Button } from "~/components/ui/button";
const Home: Component = () => {
  return (
    <div class="flex flex-col flex-1 flex-grow overflow-hidden">
      <div class="flex justify-between items-center p-6 ">
        <div class="text-2xl font-bold text-primary leading-10">Dashboard</div>

        <Button class="font-bold text-base" variant={"secondary"} size="lg">
          Create Dashboard
        </Button>
      </div>
    </div>
  );
};

export default Home;
