import { is_logged_in } from "@lib/utils";
import { useNavigate } from "@solidjs/router";
import { Component } from "solid-js";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";

const Home: Component = () => {
  const navigate = useNavigate();

  const isLogged = is_logged_in();

  console.log({ isLogged });

  return (
    <div class="flex gap-4 flex-col p-3 overflow-auto h-full sm:w-[80%] md:[w-69%] w-full mx-auto">
      <div class="w-full justify-between items-center gap-3 flex py-12 sm:flex-row flex-col">
        <div class="flex flex-col gap-3 items-center">
          <h1 class="text-4xl font-bold text-primary text-center">
            Orange Gas
          </h1>
          <p class="text-lg text-muted-foreground text-center sm:w-[69%]">
            Orange Gas is a general purpose CMS to empower the way you create
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
          <img src="/images/12.png" alt="hero" class="w-full" />
        </div>
      </div>
      <Separator />
      <div class="flex items-center justify-center py-12 flex-col gap-3">
        <div class="text-bold text-secondary text-3xl text-center">
          It is time to change the way you create and manage your content.
        </div>
        <div>
          <img src="/images/14.png" alt="hero" class="w-full" />
        </div>
      </div>
      <Separator />
      <div class="flex items-center justify-center py-12 gap-3 flex-col sm:flex-row">
        <div class="flex sm:w-1/2 items-center flex-col gap-3">
          <div class="text-bold text-secondary text-3xl text-center">
            Create your content
          </div>
          <div class="text-md text-muted-foreground text-center sm:w-[50%] w-full">
            You can create collection of articles, blogs, or any kind of rich
            text content, with ease.
          </div>
        </div>
        <div class="sm:w-1/2">
          <img src="/images/15.png" alt="hero" class="w-full" />
        </div>
      </div>

      <div class="flex items-center justify-center py-12 gap-3 flex-col sm:flex-row">
        <div>
          <img src="/images/4.png" alt="hero" class="w-full" />
        </div>
        <div class="flex items-center flex-col gap-3">
          <div class="text-bold text-secondary text-3xl text-center">
            And Share it with the world
          </div>
          <div class="text-md text-muted-foreground text-center sm:w-[50%]">
            and let it do the rest. Once it is set up you can focus on creating
            content, just like that.
          </div>
        </div>
      </div>
      <Separator />
      <div class="flex items-center justify-center py-12 gap-3">
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
  );
};

export default Home;
