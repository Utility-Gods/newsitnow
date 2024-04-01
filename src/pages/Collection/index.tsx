import { Component, createSignal } from "solid-js";
import CollectionList from "~/components/functional/CollectionList";
import { CreateCollectionModal } from "~/components/functional/CreateCollectionModal";
import { Button } from "~/components/ui/button";

const Collection: Component = () => {
  const [open, setOpen] = createSignal(false);
  return (
    <div class="flex flex-col flex-1 flex-grow overflow-hidden">
      <div class="flex justify-between items-center p-6 ">
        <div class="text-2xl font-semibold leading-10">Collections</div>

        <Button
          class="font-bold text-base"
          size="lg"
          onClick={() => setOpen(true)}
        >
          Create Collection
        </Button>
      </div>
      <div class="flex gap-6 flex-col p-6 overflow-hidden h-full">
        <CollectionList />
      </div>
      <CreateCollectionModal open={open()} onOpenChange={setOpen} />
    </div>
  );
};

export default Collection;
