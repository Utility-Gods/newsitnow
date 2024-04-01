import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import PageSpinner from "../bare/PageSpinner";
import { createSignal, mergeProps, Show } from "solid-js";

function CollectionDetails(props) {
  const merged = mergeProps({ open: false, onOpenChange: () => {} }, props);

  const [loading, setLoading] = createSignal(false);
  return (
    <>
      <Sheet open={merged.open} onOpenChange={merged.onOpenChange}>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Are you sure absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
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
