import { get_user } from "@lib/utils";
import { useNavigate } from "@solidjs/router";
import { Component } from "solid-js";

const AppHome: Component = () => {
  const navigate = useNavigate();

  navigate("/app/collection");

  return <div></div>;
};

export default AppHome;
