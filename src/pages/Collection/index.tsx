import { fetch_collections } from "@lib/service/collection";
import { Component, createResource, createSignal } from "solid-js";
import BreadCrumb from "~/components/bare/common/BreadCrumb";
import CollectionDetails from "~/components/functional/collection/CollectionDetails";
import CollectionList from "~/components/functional/collection/CollectionList";
import { CreateCollectionModal } from "~/components/functional/collection/CreateCollectionModal";
import { Button } from "~/components/ui/button";

const Collection: Component = () => {
  const [openModal, setOpenModal] = createSignal(false);
  const [openDetails, setOpenDetails] = createSignal(false);
  const [activeCollection, setActiveCollection] = createSignal("");
  const [collectionList, { refetch }] = createResource(fetch_collections);

  return (
    <div class="flex flex-col flex-1 flex-grow overflow-hidden p-3 ">
      <BreadCrumb
        crumbs={[
          { href: "/app", label: "Home" },
          { href: "/app/collection", label: "Collections" },
        ]}
      />
      <div class="flex justify-between items-center p-3  ">
        <div class="text-2xl font-bold text-primary leading-10">
          Collections
        </div>

        <Button
          class="font-bold text-base"
          variant={"secondary"}
          size="lg"
          onClick={() => setOpenModal(true)}
        >
          Create Collection
        </Button>
      </div>
      <div class="flex gap-4 flex-col p-3 overflow-auto h-full">
        <CollectionList
          collectionList={collectionList}
          refetch={refetch}
          openDetails={setOpenDetails}
          onView={(id: string) => {
            console.log(id);
            setActiveCollection(id);
          }}
        />
      </div>
      <CreateCollectionModal
        open={openModal()}
        onOpenChange={setOpenModal}
        refetch={refetch}
      />
      <CollectionDetails
        open={openDetails()}
        onOpenChange={setOpenDetails}
        collectionId={activeCollection}
      />
    </div>
  );
};

export default Collection;
