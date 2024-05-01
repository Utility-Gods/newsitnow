import { useNavigate } from "@solidjs/router";
import { Component } from "solid-js";

const Home: Component = () => {
  // currently we just reroute this page to collections

  const navigate = useNavigate();

  navigate("/collection", {
    replace: true,
  });
  return (
    <div class="flex flex-col flex-1 flex-grow overflow-hidden p-3 ">
      <div class="flex justify-between items-center p-3  ">
        <div class="text-2xl font-bold text-primary leading-10">Home</div>

        {/* <Button class="font-bold text-base" variant={"secondary"} size="lg">
          Welcome to Orange Gas
        </Button> */}
      </div>
      <div class="flex gap-4 flex-col p-3 overflow-auto h-full ">
        Coming soon...
      </div>
    </div>
  );
};

export default Home;
