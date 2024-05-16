import { useNavigate, useParams, useSearchParams } from "@solidjs/router";
import { Component } from "solid-js";

const AppHome: Component = (props) => {
  const navigate = useNavigate();

  console.log({ props });

  navigate(`/app/${props.params.orgId}/collection`);

  return <div></div>;
};

export default AppHome;
