import { fetch_organizations } from "@lib/service/organization";
import { For, createSignal } from "solid-js";
import { Component, Show, createResource } from "solid-js";
import BreadCrumb from "~/components/bare/common/BreadCrumb";
import { CreateOrganizationModal } from "~/components/functional/org/CreateOrganizationModal";
import OrganizationList from "~/components/functional/org/OrganizationList";
import { Button } from "~/components/ui/button";

const Organization: Component = () => {
  const [orgList, { refetch }] = createResource(fetch_organizations);
  const [openModal, setOpenModal] = createSignal(false);

  return (
    <div class="flex flex-col flex-1 flex-grow overflow-hidden p-3 ">
      <BreadCrumb
        crumbs={[
          { href: "/app", label: "Home" },
          { href: "/app/organization", label: "Organization" },
        ]}
      />
      <div class="flex justify-between items-center p-3  ">
        <div class="text-2xl font-bold text-primary leading-10">
          Organizations
        </div>
        <Button
          class="font-bold text-base"
          variant={"secondary"}
          size="lg"
          onClick={() => setOpenModal(true)}
        >
          Create Organization
        </Button>
      </div>
      <div class="flex gap-4 flex-col p-3 overflow-auto h-full">
        <OrganizationList organizationList={orgList} refetch={refetch} />
      </div>
      <CreateOrganizationModal
        open={openModal()}
        onOpenChange={setOpenModal}
        refetch={refetch}
      />
    </div>
  );
};

export default Organization;
