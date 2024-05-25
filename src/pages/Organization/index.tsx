import { fetch_invitations } from "@lib/service/invitation";
import { fetch_organizations } from "@lib/service/organization";
import { get_user_email } from "@lib/utils";
import { For, createSignal } from "solid-js";
import { Component, Show, createResource } from "solid-js";
import { CreateOrganizationModal } from "~/components/functional/org/CreateOrganizationModal";
import { InviteToOrganizationModal } from "~/components/functional/org/InviteToOrganizationModal";
import OrganizationList from "~/components/functional/org/OrganizationList";
import { Button } from "~/components/ui/button";
import qs from "qs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import TableRowSkeleton from "~/components/bare/common/TableRowSkeleton";
import { BadgeDelta } from "~/components/ui/badge-delta";

const Organization: Component = () => {
  const [orgList, { refetch }] = createResource(fetch_organizations);
  const [openModal, setOpenModal] = createSignal(false);
  const [openInviteModal, setOpenInviteModal] = createSignal(false);

  const invitation_query = () =>
    qs.stringify({
      filters: {
        email: get_user_email(),
      },
      populate: {
        invited_by: {
          fields: ["id", "email", "username"],
        },
        organization: {
          fields: ["name"],
        },
      },
      pagination: {
        pageSize: 100,
      },
    });

  const [invitations, { refetch: refetch_invitation }] = createResource(
    invitation_query,
    fetch_invitations,
  );

  const invitation_details = () => {
    return invitations()?.value.data ?? [];
  };

  async function acceptInvitation() {}

  async function rejectInvitation() {}

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
      <OrganizationList organizationList={orgList} refetch={refetch} />

      <div class="flex justify-between items-center p-3 mt-6  ">
        <div class="text-2xl font-bold text-primary leading-10">
          Recieved Invitation
        </div>
      </div>
      <Show when={invitations()}>
        <div class="shadow-md bg-white">
          <Table class="border border-border">
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Organization</TableHead>
                <TableHead>Invited By</TableHead>
                <TableHead>Status</TableHead>
                <TableHead class=" text-right">Invited At</TableHead>
                <TableHead class=" text-right">Expiry Date</TableHead>
                <TableHead class=" w-[220px] text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <Show when={invitations()?.isErr()}>
                <TableRow>
                  <TableCell
                    colspan={5}
                    class="text-center text-error-foreground"
                  >
                    {invitations()()?.error?.message}
                  </TableCell>
                </TableRow>
              </Show>
              <Show when={!invitations.loading} fallback={<TableRowSkeleton />}>
                <Show when={invitations()?.isOk()}>
                  <Show when={invitation_details().length === 0}>
                    <TableRow>
                      <TableCell colspan={5} class="text-center">
                        No invitation found
                      </TableCell>
                    </TableRow>
                  </Show>
                  <For each={invitation_details()}>
                    {({ attributes: c }) => (
                      <TableRow class="cursor-pointer">
                        <TableCell class="text-truncate">
                          <div class="allow-3-lines">{c.email}</div>
                        </TableCell>
                        <TableCell class="text-truncate">
                          <div class="allow-3-lines">
                            {c.organization.data.attributes.name ?? "NA"}
                          </div>
                        </TableCell>
                        <TableCell class="text-truncate">
                          <div class="allow-3-lines">
                            {c.invited_by.data.attributes.email ?? "NA"}
                          </div>
                        </TableCell>
                        <TableCell>
                          <BadgeDelta
                            deltaType={
                              c.status === "Accepted" ? "increase" : "decrease"
                            }
                          >
                            {c.status}
                          </BadgeDelta>
                        </TableCell>
                        <TableCell class="text-right">
                          {new Date(c.createdAt).toLocaleDateString()}
                        </TableCell>

                        <TableCell class="text-right">
                          {new Date(c.expiry_date).toLocaleDateString()}
                        </TableCell>
                        <TableCell class="text-right flex gap-3">
                          <Show when={c.status === "Pending"}>
                            <Button
                              onClick={() => {
                                acceptInvitation();
                              }}
                            >
                              Accept
                            </Button>
                            <Button
                              variant="destructive"
                              onClick={() => {
                                rejectInvitation();
                              }}
                            >
                              Reject
                            </Button>
                          </Show>
                        </TableCell>
                      </TableRow>
                    )}
                  </For>
                </Show>
              </Show>
            </TableBody>
          </Table>
        </div>
      </Show>

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
