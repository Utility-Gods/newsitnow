import API from "@lib/icons/API";
import Code from "@lib/icons/code";
import Link from "@lib/icons/link";
import { Collection } from "@lib/types/Collection";
import { BadgeDelta } from "~/components/ui/badge-delta";
import { Dialog, DialogContent, DialogHeader } from "~/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import CodeShare from "./share/CodeShare";

import APIShare from "./share/APIShare";
import LinkShare from "./share/LinkShare";
import PageSkeleton from "~/components/bare/PageSkeleton";
import { Show, createEffect } from "solid-js";

interface CollectionShareProps {
  // add props here
  show: boolean;
  onShowChange: (show: boolean) => void;
  collection: any;
}

function CollectionShare(props: CollectionShareProps) {
  const collection_details = () => props.collection().value;

  return (
    <Dialog open={props.show} onOpenChange={props.onShowChange}>
      <DialogContent class="w-[600px]">
        <DialogHeader class="space-y-1.5">
          <Show when={props.collection.loading}>
            <PageSkeleton />
          </Show>
          <Show when={props.collection()?.isErr()}>
            <div class="text-center text-error-foreground">
              Error loading details
            </div>
          </Show>
          <Show when={props.collection()?.isOk()}>
            <div class="bg-muted p-3 w-full">
              <div class="flex items-center gap-3">
                <div class="text-primary font-bold text-md">
                  {collection_details().name}
                </div>
                <div class="flex items-center gap-3 text-muted-foreground text-sm">
                  <div class="flex gap-2 items-center">
                    <BadgeDelta deltaType="increase">
                      {collection_details().status}
                    </BadgeDelta>
                  </div>
                  <div class="flex gap-2 items-center">
                    <div class="">
                      {new Date(
                        collection_details().createdAt,
                      ).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
              <div class="allow-3-lines">{collection_details().content}</div>
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
                <CodeShare collectionId={collection_details().id}></CodeShare>
              </TabsContent>
              <TabsContent value="api">
                <APIShare collectionId={collection_details().id}></APIShare>
              </TabsContent>
              <TabsContent value="link">
                <LinkShare collectionId={collection_details().id}></LinkShare>
              </TabsContent>
            </Tabs>
          </Show>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default CollectionShare;
