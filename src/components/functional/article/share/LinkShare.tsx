import { get_user_id } from "@lib/utils";
import { generateArticleShareLink } from "@lib/utils/article";
import { A } from "@solidjs/router";
import { createSignal } from "solid-js";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import { showToast } from "~/components/ui/toast";

interface LinkShareProps {
  // add props here
  articleId: string;
}

function LinkShare(props: LinkShareProps) {
  const embedCode = () =>
    generateArticleShareLink(props.articleId, get_user_id());
  const [isPubliclyAccesible, setIsPubliclyAccesible] = createSignal(true);

  function copyCodeSnippet() {
    console.log("Copying code to clipboard");
    const toCopy = generateArticleShareLink(props.articleId, get_user_id());

    navigator.clipboard
      .writeText(toCopy as string)
      .then(() => {
        console.log("Code copied to clipboard successfully");
        showToast({
          variant: "success",
          title: "Success",
          description: "Code copied to clipboard successfully",
        });
      })
      .catch((error) => {
        console.error("Failed to copy code to clipboard:", error);
        showToast({
          variant: "error",
          title: "Failed to copy code",
          description: "An error occurred while copying the code to clipboard",
        });
      });
  }
  return (
    <div class="flex flex-col gap-2">
      <pre class="border-2 p-3 bg-muted  code-block text-muted-foreground">
        {embedCode()}
      </pre>
      <div class="flex gap-1 items-center">
        <Checkbox
          id="terms1"
          defaultChecked={isPubliclyAccesible()}
          onChange={(e) => {
            console.log(e);
            setIsPubliclyAccesible(e);
          }}
        />
        <div class="grid gap-1.5 leading-none text-sm">
          <Label for="terms1-input" class="text-muted-foreground">
            Publicly accessible article
            <A
              href="/documentation/collection"
              class="text-primary ml-1 text-sm"
            >
              Learn more
            </A>
          </Label>
        </div>
      </div>

      <Button disabled={!isPubliclyAccesible()} onClick={copyCodeSnippet}>
        Copy
      </Button>
    </div>
  );
}

export default LinkShare;
