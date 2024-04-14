import { generateEmbedCode } from "@lib/service/article";
import { createResource } from "solid-js";
import { Button } from "~/components/ui/button";
import { showToast } from "~/components/ui/toast";

interface CodeShareProps {
  // add props here
  articleId: number;
}

function CodeShare(props: CodeShareProps) {
  const [embedCode] = createResource(props.articleId, generateEmbedCode);

  function copyCodeSnippet() {
    console.log("Copying code to clipboard");
    navigator.clipboard
      .writeText(embedCode())
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
      <div class="border-2 p-3  code-block">{embedCode()}</div>

      <Button variant="outline" onClick={copyCodeSnippet}>
        Copy
      </Button>
      <div class="text-muted-foreground font-semibold text-xs">
        Copy the code above and add it in your HTML page
      </div>
    </div>
  );
}

export default CodeShare;
