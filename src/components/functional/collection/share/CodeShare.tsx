import {
  generateEmbedCode,
  generateEmbedCodeExposed,
} from "@lib/utils/collection";

import { A } from "@solidjs/router";
import { createResource, createSignal } from "solid-js";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import { showToast } from "~/components/ui/toast";

interface CodeShareProps {
  // add props here
  collectionId: number;
}

function CodeShare(props: CodeShareProps) {
  const [embedCode] = createResource(props.collectionId, generateEmbedCode);

  const [includeDraft, setIncludeDraft] = createSignal<boolean>(false);

  async function copyCodeSnippet() {
    console.log("Copying code to clipboard");

    const toCopy = await generateEmbedCodeExposed(
      props.collectionId,
      includeDraft(),
    );
    navigator.clipboard
      .writeText(toCopy)
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
      <div class="border-2 p-3 bg-muted  code-block text-muted-foreground allow-3-lines">
        {embedCode()}
      </div>
      <div class="items-top flex space-x-2 py-2 items-center justify-between">
        <div class="flex gap-1 items-center">
          <Checkbox
            id="terms1"
            onChange={(e) => {
              console.log(e);
              setIncludeDraft(true);
            }}
          />
          <div class="grid gap-1.5 leading-none">
            <Label for="terms1-input" class="text-muted-foreground">
              Include Draft
            </Label>
          </div>
        </div>
        <Button variant="outline" onClick={copyCodeSnippet}>
          Copy
        </Button>
      </div>

      <div class="text-muted-foreground font-semibold text-xs">
        Copy the code above and add it in your website to embed the collection.
        <A href="/documentation/collection" class="text-primary ml-1">
          Learn more
        </A>
      </div>
    </div>
  );
}

export default CodeShare;
