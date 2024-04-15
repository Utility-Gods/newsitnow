import { verify_email } from "@lib/service/auth";
import { useNavigate } from "@solidjs/router";
import {
  Component,
  createEffect,
  createReaction,
  createResource,
  Show,
} from "solid-js";

const Verify: Component = (props) => {
  const token = props.params.token;

  const navigate = useNavigate();

  const [verifyEmail] = createResource(token, verify_email);

  createEffect(() => {
    if (!token) {
      navigate("/auth/login", { replace: true });
    }
  });

  return (
    <>
      <Show when={verifyEmail.loading}>
        <div>Loading...</div>
      </Show>
      <Show when={verifyEmail.error}>
        <div>Error verifying email</div>
      </Show>
      <Show when={verifyEmail()}>
        <div>Email verified</div>
      </Show>
    </>
  );
};

export default Verify;
