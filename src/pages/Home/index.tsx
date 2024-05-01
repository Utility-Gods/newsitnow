import { get_user } from "@lib/utils";
import { useNavigate } from "@solidjs/router";
import { Show } from "solid-js";
import { Component } from "solid-js";
import { Footer } from "~/components/bare/Footer";
import Nav from "~/components/bare/Nav";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";

const Home: Component = () => {
  const user = get_user();
  const navigate = useNavigate();

  const isLogged = user ? true : false;

  console.log({ isLogged });

  return (
    <div class="flex flex-col flex-1 flex-grow">
      <Nav>
        <Show
          when={isLogged}
          fallback={
            <Button
              class="font-bold text-base"
              onClick={() => {
                navigate("/auth/login");
              }}
              variant={"secondary"}
              size="lg"
            >
              Login
            </Button>
          }
        >
          <Button
            class="font-bold text-base"
            onClick={() => {
              navigate("/app");
            }}
            variant={"secondary"}
            size="lg"
          >
            Go to App
          </Button>
        </Show>
      </Nav>

      <div class="flex gap-4 flex-col p-3 overflow-auto h-full sm:w-[80%] md:[w-69%] w-full mx-auto">
        <div class="w-full justify-between items-center gap-3 flex p-12">
          <div class="flex flex-col gap-3 items-center">
            <h1 class="text-4xl font-bold text-primary">
              Welcome to Orange Gas
            </h1>
            <p class="text-lg text-muted-foreground text-center">
              Orange Gas is a general purpose CMS to empower the way you create
              and manage your content.
            </p>
            <Button
              class="font-bold text-base"
              onClick={() => {
                navigate("/auth/register");
              }}
              size="lg"
            >
              Get Started
            </Button>
          </div>
          <div class="relative overflow-hidden shadow-lg">
            <img src="images/12.png" alt="hero" class="w-full" />
          </div>
        </div>
        <Separator />
        <div class="flex items-center justify-center p-12 flex-col gap-3">
          <div class="text-bold text-secondary text-3xl">
            It is time to change the way you create and manage your content.
          </div>
          <div>
            <img src="images/3.png" alt="hero" class="w-full" />
          </div>
        </div>
        <Separator />
        <div class="flex items-center justify-center p-12 gap-3">
          <div class="flex items-center flex-col gap-3">
            <div class="text-bold text-secondary text-3xl text-center">
              Just configure it one time.
            </div>
            <div class="text-md text-muted-foreground text-center w-[50%]">
              and let it do the rest. Once it is set up you can focus on
              creating content, just like that.
            </div>
          </div>
          <div>
            <img src="images/4.png" alt="hero" class="w-full" />
          </div>
        </div>
        <Separator />
        <div class="flex items-center justify-center p-12 gap-3">
          <div class="flex items-center flex-col gap-3">
            <div class="text-bold text-secondary text-3xl text-center">
              It is free for now.
            </div>
            <div class="text-md text-muted-foreground text-center w-[50%]">
              We are really busy working on the product, so we are not charging
              until it starts charging us back.
            </div>
            <Button
              class="font-bold text-base"
              onClick={() => {
                window.location.href = "https://utilitygods.com";
              }}
              size="lg"
            >
              Get in touch
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
