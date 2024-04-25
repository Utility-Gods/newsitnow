import Nav from "@components/bare/Nav";
import SideBar from "@components/bare/SideBar";
import { useNavigate } from "@solidjs/router";
import { Component, createEffect } from "solid-js";

const Layout: Component = (props) => {
  const navigate = useNavigate();
  const user = sessionStorage.getItem("user");

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
