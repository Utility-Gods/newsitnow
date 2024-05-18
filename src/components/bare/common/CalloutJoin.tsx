import News from "@lib/icons/News";
import { A } from "@solidjs/router";
import { Button } from "~/components/ui/button";
import { Callout, CalloutContent, CalloutTitle } from "~/components/ui/callout";

export default function () {
  return (
    <Callout>
      <CalloutTitle class="flex items-center gap-2">
        <div class="w-5 h-5">
          <News />
        </div>
        Fold the Space
      </CalloutTitle>
      <CalloutContent class="flex items-start gap-6 font-semibold">
        <div class="text-justify sm:w-2/3">
          This blog was created using the OrangeGas CMS and it is really a just
          a collection of articles. You can create your own collection and add
          articles to it and share it with your website, your twitter feed or
          your really life friend who still reads blogs. The content must flow.
        </div>
        <div class="flex-shrink-0 flex gap-3 flex-1 justify-end">
          <A href="/auth/register">
            <Button class="font-bold">Start Creating</Button>
          </A>
          <A href="/documentation">
            <Button variant="link">Learn More</Button>
          </A>
        </div>
      </CalloutContent>
    </Callout>
  );
}
