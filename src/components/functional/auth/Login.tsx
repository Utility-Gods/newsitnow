import { LoginForm, LoginSchema } from "@lib/schema/forms/login";
import { user_login } from "@lib/service/auth";
import { createForm, valiForm } from "@modular-forms/solid";
import { Component, createSignal, Show } from "solid-js";
import PageSpinner from "~/components/bare/PageSpinner";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { showToast } from "~/components/ui/toast";

const Login: Component = () => {
  const [, { Form, Field, FieldArray }] = createForm<LoginForm>({
    validate: valiForm(LoginSchema),
  });

  const [loading, setLoading] = createSignal(false);

  const handleSubmit = async (values: LoginForm, event: Event) => {
    setLoading(true);

    event.preventDefault();
    try {
      const result = await user_login(values.email, values.password);

      if (result.isErr()) {
        throw result.error;
      }
      showToast({
        variant: "success",
        title: "Login Successful",
        description: "Welcome back",
      });
      console.log(result.value);
      localStorage.setItem("user", JSON.stringify(result.value));
    } catch (error) {
      console.error(error);
      showToast({
        variant: "error",
        title: "Error",
        description: error as string,
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
            <h1 class="text-3xl font-black  gap-1 flex leading-10">
              <span class="text-text">ORANGE</span>
              <span class="text-primary">GAS</span>
            </h1>
          </CardTitle>
          <CardDescription>
            <div class="text-sm text-muted-foreground">
              Login to your account
            </div>
          </CardDescription>
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
            <div>
              New to Orange Gas?{" "}
              <a class="underline underline-offset-2" href="/auth/register">
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
