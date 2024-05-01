import { get_user } from "@lib/utils";
import { useNavigate } from "@solidjs/router";
import { Show } from "solid-js";
import { Component } from "solid-js";
import { Button } from "~/components/ui/button";

const Home: Component = () => {
  const user = get_user();
  const navigate = useNavigate();

  const isLogged = user ? true : false;

  console.log({ isLogged });

  return (
    <div class="flex flex-col flex-1 flex-grow overflow-hidden p-3 ">
      <div class="flex justify-between items-center p-3  ">
        <div class="text-2xl font-bold text-primary leading-10">Home</div>
        <Show
          when={isLogged}
          fallback={
            <Button
              class="font-bold text-base"
              onClick={() => {
                navigate("/auth/login");
              }}
              variant={"secondary"}
              size="lg"
            >
              Login
            </Button>
          }
        >
          <Button
            class="font-bold text-base"
            onClick={() => {
              navigate("/app");
            }}
            variant={"secondary"}
            size="lg"
          >
            Go to App
          </Button>
        </Show>
      </div>
      <div class="flex gap-4 flex-col p-3 overflow-auto h-full ">
        Coming soon...
      </div>
    </div>
  );
};

export default Home;
