import { check_token_validity, get_token } from "@lib/utils";
import { useNavigate } from "@solidjs/router";
import { Component, createEffect } from "solid-js";

import SideBar from "@components/bare/common/SideBar";
import { showToast } from "@components/ui/toast";
import Nav from "~/components/bare/common/Nav";

const Layout: Component = (props) => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  const token = get_token();
  const isTokenValid = check_token_validity();

  if (!isTokenValid && token) {
    showToast({
      title: "Session expired, please login again",
      variant: "error",
      duration: 5000,
    });
    navigate("/auth/login", { replace: true });
  }

  createEffect(() => {
    if (!user) {
      navigate("/auth/login", { replace: true });
    }
  });
  return (
    <div class="flex flex-col w-full h-full">
      <Nav />
      <div class="w-full gap-3 flex overflow-hidden">
        <SideBar />
        <div class="flex flex-1 w-full">{props.children}</div>
      </div>
    </div>
  );
};

export default Layout;
