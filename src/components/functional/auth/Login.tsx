import { Component } from "solid-js";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
const Login: Component = () => {
  return (
    <div class="flex items-center justify-center h-full w-full">
      <Card>
        <CardHeader>
          <CardTitle class="text-primary">Login</CardTitle>
          <CardDescription>Login to start using Orange Gas</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
