import { type Component } from "solid-js";
import ArrowDown from "@lib/icons/ArrowDown";
import Avatar from "@lib/icons/Avatar";
import Gear from "@lib/icons/Gear";
import Org from "@lib/icons/Org";
import Out from "@lib/icons/Out";

import Plan from "@lib/icons/Plan";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useNavigate, useParams } from "@solidjs/router";
import { get_first_org_id, get_user_name } from "@lib/utils";

const AccountDropdown: Component = () => {
  const navigate = useNavigate();
  const params = useParams();
  const org_id = params.org_id ?? get_first_org_id();

  const name = () => get_user_name();

  function handleLogOut() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/auth/login", { replace: true });
  }

  return (
    <div class="flex p-3 items-center">
      <DropdownMenu>
        <DropdownMenuTrigger class="flex items-center gap-2 font-semibold text-md text-primary">
          <div class="w-6 h-6">
            <Avatar />
          </div>
          <div class="w-6 h-6">
            <ArrowDown />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="px-3">
          <div class="flex items-center justify-center flex-col gap-2 p-3">
            <div class="text-primary-foreground font-bold text-md">
              Hello, {name()}
            </div>
            <div class="text-primary-foreground text-sm">Free Plan</div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            class="p-3 text-primary-foreground flex items-center gap-2 text-md"
            onClick={(e) => {
              navigate(`/app/${org_id}/settings`);
            }}
          >
            <div class="w-6 h-6">
              <Gear />
            </div>
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {}}
            class="p-3 text-primary-foreground flex items-center gap-2 text-md"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/app/${org_id}/organization`);
            }}
          >
            <div class="w-6 h-6">
              <Org />
            </div>
            Organizations
          </DropdownMenuItem>

          <DropdownMenuItem
            class="p-3 text-primary-foreground focus:bg-error-foreground focus:text-error flex items-center gap-2 text-md"
            onClick={(e) => {
              e.stopPropagation();
              handleLogOut();
            }}
          >
            <div class="w-6 h-6">
              <Out />
            </div>
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AccountDropdown;
