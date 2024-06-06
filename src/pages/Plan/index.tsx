import { count_articles } from "@lib/service/article";
import { fetch_collections } from "@lib/service/collection";
import { count_forms, fetch_forms } from "@lib/service/form";
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
  const [forms] = createResource(org_id, fetch_forms);

  const formsCount = () => forms()?.value?.length ?? 0;

  createEffect(() => {
    console.log(formsCount());
  });
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
            fallback={<div class="text-center">{user_plan_details()}</div>}
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
                    <div class="flex flex-col space-y-3">
                      <div>
                        <p class="font-medium">
                          Created Collections:{" "}
                          {collections()?.value.length ?? 0}
                        </p>
                        <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                          <div
                            class="bg-blue-600 h-2.5 rounded-full"
                            style={{
                              width: `${
                                (100 * (collections()?.value.length ?? 0)) /
                                user_plan_details().attributes
                                  .allowed_collections
                              }%`,
                            }}
                          ></div>
                        </div>
                        <p class="text-sm text-gray-500">
                          Allowed Collections:{" "}
                          {user_plan_details().attributes.allowed_collection}
                        </p>
                      </div>
                    </div>
                  </Card>
                  <Card class="p-4">
                    <div class="flex flex-col space-y-3">
                      <div>
                        <p class="font-medium">
                          Articles Created: {articleCount()?.value?.length ?? 0}
                        </p>
                        <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                          <div
                            class="bg-green-600 h-2.5 rounded-full"
                            style={{
                              width: `${
                                (100 * (articleCount()?.value?.length ?? 0)) /
                                user_plan_details().attributes.allowed_articles
                              }%`,
                            }}
                          ></div>
                        </div>
                        <p class="text-sm text-gray-500">
                          Allowed Articles:{" "}
                          {user_plan_details().attributes.allowed_articles}
                        </p>
                      </div>
                    </div>
                  </Card>
                  <Card class="p-4">
                    <div class="flex flex-col space-y-3">
                      <div>
                        <p class="font-medium">
                          Forms Created: {formsCount() ?? 0}
                        </p>
                        <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                          <div
                            class="bg-purple-600 h-2.5 rounded-full"
                            style={{
                              width: `${
                                (100 * (formsCount() ?? 0)) /
                                user_plan_details().attributes.allowed_forms
                              }%`,
                            }}
                          ></div>
                        </div>
                        <p class="text-sm text-gray-500">
                          Allowed Forms:{" "}
                          {user_plan_details().attributes.allowed_forms}
                        </p>
                      </div>
                    </div>
                  </Card>
                  <Card class="p-4">
                    <div class="flex flex-col space-y-3">
                      <div>
                        <p class="font-medium">Storage Used: 75 MB</p>
                        <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                          <div
                            class="bg-red-600 h-2.5 rounded-full"
                            style={{ width: "75%" }}
                          ></div>
                        </div>
                        <p class="text-sm text-gray-500">
                          Allowed Storage:{" "}
                          {user_plan_details().attributes.allowed_media_in_mb}{" "}
                          MB
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
