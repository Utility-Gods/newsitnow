import { LoginForm, LoginSchema } from "@lib/schema/forms/login";
import { user_login } from "@lib/service/auth";
import { createForm, valiForm } from "@modular-forms/solid";
import { A, useNavigate, useSearchParams } from "@solidjs/router";
import { Component, createSignal, Show } from "solid-js";
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

const Login: Component = () => {
  const [, { Form, Field }] = createForm<LoginForm>({
    validate: valiForm(LoginSchema),
  });

  const [params, _] = useSearchParams();

  const confirmed_email = params.confirmed_email == "true";

  console.log({ confirmed_email, params });

  if (confirmed_email) {
    showToast({
      variant: "success",
      title: "Email Confirmed",
      description: "You can now login",
      duration: 5000,
    });
  }

  const [loading, setLoading] = createSignal(false);

  const navigate = useNavigate();

  const handleSubmit = async (values: LoginForm, event: Event) => {
    setLoading(true);

    event.preventDefault();
    try {
      const result = await user_login(values.email, values.password);

      if (result.isErr()) {
        console.log(result.error, "----------");
        throw result.error;
      }
      showToast({
        variant: "success",
        title: "Login Successful",
        description: "Welcome back",
        duration: 5000,
      });
      if (result?.value) {
        const user = result.value;
        localStorage.setItem("user", JSON.stringify(user));

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
        title: e.message ?? "Failed to login",
        duration: 5000,
        description:
          e?.details?.message ?? "An error occurred while signing in",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="flex items-center justify-center h-full w-full">
      <Card class="w-full sm:w-[540px] bg-background shadow-md">
        <CardHeader>
          <CardTitle>
            <div class="flex items-start justify-between">
              <div class="text-3xl font-bold">Login</div>
              <div class="text-3xl font-black flex flex-col items-end justify-between">
                <A href="/">
                  <span class="text-text">ORANGE</span>
                  <span class="text-primary">GAS</span>
                </A>
                <div class="text-md text-muted-foreground">
                  Own your content.
                </div>
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
                <Field name="email">
                  {(field, props) => (
                    <div class="flex flex-col col-span-3 gap-1">
                      <Input
                        {...props}
                        id="name"
                        area-invalid={field.error ? "true" : "false"}
                        required
                      />
                      {field.error && (
                        <span class="text-secondary text-sm">
                          {field.error}
                        </span>
                      )}
                    </div>
                  )}
                </Field>
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
                      <span class="text-secondary text-sm">{field.error}</span>
                    </div>
                  )}
                </Field>
              </div>
            </div>
          </CardContent>
          <CardFooter class="justify-end gap-3">
            <div class="flex gap-1">
              <div>New to Orange Gas? </div>
              <a
                class="underline underline-offset-2 hover:text-primary"
                href="/auth/register"
              >
                Register
              </a>
            </div>
            <Button type="submit">Login</Button>
          </CardFooter>
        </Form>
      </Card>
      <Show when={loading()}>
        <PageSpinner />
      </Show>
    </div>
  );
};

export default Login;
