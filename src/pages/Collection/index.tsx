import { Component, createSignal } from "solid-js";
import CollectionDetails from "~/components/functional/collection/CollectionDetails";
import CollectionList from "~/components/functional/collection/CollectionList";
import { CreateCollectionModal } from "~/components/functional/collection/CreateCollectionModal";
import { Button } from "~/components/ui/button";

const Collection: Component = () => {
  const [openModal, setOpenModal] = createSignal(false);
  const [openDetails, setOpenDetails] = createSignal(false);
  const [activeCollection, setActiveCollection] = createSignal("");

  return (
    <div class="flex flex-col flex-1 flex-grow overflow-hidden">
      <div class="flex justify-between items-center p-6 ">
        <div class="text-2xl font-semibold leading-10">Collections</div>

        <Button
          class="font-bold text-base"
          size="lg"
          onClick={() => setOpenModal(true)}
        >
          Create Collection
        </Button>
      </div>
      <div class="flex gap-6 flex-col p-6 overflow-auto h-full">
        <CollectionList
          openDetails={setOpenDetails}
          onView={(id: string) => {
            console.log(id);
            setActiveCollection(id);
          }}
        />
      </div>
      <CreateCollectionModal open={openModal()} onOpenChange={setOpenModal} />
      <CollectionDetails
        open={openDetails()}
        onOpenChange={setOpenDetails}
        collectionId={activeCollection()}
      />
    </div>
  );
};

export default Collection;
