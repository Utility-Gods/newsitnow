import Nav from "@components/bare/Nav";
import SideBar from "@components/bare/SideBar";
import { check_token_validity } from "@lib/utils";
import { useNavigate } from "@solidjs/router";
import { Component, createEffect } from "solid-js";
import { showToast } from "./ui/toast";

const Layout: Component = (props) => {
  const navigate = useNavigate();
  const user = sessionStorage.getItem("user");

  const isTokenValid = check_token_validity();

  // if (!isTokenValid) {
  //   showToast({
  //     title: "Session expired, please login again",
  //     variant: "error",
  //     duration: 5000,
  //   });
  //   navigate("/auth/login", { replace: true });
  // }

  createEffect(() => {
    console.log(user);
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
