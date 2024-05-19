import { fetch_organizations } from "@lib/service/organization";
import { For, createSignal } from "solid-js";
import { Component, Show, createResource } from "solid-js";
import { CreateOrganizationModal } from "~/components/functional/org/CreateOrganizationModal";
import { InviteToOrganizationModal } from "~/components/functional/org/InviteToOrganizationModal";
import OrganizationList from "~/components/functional/org/OrganizationList";
import { Button } from "~/components/ui/button";

const Organization: Component = () => {
  const [orgList, { refetch }] = createResource(fetch_organizations);
  const [openModal, setOpenModal] = createSignal(false);
  const [openInviteModal, setOpenInviteModal] = createSignal(false);

  return (
    <div class="flex flex-col flex-1 flex-grow overflow-hidden p-3 ">
      <div class="flex justify-between items-center p-3  ">
        <div class="text-2xl font-bold text-primary leading-10">
          Organizations
        </div>
        <div class="flex gap-4">
          <Button
            class="font-bold text-base"
            size="lg"
            onClick={() => setOpenInviteModal(true)}
          >
            Invite
          </Button>
          <Button
            class="font-bold text-base"
            size="lg"
            onClick={() => setOpenModal(true)}
          >
            Create Organization
          </Button>
        </div>
      </div>
      <div class="flex gap-4 flex-col p-3 overflow-auto h-full">
        <OrganizationList organizationList={orgList} refetch={refetch} />
      </div>
      <CreateOrganizationModal
        open={openModal()}
        onOpenChange={setOpenModal}
        refetch={refetch}
      />
      <Show when={openInviteModal()}>
        <InviteToOrganizationModal
          open={openInviteModal()}
          onOpenChange={setOpenInviteModal}
          refetch={refetch}
        />
      </Show>
    </div>
  );
};

export default Organization;
