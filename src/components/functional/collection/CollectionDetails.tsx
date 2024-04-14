import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";

import { Callout, CalloutContent, CalloutTitle } from "~/components/ui/callout";

import PageSpinner from "../../bare/PageSpinner";
import {
  Component,
  createEffect,
  createResource,
  createSignal,
  For,
  mergeProps,
  Show,
  Signal,
} from "solid-js";

import { Button } from "~/components/ui/button";
import { fetch_collection_by_id } from "@lib/service/collection";

import Share from "@lib/icons/share";
import CollectionShare from "./CollectionShare";
import { BadgeDelta } from "~/components/ui/badge-delta";

type CollectionDetailsProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  collectionId: any;
};

const CollectionDetails: Component<CollectionDetailsProps> = (props) => {
  const [collection] = createResource(
    props.collectionId,
    fetch_collection_by_id
  );

  const collection_details = () => collection()?.value?.attributes;

  const [loading, setLoading] = createSignal(false);
  const [openShareModal, setOpenShareModal] = createSignal(false);

  function embed_collection() {
    setOpenShareModal(true);
  }
  return (
    <>
      <Sheet open={props.open} onOpenChange={props.onOpenChange}>
        <SheetContent class="w-[400px] sm:w-[540px] overflow-auto no-scrollbar">
          <SheetHeader class="h-full">
            <SheetDescription class="flex flex-col justify-between flex-1">
              <Show when={collection()?.isErr()}>
                <div class="p-400 text-primary-100">
                  Error loading collections
                </div>
              </Show>
              <Show when={collection_details()}>
                <div class="mt-4 flex flex-col gap-4 p-400 text-primary-100 rounded-sm ">
                  <div class="flex justify-between items-center ">
                    <div class="text-2xl font-bold text-primary">
                      {collection_details().name}
                    </div>
                    <Button variant={"secondary"} onClick={embed_collection}>
                      <span>Share</span>
                      <div class="w-4 h-4 ml-2">
                        <Share />
                      </div>
                    </Button>
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
                          collection_details().createdAt
                        ).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div class="p-3 max-h-[69vh] overflow-auto border-border border">
                    {collection_details().description}
                  </div>
                </div>
              </Show>
            </SheetDescription>
            <SheetTitle>
              <Callout>
                <CalloutTitle>Detais</CalloutTitle>
                <CalloutContent>
                  You can view the details of the collection here and find the
                  code to embed the collection in your website.
                </CalloutContent>
              </Callout>
            </SheetTitle>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <Show when={loading()}>
        <PageSpinner />
      </Show>
      <CollectionShare
        collection={collection()?.value}
        show={openShareModal()}
        onShowChange={() => {
          setOpenShareModal(false);
        }}
      />
    </>
  );
};

export default CollectionDetails;
