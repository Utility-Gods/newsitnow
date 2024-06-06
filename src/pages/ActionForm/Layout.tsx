import { get_first_org_id, is_logged_in } from "@lib/utils";
import { A, useParams } from "@solidjs/router";
import { Show } from "solid-js";
import { Component } from "solid-js";

import { Footer } from "@components/bare/common/Footer";
import Nav from "@components/bare/common/Nav";
import AccountDropdown from "~/components/bare/common/AccountDropdown";

const ActionFormLayout: Component = (props) => {
  const params = useParams();

  const org_id = params.org_id ?? get_first_org_id();

  const isLogged = is_logged_in();

  return (
    <div class="flex flex-1 h-full w-full flex-col">
      <div class="flex flex-col flex-1 flex-grow items-center justify-center">
        {props.children}
        {/* <Footer /> */}
      </div>
      <div class="text-center text-muted-foreground">
        {" "}
        Powered by{" "}
        <a href="https://orangegas.co" class="text-primary">
          OrangeGas
        </a>{" "}
      </div>
    </div>
  );
};

export default ActionFormLayout;
