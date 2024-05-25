import { count_articles } from "@lib/service/article";
import { fetch_collections } from "@lib/service/collection";
import { fetch_plan_by_id } from "@lib/service/plan";
import { get_org_plan, get_user_orgs } from "@lib/utils";

import { useParams } from "@solidjs/router";
import { Show, createEffect } from "solid-js";
import { Component, createResource } from "solid-js";
import PageSkeleton from "~/components/bare/common/PageSkeleton";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { ProgressCircle } from "~/components/ui/progress-circle";
import { Separator } from "~/components/ui/separator";

const Plan: Component = () => {
  const params = useParams();
  const org_id = () => Number(params.org_id);

  const plan_id = () => get_org_plan(org_id());

  const [user_plan, { refetch }] = createResource(plan_id, fetch_plan_by_id);

  const user_plan_details = () => user_plan()?.value ?? {};
  const [articleCount] = createResource(org_id, count_articles);

  const [collections] = createResource(org_id, fetch_collections);

  const organization = () =>
    get_user_orgs().find((org) => org.id === org_id()) ?? {};

  return (
    <div class="flex flex-col flex-1 flex-grow overflow-hidden p-3 ">
      <div class="p-3 ">
        <div class="text-2xl font-bold text-primary leading-10">
          Plan details
        </div>
        <Show when={!user_plan.loading} fallback={<PageSkeleton />}>
          <Show
            when={user_plan()?.isOk()}
            fallback={
              <div class="text-center">
                {user_plan_details()}-=--- Something went wrong
              </div>
            }
          >
            <div class="flex flex-col gap-3 items-start">
              <div class="bg-white shadow rounded-lg p-4 mb-6">
                <p class="mb-2">
                  <strong>Plan Name:</strong>{" "}
                  {user_plan_details().attributes.name}
                </p>
                <p class="mb-2">
                  <strong>Description:</strong>{" "}
                  {user_plan_details().attributes.description}
                </p>
                <p class="mb-2">
                  <strong>Price:</strong> 99 rupees per month
                </p>
                <div class="flex flex-row gap-3">
                  <Card class="p-4">
                    <div class="flex items-center justify-start space-x-5">
                      <ProgressCircle
                        value={
                          (100 * collections()?.value.length) /
                          user_plan_details().attributes.allowed_collections
                        }
                      />
                      <div>
                        <p class="text-tremor-default text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">
                          Created Collections :{" "}
                          {collections()?.value.length ?? 0}
                        </p>
                        <p class="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                          Allowed Collections :
                          {user_plan_details().attributes.allowed_collections}
                        </p>
                      </div>
                    </div>
                  </Card>
                  <Card class="p-4">
                    <div class="flex items-center justify-start space-x-5">
                      <ProgressCircle
                        value={
                          (100 * articleCount()?.value?.length) /
                            user_plan_details().attributes.allowed_articles ?? 0
                        }
                      />
                      <div>
                        <p class="text-tremor-default text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">
                          Article Created- {articleCount()?.value?.length ?? 0}
                        </p>
                        <p class="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                          Allowed Articles-{" "}
                          {user_plan_details().attributes.allowed_articles}
                        </p>
                      </div>
                    </div>
                  </Card>
                  <Card class="p-4">
                    <div class="flex items-center justify-start space-x-5">
                      <ProgressCircle value={75} />
                      <div>
                        <p class="text-tremor-default text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">
                          {user_plan_details().attributes.allowed_media_in_mb}
                        </p>
                        <p class="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                          Allowed Storaage
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
              <Separator />
              <div class="text-muted-foreground">Organization Details</div>

              <Card class="p-4">
                <div class="flex justify-start flex-col">
                  <h2 class="text-xl font-semibold text-secondary">
                    {organization().name}
                  </h2>
                  <p class="text-muted-foreground">
                    {organization().description}
                  </p>
                </div>
              </Card>
              <div class="flex gap-3">
                <Button variant="ghost" onclick={refetch}>
                  Refresh Plan
                </Button>
                <Show when={user_plan_details().attributes.name === "free"}>
                  <Button>Upgrade Plan</Button>
                </Show>
              </div>
            </div>
          </Show>
        </Show>
      </div>
    </div>
  );
};

export default Plan;
