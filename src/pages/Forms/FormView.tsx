import Share from "@lib/icons/share";
import { delete_form, fetch_form_by_id, update_form } from "@lib/service/form";

import { get_first_org_id, get_user_id } from "@lib/utils";
import { A, useNavigate, useParams } from "@solidjs/router";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import {
  Component,
  Show,
  For,
  createEffect,
  createResource,
  createSignal,
} from "solid-js";

import Edit from "@lib/icons/Edit";
import Hidden from "@lib/icons/Hidden";
import ThreeDots from "@lib/icons/ThreeDots";
import Trash from "@lib/icons/Trash";
import Empty from "~/components/bare/common/Empty";
import PageSkeleton from "~/components/bare/common/PageSkeleton";
import PageSpinner from "~/components/bare/common/PageSpinner";
import AreYouSure from "~/components/functional/common/AreYouSure";
import { BadgeDelta } from "~/components/ui/badge-delta";
import { Button } from "~/components/ui/button";
import { showToast } from "~/components/ui/toast";
import Unlock from "@lib/icons/Unlock";
import Lock from "@lib/icons/Lock";
import { fetch_form_response } from "@lib/service/form_response";
import TableRowSkeleton from "~/components/bare/common/TableRowSkeleton";

type FormViewProps = {};

const FormView: Component = (props: FormViewProps) => {
  const params = useParams();
  const org_id = () => params.org_id ?? get_first_org_id();

  const navigate = useNavigate();
  const fetch_form_args = () => {
    return {
      id: Number(params.id),
      org_id: org_id(),
    };
  };

  const [form, { refetch }] = createResource(fetch_form_args, fetch_form_by_id);

  const [formResponseList, { refetch: fr_refetch }] = createResource(
    fetch_form_args,
    fetch_form_response,
  );

  const [loading, setLoading] = createSignal(false);

  const form_details = () => form()?.value;

  const isAuthor = () => {
    return true;
    // return form_details().creator.id === get_user_id();
  };

  const [openPublishModal, setOpenPublishModal] = createSignal(false);

  function isPublished() {
    if (!form_details()) {
      return false;
    }
    return form_details()?.status === "Published";
  }

  async function togglePublicAccess(access: boolean) {
    try {
      setLoading(true);
      const result = await update_form(
        {
          ...form_details(),
          is_publicly_accesible: access,
        },
        org_id(),
      );

      if (result.isOk()) {
        showToast({
          title: "Form status changed to " + status,
          description: "Article has been published",
          variant: "success",
          duration: 5000,
        });
        refetch();
      }

      if (result.isErr()) {
        console.log("error publishing Form");
        showToast({
          title: "Error",
          description: "Error changing Form status",
          variant: "error",
          duration: 5000,
        });
      }
    } catch (e) {
      console.log("error publishing Form", e);
      showToast({
        title: "Error",
        description: "Error changing Form status",
        variant: "error",
        duration: 5000,
      });
    } finally {
      console.log("done");
      setOpenPublishModal(false);
      setLoading(false);
    }
  }

  async function changeStatus(status: string) {
    console.log("publishing Form");
    try {
      setLoading(true);
      const result = await update_form(
        {
          ...form_details(),
          status,
        },
        org_id(),
      );

      if (result.isOk()) {
        console.log("formpublished");
        showToast({
          title: "Form status changed to " + status,
          description: "Article has been published",
          variant: "success",
          duration: 5000,
        });
        refetch();
      }

      if (result.isErr()) {
        console.log("error publishing Form");
        showToast({
          title: "Error",
          description: "Error changing Form status",
          variant: "error",
          duration: 5000,
        });
      }
    } catch (e) {
      console.log("error publishing Form", e);
      showToast({
        title: "Error",
        description: "Error changing Form status",
        variant: "error",
        duration: 5000,
      });
    } finally {
      console.log("done");
      setOpenPublishModal(false);
      setLoading(false);
    }
  }

  async function handle_delete_form(id: number) {
    try {
      setLoading(true);
      const result = await delete_form(id, org_id());

      console.log("deleting form", result);
      if (result?.isOk()) {
        refetch();
        showToast({
          variant: "success",
          title: "Form deleted",
          duration: 5000,
          description: "Form has been deleted successfully",
        });
        navigate(`/app/${org_id()}/form`);
      }

      if (result?.isErr()) {
        throw result.error;
      }
    } catch (e) {
      console.log(e);
      showToast({
        variant: "error",
        title: e?.message ?? "Failed to create form",
        description:
          e?.details?.message ?? "An error occurred while delete the form",
      });
    } finally {
      setLoading(false);
    }
  }
  function copyCodeSnippet() {
    console.log("Copying code to clipboard");
    const toCopy = "https://orangegas.co/action-form/" + form_details()?.id;
    navigator.clipboard
      .writeText(toCopy as string)
      .then(() => {
        console.log("URL copied to clipboard successfully");
        showToast({
          variant: "success",
          title: "Success",
          description:
            "You can now share the link with others and collect responses",
        });
      })
      .catch((error) => {
        console.error("Failed to copy URL to clipboard:", error);
        showToast({
          variant: "error",
          title: "Failed to copy URL",
          description: "An error occurred while copying the URL to clipboard",
        });
      });
  }

  return (
    <div class="flex flex-col flex-1 flex-grow overflow-hidden p-3 gap-6">
      <Show when={!form.loading} fallback={<PageSkeleton />}>
        <Show when={form()?.isOk()}>
          <Show
            when={Object.keys(form_details()).length > 0}
            fallback={
              <div class="p-4 text-primary-100 w-full">
                <Empty message="No form found" />
              </div>
            }
          >
            <div class="p-3  border-border border bg-muted flex items-center justify-between flex-shrink-0 gap-6">
              <div class="flex flex-col">
                <div class="flex gap-3 items-end">
                  <div class="text-2xl font-bold text-secondary">
                    {form_details().name}
                  </div>
                  <div class="flex items-end gap-3 text-muted-foreground text-sm">
                    <div class="">
                      {new Date(form_details().createdAt).toLocaleDateString()}
                    </div>
                    <div class="flex gap-2 items-center">
                      <BadgeDelta
                        deltaType={
                          form_details().status === "Published"
                            ? "increase"
                            : "decrease"
                        }
                      >
                        {form_details().status}
                      </BadgeDelta>

                      <BadgeDelta
                        deltaType={
                          form_details().is_publicly_accesible
                            ? "increase"
                            : "decrease"
                        }
                      >
                        {form_details().is_publicly_accesible
                          ? "Public"
                          : "Private"}
                      </BadgeDelta>
                    </div>
                  </div>
                </div>
              </div>
              <Show when={isAuthor()}>
                <div class="flex gap-3 flex-shrink-0">
                  <Show
                    when={!form_details().is_publicly_accesible}
                    fallback={
                      <Button
                        onClick={() => {
                          togglePublicAccess(false);
                        }}
                      >
                        <div class="w-4 h-4 mr-2">
                          <Lock />
                        </div>
                        <span>Make Private</span>
                      </Button>
                    }
                  >
                    <Button
                      onClick={() => {
                        togglePublicAccess(true);
                      }}
                    >
                      <div class="w-4 h-4 mr-2">
                        <Unlock />
                      </div>
                      <span>Make Public</span>
                    </Button>
                  </Show>
                  <Show when={isPublished()}>
                    <A href="share" class="flex items-center gap-1">
                      <Button>
                        <div class="w-4 h-4 mr-2">
                          <Share />
                        </div>
                        <span>Share</span>
                      </Button>
                    </A>
                  </Show>
                  <Show when={!isPublished()}>
                    <Button
                      onClick={() => {
                        setOpenPublishModal(true);
                      }}
                    >
                      Publish
                    </Button>
                  </Show>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <div class="w-6 h-6 rotate-90">
                        <ThreeDots />
                      </div>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() => {}}
                        class="text-primary-foreground flex items-center gap-2"
                      >
                        <div class="w-4 h-4">
                          <Edit />
                        </div>
                        Edit
                      </DropdownMenuItem>
                      <Show when={isPublished()}>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            changeStatus("Draft");
                          }}
                          class="text-primary-foreground focus:bg-error-foreground flex items-center gap-2"
                        >
                          <div class="w-4 h-4">
                            <Hidden />
                          </div>
                          Unpublish
                        </DropdownMenuItem>
                      </Show>
                      <DropdownMenuItem
                        class="text-primary-foreground focus:bg-error-foreground flex items-center gap-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          handle_delete_form(form_details().id);
                        }}
                      >
                        <div class="w-4 h-4">
                          <Trash />
                        </div>
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </Show>
            </div>
          </Show>
        </Show>

        <div class=" flex justify-between items-end">
          <div class="w-1/2 px-3 flex flex-col gap-3">
            <div class="text-2xl flex-shrink-0 font-bold text-primary leading-10">
              Form Responses
            </div>
          </div>
          <Show when={form_details().is_publicly_accesible}>
            <div class="flex flex-col gap-2 items-baseline ">
              <div class="text-muted-foreground text-sm ">
                Share the link below to collect responses
              </div>
              <div class="flex flex-row gap-2 items-baseline">
                <div class="flex flex-col gap-1">
                  <pre class="border-2 p-3 bg-muted  code-block text-muted-foreground">
                    {`https://orangegas.co/action-form/` + params.id}
                  </pre>
                </div>
                <Button onClick={copyCodeSnippet}>Copy</Button>
              </div>
            </div>
          </Show>
        </div>

        <Table class=" border-border border">
          <TableHeader>
            <TableRow>
              <TableHead class="w-1/4">Email</TableHead>
              <TableHead class="text-left">Response</TableHead>
              <TableHead class="text-center">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <Show when={formResponseList()?.isErr()}>
              <TableRow>
                <TableCell
                  colspan={5}
                  class="text-center text-error-foreground"
                >
                  {formResponseList()?.error.message}
                </TableCell>
              </TableRow>
            </Show>
            <Show
              when={!formResponseList.loading}
              fallback={<TableRowSkeleton />}
            >
              <Show when={formResponseList()?.isOk()}>
                <Show when={formResponseList()?.value.length === 0}>
                  <TableRow>
                    <TableCell
                      colspan={5}
                      class="text-center text-muted-foreground"
                    >
                      No responses found
                    </TableCell>
                  </TableRow>
                </Show>
                <For each={formResponseList()?.value}>
                  {(c) => (
                    <TableRow>
                      <TableCell class="font-semibold">
                        <div class="clamp-lines line-clamp-1">{c.creator}</div>
                      </TableCell>
                      <TableCell>{JSON.stringify(c.response)}</TableCell>

                      <TableCell class="text-center">
                        {new Date(c.createdAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  )}
                </For>
              </Show>
            </Show>
          </TableBody>
        </Table>

        <Show when={form()?.isErr()}>
          <div class="p-4 text-primary-100">Error loading form</div>
        </Show>
      </Show>

      <Show when={loading()}>
        <PageSpinner />
      </Show>

      <AreYouSure
        show={openPublishModal()}
        onSubmit={() => {
          changeStatus("Published");
        }}
        message="Are you sure you want to publish this form?"
        onOpenChange={() => {
          setOpenPublishModal(false);
        }}
      />
    </div>
  );
};
export default FormView;
