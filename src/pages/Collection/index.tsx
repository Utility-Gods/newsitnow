import { fetch_collections } from "@lib/service/collection";
import { get_first_org_id } from "@lib/utils";
import { useParams } from "@solidjs/router";
import { type Component, createResource, createSignal } from "solid-js";

import CollectionList from "~/components/functional/collection/CollectionList";
import { CreateCollectionModal } from "~/components/functional/collection/CreateCollectionModal";
import { Button } from "~/components/ui/button";

const Collection: Component = () => {
  const [openModal, setOpenModal] = createSignal(false);
  const params = useParams();
  const org_id = () => params.org_id ?? get_first_org_id();

  const [collectionList, { refetch }] = createResource(
    org_id,
    fetch_collections,
  );

  return (
    <div class="flex flex-col flex-1 flex-grow overflow-hidden p-3 ">
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
        <CollectionList collectionList={collectionList} refetch={refetch} />
      </div>
      <CreateCollectionModal
        open={openModal()}
        onOpenChange={setOpenModal}
        refetch={refetch}
      />
    </div>
  );
};

export default Collection;
