import {
  generateArticleShareLink,
  generateRestAPICodeExposed,
} from "@lib/utils/article";
import { Button } from "~/components/ui/button";
import { showToast } from "~/components/ui/toast";

interface LinkShareProps {
  // add props here
  articleId: number;
}

function LinkShare(props: LinkShareProps) {
  const embedCode = () => generateArticleShareLink(props.articleId);

  function copyCodeSnippet() {
    console.log("Copying code to clipboard");
    const toCopy = generateArticleShareLink(props.articleId);

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
    </div>
  );
}

export default LinkShare;
