import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";

import { Callout, CalloutContent, CalloutTitle } from "~/components/ui/callout";

import PageSpinner from "../bare/PageSpinner";
import { createResource, createSignal, mergeProps, Show } from "solid-js";

import { fetch_collection_by_id } from "@lib/service/collection";

type CollectionDetailsProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  collectionId: string;
};

function CollectionDetails(props: CollectionDetailsProps) {
  const [collection] = createResource(
    props.collectionId,
    fetch_collection_by_id
  );

  console.log(props);
  const [loading, setLoading] = createSignal(false);
  return (
    <>
      <Sheet open={props.open} onOpenChange={props.onOpenChange}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              <Callout>
                <CalloutTitle>Detais</CalloutTitle>
                <CalloutContent>
                  You can view the details of the collection here and find the
                  code to embed the collection in your website.
                </CalloutContent>
              </Callout>
            </SheetTitle>
            <SheetDescription>
              <Show when={collection(props.collectionId)}>
                {(data) => (
                  <div class="mt-4 flex flex-col gap-4 p-400 text-primary-100 rounded-sm ">
                    <div class="flex gap-3 items-center">
                      <div class="text-md font-semibold">Name</div>
                      <div class="text-md font-semibold">{data().name}</div>
                    </div>
                    <div class="flex gap-3 items-center">
                      <div class="text-md font-semibold">Description</div>
                      <div class="text-md font-semibold">
                        {data().description}
                      </div>
                    </div>
                    <div class="flex gap-3 items-center">
                      <div class="text-md font-semibold">Created</div>
                      <div class="text-md font-semibold">
                        {new Date(data().date_created).toLocaleDateString()}
                      </div>
                    </div>
                    <div class="flex gap-3 items-center">
                      <div class="text-md font-semibold">Status</div>
                      <div class="text-md font-semibold">{data().status}</div>
                    </div>
                  </div>
                )}
              </Show>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <Show when={loading()}>
        <PageSpinner />
      </Show>
    </>
  );
}

export default CollectionDetails;
