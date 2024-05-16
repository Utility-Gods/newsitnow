import { check_token_validity, get_token } from "@lib/utils";
import { useNavigate, useSearchParams } from "@solidjs/router";
import { type Component, createEffect } from "solid-js";
import AccountDropdown from "@components/bare/common/AccountDropdown";
import SideBar from "@components/bare/common/SideBar";
import { showToast } from "@components/ui/toast";
import Nav from "~/components/bare/common/Nav";

const Layout: Component = (props) => {
  const [searchParams] = useSearchParams();

  const orgId = searchParams.orgId;
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  const isLogged = user ? true : false;

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
      <Nav>
        <AccountDropdown />
      </Nav>
      <div class="w-full gap-3 flex">
        <SideBar />
        <div class="flex flex-1 w-full">{props.children}</div>
      </div>
    </div>
  );
};

export default Layout;
