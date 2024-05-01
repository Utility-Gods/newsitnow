import { LoginForm, LoginSchema } from "@lib/schema/forms/login";
import { user_login } from "@lib/service/auth";
import { createForm, valiForm } from "@modular-forms/solid";
import { useNavigate } from "@solidjs/router";
import { Component, createSignal, Show } from "solid-js";
import PageSpinner from "~/components/bare/PageSpinner";
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

  const [loading, setLoading] = createSignal(false);

  const navigate = useNavigate();

  const handleSubmit = async (values: LoginForm, event: Event) => {
    console.log(values);
    setLoading(true);

    event.preventDefault();
    try {
      const result = await user_login(values.email, values.password);

      console.log({ result });
      if (result.isErr()) {
        throw result.error;
      }
      showToast({
        variant: "success",
        title: "Login Successful",
        description: "Welcome back",
        duration: 5000,
      });
      console.log(result.value);
      sessionStorage.setItem("user", JSON.stringify(result.value));
      navigate("/app", { replace: true });
    } catch (error) {
      console.error(error);
      showToast({
        variant: "error",
        title: "Error",
        description: error as string,
        duration: 5000,
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
                <div class="">
                  <span class="text-text">ORANGE</span>
                  <span class="text-primary">GAS</span>
                </div>
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
            <Button type="submit" variant="secondary">
              Login
            </Button>
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
