import { Component, createSignal } from "solid-js";
import { CreateCollectionModal } from "~/components/functional/CreateCollectionModal";
import { Button } from "~/components/ui/button";

const Collection: Component = () => {
  const [open, setOpen] = createSignal(false);
  return (
    <div class="flex flex-col flex-1">
      <div class="flex justify-between items-center w-full">
        <div class="text-2xl font-semibold leading-10">Collections</div>

        <Button
          class="font-bold text-base"
          size="lg"
          onClick={() => setOpen(true)}
        >
          Create Collection
        </Button>
      </div>
      <CreateCollectionModal open={open()} onOpenChange={setOpen} />
    </div>
  );
};

export default Collection;
