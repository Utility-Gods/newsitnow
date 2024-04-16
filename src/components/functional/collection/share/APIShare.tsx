import {
  generateEmbedCode,
  generateRestAPICode,
  generateRestAPICodeExposed,
} from "@lib/utils/collection";
import { createResource } from "solid-js";
import { Button } from "~/components/ui/button";
import { showToast } from "~/components/ui/toast";

interface APIShareProps {
  // add props here
  collectionId: number;
}

function APIShare(props: APIShareProps) {
  const [embedCode] = createResource(props.collectionId, generateRestAPICode);

  async function copyCodeSnippet() {
    console.log("Copying code to clipboard");
    const toCopy = await generateRestAPICodeExposed(props.collectionId);

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

      <Button variant="outline" onClick={copyCodeSnippet}>
        Copy
      </Button>
      <div class="text-muted-foreground font-semibold text-xs">
        Follow the above steps to add the collection to your app.
        <a href="#" class="text-primary ml-1">
          Learn more
        </a>
      </div>
    </div>
  );
}

export default APIShare;
