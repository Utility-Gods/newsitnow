import {
  InvitationJoinForm,
  InvitationJoinSchema,
} from "@lib/schema/forms/invitation_join";

import {
  fetch_invitation_by_id,
  verify_invitation,
} from "@lib/service/invitation";
import { createForm, valiForm } from "@modular-forms/solid";
import { A, useNavigate, useParams, useSearchParams } from "@solidjs/router";
import {
  Component,
  Show,
  createEffect,
  createResource,
  createSignal,
} from "solid-js";
import PageSpinner from "~/components/bare/common/PageSpinner";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { showToast } from "~/components/ui/toast";

const Invitation: Component = () => {
  const navigate = useNavigate();

  const [urlParams, _] = useSearchParams();
  const params = useParams();

  const invitation_id = params.id;
  const confirmation_token = urlParams.confirmation_token;

  if (!invitation_id) {
    return <div>Invalid Invitation</div>;
  }

  const [invitation] = createResource(invitation_id, fetch_invitation_by_id);

  const invitation_details = () => {
    if (invitation()?.isOk()) {
      return invitation().value?.data?.attributes;
    }
    return null;
  };
  const [, { Form, Field }] = createForm<InvitationJoinForm>({
    validate: valiForm(InvitationJoinSchema),
  });

  const [loading, setLoading] = createSignal(false);

  createEffect(() => {
    console.log({ Form });
  });

  const handleSubmit = async (values, event: Event) => {
    setLoading(true);

    // check if the password and confirm password match

    event.preventDefault();
    try {
      const result = await verify_invitation({
        invitation_id: invitation_id,
        confirmation_token: confirmation_token,
        email: invitation_details().email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      });

      if (result.isErr()) {
        throw result.error;
      }

      showToast({
        variant: "success",
        title: "Account Created",
        description: "Please check your organizations to access the content.",
      });

      if (result?.value) {
        const user = result.value;
        localStorage.setItem("token", user.jwt);
        localStorage.setItem("user", JSON.stringify(user.user));

        if (user.user.organizations.length === 0) {
          return navigate("/", {
            replace: true,
          });
        }

        return navigate(
          "/app/" +
            user.user.organizations.sort((a, b) => {
              return (
                new Date(a.created_on).getTime() -
                new Date(b.created_on).getTime()
              );
            })[0]?.id,
          {
            replace: true,
          },
        );
      }
    } catch (e) {
      console.log({ e }, "-=--------");
      showToast({
        variant: "error",
        title: e.message ?? "Failed to create organization",
        duration: 5000,
        description:
          e?.details?.message ??
          "An error occurred while creating the organization",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="flex items-center justify-center h-full w-full">
      <Show when={!invitation.loading}>
        <Show when={invitation().isOk() && invitation_details()}>
          <Card class="w-full sm:w-[540px] bg-background shadow-md">
            <CardHeader>
              <CardTitle>
                <div class="flex items-center justify-between">
                  <div class="text-3xl font-bold">Invitation</div>

                  <div class="text-3xl font-black flex flex-col items-end justify-between">
                    <A href="/">
                      <span class="text-text">ORANGE</span>
                      <span class="text-primary">GAS</span>
                    </A>{" "}
                    <div class="text-md text-muted-foreground">
                      Own your content.
                    </div>
                  </div>
                </div>
                <div class="flex flex-col gap-2 my-3">
                  <div class="text-md text-muted-foreground">
                    You have been invited to join the organization{" "}
                    <span class="text-primary font-semibold">
                      {invitation_details().organization.data.attributes.name ??
                        "Orange Gas"}
                    </span>{" "}
                    by{" "}
                    <span class="text-primary font-semibold">
                      {invitation_details().invited_by.data.attributes.email}
                    </span>
                    . Once you join, you will be able to access the
                    organization's resources.
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <Form onSubmit={handleSubmit}>
              <CardContent>
                <div class="grid gap-4 py-4">
                  <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="name" class="text-right">
                      Email
                    </Label>
                    <div class="">{invitation_details().email}</div>
                  </div>
                  <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="content" class="text-right">
                      Password
                    </Label>
                    <Field name="password">
                      {(field, props) => (
                        <div class="flex flex-col col-span-3 gap-1">
                          <Input
                            {...props}
                            id="password"
                            type="password"
                            area-invalid={field.error ? "true" : "false"}
                            required
                          />
                          <span class="text-secondary text-sm">
                            {field.error}
                          </span>
                        </div>
                      )}
                    </Field>
                  </div>
                  <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="content" class="text-right">
                      Confirm Password
                    </Label>
                    <Field name="confirmPassword">
                      {(field, props) => (
                        <div class="flex flex-col col-span-3 gap-1">
                          <Input
                            {...props}
                            type="password"
                            id="confirmPassword"
                            area-invalid={field.error ? "true" : "false"}
                            required
                          />
                          <span class="text-secondary text-sm">
                            {field.error}
                          </span>
                        </div>
                      )}
                    </Field>
                  </div>
                </div>
              </CardContent>
              <CardFooter class="justify-end gap-3 flex">
                <div class="flex gap-1">
                  <div>Already have an account? </div>
                  <a
                    class="underline underline-offset-2 hover:text-primary"
                    href="/auth/login"
                  >
                    Login
                  </a>
                </div>
                <Button type="submit">Accept Invitation</Button>
              </CardFooter>
            </Form>
          </Card>
        </Show>
        <Show when={invitation().isErr()}>
          <div class="text-center text-error-foreground text-xl flex flex-col gap-3">
            Error loading invitation
            <Button
              variant={"outline"}
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
            <Button
              variant={"link"}
              onClick={() => {
                window.location.href = "/";
              }}
            >
              Home
            </Button>
          </div>
        </Show>
      </Show>
      <Show when={loading()}>
        <PageSpinner />
      </Show>
    </div>
  );
};

export default Invitation;
