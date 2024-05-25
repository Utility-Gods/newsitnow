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
import { Component, createEffect, createResource, For } from "solid-js";
import qs from "qs";
import { Show } from "solid-js";

import TableRowSkeleton from "~/components/bare/common/TableRowSkeleton";
import { BadgeDelta } from "~/components/ui/badge-delta";
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

  createEffect(() => {
    console.log(organization());
    console.log(users());
  });

  const [organization, { refetch }] = createResource(
    fetch_org_args,
    fetch_organization_by_id,
  );

  const users = () => {
    return organization()?.value?.users ?? [];
  };

  return (
    <div class="flex flex-col flex-1 flex-grow overflow-hidden p-3 ">
      <div class="p-3 ">
        <div class="text-2xl font-bold text-primary leading-10">Team</div>

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
      </div>
    </div>
  );
};

export default Team;
