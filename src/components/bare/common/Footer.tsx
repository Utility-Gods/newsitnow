import { Component } from "solid-js";

export const Footer: Component = () => {
  return (
    <div class="flex items-center justify-center gap-2 p-3 font-semibold text-center text-gray-300 bg-secondary">
      <div class="w-full max-w-screen-xl p-4 py-6 mx-auto lg:py-8">
        <div class="md:flex md:justify-between">
          <div class="mb-6 md:mb-0">
            Made By{" "}
            <a
              target="_blank"
              class="text-red-500 underline underline-offset-2"
              href="https://utilitygods.com"
            >
              Utility Gods
            </a>
          </div>
          <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 class="mb-6 text-sm font-semibold text-gray-400 uppercase ">
                Other Resources
              </h2>
              <ul class="font-medium text-gray-500 flex gap-3 flex-col">
                <li>
                  <a
                    href="https://utilitygods.com/"
                    target="_blank"
                    class="hover:underline"
                  >
                    Utility Gods
                  </a>
                </li>
                <li class="">
                  <a
                    href="https://captionitnow.com/"
                    target="_blank"
                    class="hover:underline"
                  >
                    CaptionItNow
                  </a>
                </li>
                <li>
                  <a
                    href="https://docugods.com/"
                    target="_blank"
                    class="hover:underline"
                  >
                    Document Helper{" "}
                  </a>
                </li>
                <li>
                  <a
                    href="https://qrgods.com/"
                    target="_blank"
                    class="hover:underline"
                  >
                    QR Generator
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 class="mb-6 text-sm font-semibold text-gray-400 uppercase">
                Follow us
              </h2>
              <ul class="font-medium text-gray-500 dark:text-gray-400">
                <li class="mb-4">
                  <a
                    href="https://github.com/Utility-Gods"
                    target="_blank"
                    class="hover:underline "
                  >
                    Github
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 class="mb-6 text-sm font-semibold text-gray-400 uppercase ">
                Legal
              </h2>
              <ul class="font-medium text-gray-500 ">
                <li class="mb-4">
                  <a href="/legal/privacy" class="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/legal/terms" class="hover:underline">
                    Terms &amp; Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <div class="sm:flex sm:items-center sm:justify-between">
          <span class="text-sm text-gray-500 sm:text-center ">
            © 2024{" "}
            <a href="https://orangegas.co/" class="hover:underline">
              OrangeGas™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </div>
    </div>
  );
};
