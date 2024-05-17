import { get_first_org_id, is_logged_in } from "@lib/utils";
import { A, useParams } from "@solidjs/router";

import { Component } from "solid-js";
import AccountDropdown from "~/components/bare/common/AccountDropdown";
import { Footer } from "~/components/bare/common/Footer";
import Nav from "~/components/bare/common/Nav";

export const route = {};

const Public: Component = (props) => {
  const params = useParams();

  const org_id = params.org_id ?? get_first_org_id();

  const isLogged = is_logged_in();
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
            <A href={`/app/${org_id}`} class="text-white">
              Go to App
            </A>
          </div>
          <AccountDropdown />
        </Show>
      </Nav>

      {props.children}
      <Footer />
    </div>
  );
};

export default Public;
