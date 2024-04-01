import { Component, createSignal } from "solid-js";
import CollectionDetails from "~/components/functional/CollectionDetails";
import CollectionList from "~/components/functional/CollectionList";
import { CreateCollectionModal } from "~/components/functional/CreateCollectionModal";
import { Button } from "~/components/ui/button";

const Collection: Component = () => {
  const [openModal, setOpenModal] = createSignal(false);
  const [openDetails, setOpenDetails] = createSignal(false);

  return (
    <div class="flex flex-col flex-1 flex-grow overflow-hidden">
      <div class="flex justify-between items-center p-6 ">
        <div class="text-2xl font-semibold leading-10">Collections</div>

        <Button
          class="font-bold text-base"
          size="lg"
          onClick={() => setOpenDetails(true)}
        >
          Create Collection
        </Button>
      </div>
      <div class="flex gap-6 flex-col p-6 overflow-hidden h-full">
        <CollectionList openDetails={setOpenDetails} />
      </div>
      <CreateCollectionModal open={openModal()} onOpenChange={setOpenModal} />
      <CollectionDetails open={openDetails()} onOpenChange={setOpenDetails} />
    </div>
  );
};

export default Collection;
