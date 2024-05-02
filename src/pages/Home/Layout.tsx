import { get_user } from "@lib/utils";
import { useNavigate } from "@solidjs/router";
import { Show } from "solid-js";
import { Component } from "solid-js";

import { Footer } from "@components/bare/common/Footer";
import { Button } from "@components/ui/button";
import Nav from "@components/bare/common/Nav";

const Layout: Component = (props) => {
  const user = get_user();
  const navigate = useNavigate();

  const isLogged = user ? true : false;

  console.log({ isLogged });

  return (
    <div class="flex flex-col flex-1 flex-grow">
      <Nav>
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
      </Nav>

      {props.children}
      <Footer />
    </div>
  );
};

export default Layout;
