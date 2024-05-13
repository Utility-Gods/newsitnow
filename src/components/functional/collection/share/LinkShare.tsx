import { get_user_id } from "@lib/utils";
import { generateCollectionShareLink } from "@lib/utils/collection";
import { A } from "@solidjs/router";
import { createSignal } from "solid-js";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import { showToast } from "~/components/ui/toast";

interface LinkShareProps {
  // add props here
  collectionId: number;
}

function LinkShare(props: LinkShareProps) {
  const embedCode = () =>
    generateCollectionShareLink(
      props.collectionId,
      get_user_id(),
      includeDrafts(),
    );

  const [includeDrafts, setIncludeDrafts] = createSignal(false);
  const [isPubliclyAccesible, setIsPubliclyAccesible] = createSignal(true);
  function copyCodeSnippet() {
    console.log("Copying code to clipboard");
    const toCopy = generateCollectionShareLink(
      props.collectionId,
      get_user_id(),
      includeDrafts(),
    );

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
      <div class="border-2 p-3 bg-muted  code-block text-muted-foreground">
        {embedCode()}
      </div>
      <div class="items-top flex flex-col py-2 gap-3 justify-between">
        <div class="flex gap-1 items-center">
          <Checkbox
            id="terms1"
            onChange={(e) => {
              console.log(e);
              setIncludeDrafts(true);
            }}
          />
          <div class="grid gap-1.5 leading-none text-sm">
            <Label for="terms1-input" class="text-muted-foreground">
              Include draft articles (not recommended)
              <A
                href="/documentation/collection"
                class="text-primary ml-1 text-sm"
              >
                Learn more
              </A>
            </Label>
          </div>
        </div>
        <div class="flex gap-1 items-center">
          <Checkbox
            id="public-input"
            defaultChecked={isPubliclyAccesible()}
            onChange={(e) => {
              console.log(e);
              setIsPubliclyAccesible(e);
            }}
          />
          <div class="grid gap-1.5 leading-none text-sm">
            <Label for="public-input" class="text-muted-foreground">
              Publicly accessible collection
              <A
                href="/documentation/collection"
                class="text-primary ml-1 text-sm"
              >
                Learn more
              </A>
            </Label>
          </div>
        </div>
        <Button
          disabled={!isPubliclyAccesible()}
          variant="outline"
          onClick={copyCodeSnippet}
        >
          Copy
        </Button>
      </div>
    </div>
  );
}

export default LinkShare;
