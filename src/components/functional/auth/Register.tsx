import { RegisterForm, RegisterSchema } from "@lib/schema/forms/register";
import { user_register } from "@lib/service/auth";
import { createForm, valiForm } from "@modular-forms/solid";
import { Component, Show, createSignal } from "solid-js";
import PageSpinner from "~/components/bare/common/PageSkeleton";
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

const Register: Component = () => {
  const [, { Form, Field, FieldArray }] = createForm<RegisterForm>({
    validate: valiForm(RegisterSchema),
  });

  const [loading, setLoading] = createSignal(false);

  const handleSubmit = async (values: RegisterForm, event: Event) => {
    setLoading(true);

    console.log(values);
    event.preventDefault();
    try {
      const result = await user_register(
        values.email,
        values.password,
        values.confirmPassword,
      );

      if (result.isErr()) {
        throw result.error;
      }

      showToast({
        variant: "success",
        title: "Registeration Successful",
        description: "Please check your email to verify your account.",
      });
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
            <div class="flex items-start justify-between">
              <div class="text-3xl font-bold">Register</div>
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
                      <span class="text-secondary text-sm">{field.error}</span>
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
            <Button type="submit" variant="secondary">
              Register
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

export default Register;
