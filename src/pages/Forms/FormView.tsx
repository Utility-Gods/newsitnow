import Share from "@lib/icons/share";
import { delete_form, fetch_form_by_id, update_form } from "@lib/service/form";

import { get_first_org_id, get_user_id } from "@lib/utils";
import { A, useNavigate, useParams } from "@solidjs/router";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import {
  Component,
  Show,
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

  createEffect(() => {
    console.log(form());
  });

  const [loading, setLoading] = createSignal(false);

  const form_details = () => form()?.value;

  const isAuthor = () => {
    console.log(get_user_id());
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
                    </div>
                  </div>
                </div>
                <div class="overflow-auto text-muted-foreground text-md clamp-lines line-clamp-3 mt-2">
                  {form_details().description}
                </div>
              </div>
              <Show when={isAuthor()}>
                <div class="flex gap-3 flex-shrink-0">
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
