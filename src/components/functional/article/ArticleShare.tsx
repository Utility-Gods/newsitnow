import API from "@lib/icons/API";
import Code from "@lib/icons/code";
import Link from "@lib/icons/link";
import { Article } from "@lib/types/Article";
import { createEffect } from "solid-js";
import { BadgeDelta } from "~/components/ui/badge-delta";
import { Dialog, DialogContent, DialogHeader } from "~/components/ui/dialog";
import { Separator } from "~/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import CodeShare from "./share/CodeShare";

interface ArticleShareProps {
  // add props here
  show: boolean;
  onShowChange: (show: boolean) => void;
  article: Article;
}

function ArticleShare(props: ArticleShareProps) {
  return (
    <Dialog open={props.show} onOpenChange={props.onShowChange}>
      <DialogContent class="w-[600px]">
        <DialogHeader class="space-y-1.5">
          <div class="bg-muted p-3 w-full">
            <div class="flex items-center gap-3">
              <div class="text-primary font-bold text-md">
                {props.article.attributes.name}
              </div>
              <div class="flex items-center gap-3 text-muted-foreground text-sm">
                <div class="flex gap-2 items-center">
                  <BadgeDelta deltaType="increase">
                    {props.article.attributes.status}
                  </BadgeDelta>
                </div>
                <div class="flex gap-2 items-center">
                  <div class="">
                    {new Date(
                      props.article.attributes.createdAt
                    ).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
            <div class="allow-3-lines">{props.article.attributes.content}</div>
          </div>

          <Tabs defaultValue="account" class="w-full">
            <TabsList class="grid w-full grid-cols-3">
              <TabsTrigger value="code" class="flex items-center gap-2">
                <div class="w-4 h-4">
                  <Code></Code>
                </div>
                <div>Code</div>
              </TabsTrigger>
              <TabsTrigger value="api" class="flex items-center gap-2">
                <div class="w-4 h-4">
                  <API></API>
                </div>
                <div>API</div>
              </TabsTrigger>
              <TabsTrigger value="link" class="flex items-center gap-2">
                <div class="w-4 h-4">
                  <Link></Link>
                </div>
                <div>Link</div>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="code">
              <CodeShare articleId={props.article.id}></CodeShare>
            </TabsContent>
            <TabsContent value="api">
              <div class="text-lg font-semibold leading-none tracking-tight">
                API
              </div>
              <div class="text-sm text-muted-foreground">
                Share your article with the world using the API below.
              </div>
            </TabsContent>
            <TabsContent value="link">
              <div class="text-lg font-semibold leading-none tracking-tight">
                Link
              </div>
              <div class="text-sm text-muted-foreground">
                Share your article with the world using the link below.
              </div>
            </TabsContent>
          </Tabs>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default ArticleShare;
