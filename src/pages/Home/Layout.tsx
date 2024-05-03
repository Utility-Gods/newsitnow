import { get_user } from "@lib/utils";
import { A } from "@solidjs/router";
import { Show } from "solid-js";
import { Component } from "solid-js";

import { Footer } from "@components/bare/common/Footer";
import Nav from "@components/bare/common/Nav";

const Layout: Component = (props) => {
  const user = get_user();

  const isLogged = user ? true : false;

  return (
    <div class="flex flex-col flex-1 flex-grow">
      <Nav>
        <Show
          when={isLogged}
          fallback={
            <A href="/auth/login" class="text-white">
              Login
            </A>
          }
        >
          <div>
            <A href="/app" class="text-white">
              Go to App
            </A>
          </div>
        </Show>
      </Nav>

      {props.children}
      <Footer />
    </div>
  );
};

export default Layout;
