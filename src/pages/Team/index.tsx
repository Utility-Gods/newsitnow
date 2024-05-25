import { fetch_organization_by_id } from "@lib/service/organization";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

import { useParams } from "@solidjs/router";
import { Component, createResource, For } from "solid-js";
import qs from "qs";
import { Show } from "solid-js";

import TableRowSkeleton from "~/components/bare/common/TableRowSkeleton";
import { BadgeDelta } from "~/components/ui/badge-delta";
import { Button } from "~/components/ui/button";
const [openInviteModal, setOpenInviteModal] = createSignal(false);

import { InviteToOrganizationModal } from "~/components/functional/org/InviteToOrganizationModal";
import { createSignal } from "solid-js";
import { fetch_invitations } from "@lib/service/invitation";

const Team: Component = () => {
  const params = useParams();
  const org_id = () => Number(params.org_id);

  const fetch_org_args = () => {
    return {
      id: org_id(),
      query: qs.stringify({
        populate: {
          users: {
            fields: ["id", "email", "username", "created_at"],
          },
        },
      }),
    };
  };

  const [organization] = createResource(
    fetch_org_args,
    fetch_organization_by_id,
  );

  const invitation_query = () =>
    qs.stringify({
      filters: {
        organization: {
          id: org_id(),
        },
      },
      populate: {
        invited_by: {
          fields: ["id", "email", "username"],
        },
        organization: {
          fields: ["id", "name"],
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

  const users = () => {
    return organization()?.value?.users ?? [];
  };

  const invitation_details = () => {
    return invitations()?.value.data ?? [];
  };

  return (
    <div class="flex flex-col flex-1 flex-grow overflow-hidden p-3 ">
      <div class="flex justify-between items-center p-3  ">
        <div class="text-2xl font-bold text-primary leading-10">
          Team Members
        </div>
        <div class="flex gap-4">
          <Button
            class="font-bold text-base"
            size="lg"
            onClick={() => setOpenInviteModal(true)}
          >
            Invite
          </Button>
        </div>
      </div>

      <Show when={organization()}>
        <div class="shadow-md bg-white">
          <Table class="border border-border">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead class=" text-right">Created At</TableHead>
                <TableHead class=" text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <Show when={organization()?.isErr()}>
                <TableRow>
                  <TableCell
                    colspan={5}
                    class="text-center text-error-foreground"
                  >
                    {organization()?.error?.message}
                  </TableCell>
                </TableRow>
              </Show>
              <Show
                when={!organization.loading}
                fallback={<TableRowSkeleton />}
              >
                <Show when={organization()?.isOk()}>
                  <Show when={users().length === 0}>
                    <TableRow>
                      <TableCell colspan={5} class="text-center">
                        No team member found
                      </TableCell>
                    </TableRow>
                  </Show>
                  <For each={users()}>
                    {(c) => (
                      <TableRow class="cursor-pointer">
                        <TableCell class="font-semibold">
                          {c.username}
                        </TableCell>
                        <TableCell class="text-truncate">
                          <div class="allow-3-lines">{c.email}</div>
                        </TableCell>
                        <TableCell>
                          <BadgeDelta
                            deltaType={true ? "increase" : "decrease"}
                          >
                            {"Admin"}
                          </BadgeDelta>
                        </TableCell>
                        <TableCell class="text-right">
                          {new Date(c.createdAt).toLocaleDateString()}
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

      <div class="flex justify-between items-center p-3 mt-6  ">
        <div class="text-2xl font-bold text-primary leading-10">
          Sent Invitation
        </div>
      </div>
      <Show when={invitations()}>
        <div class="shadow-md bg-white">
          <Table class="border border-border">
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Invited By</TableHead>
                <TableHead>Status</TableHead>
                <TableHead class=" text-right">Invited At</TableHead>
                <TableHead class=" text-right">Expiry Date</TableHead>
                <TableHead class=" text-right"></TableHead>
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
              <Show
                when={!organization.loading}
                fallback={<TableRowSkeleton />}
              >
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
                      </TableRow>
                    )}
                  </For>
                </Show>
              </Show>
            </TableBody>
          </Table>
        </div>
      </Show>
      <Show when={openInviteModal()}>
        <InviteToOrganizationModal
          open={openInviteModal()}
          onOpenChange={setOpenInviteModal}
          refetch={refetch_invitation}
        />
      </Show>
    </div>
  );
};

export default Team;
