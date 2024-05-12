import { count_articles } from "@lib/service/article";
import { fetch_collections } from "@lib/service/collection";
import { fetch_user_plan } from "@lib/service/plan";
import { Show, createEffect } from "solid-js";
import { Component, createResource } from "solid-js";
import BreadCrumb from "~/components/bare/common/BreadCrumb";
import PageSkeleton from "~/components/bare/common/PageSkeleton";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { ProgressCircle } from "~/components/ui/progress-circle";
import { Separator } from "~/components/ui/separator";

const Plan: Component = () => {
  const [userPlan, { refetch }] = createResource(fetch_user_plan);

  const [articleCount] = createResource(count_articles);
  const [collections] = createResource(fetch_collections);
  const organization = () => {
    if (userPlan().isOk()) {
      return userPlan().value.organization;
    }
    return {};
  };

  createEffect(() => {
    console.log("---------", userPlan());
  });

  return (
    <div class="flex flex-col flex-1 flex-grow overflow-hidden p-3 ">
      <BreadCrumb
        crumbs={[
          { href: "/app", label: "Home" },
          { href: "/app/plan", label: "Plan" },
        ]}
      />
      <div class="p-3 ">
        <div class="text-2xl font-bold text-primary leading-10">
          Plan details
        </div>
        <Show when={!userPlan.loading} fallback={<PageSkeleton />}>
          <Show
            when={userPlan()?.isOk()}
            fallback={<div class="text-center">Something went wrong</div>}
          >
            <div class="flex flex-col gap-3 items-start">
              <div class="bg-white shadow rounded-lg p-4 mb-6">
                <h3 class="text-lg font-semibold mb-2">Plan Details</h3>
                <p class="mb-2">
                  <strong>Plan Name:</strong> {organization().plan.name}
                </p>
                <p class="mb-2">
                  <strong>Description:</strong>{" "}
                  {organization().plan.description}
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
                          organization().plan.allowed_collection
                        }
                      />
                      <div>
                        <p class="text-tremor-default text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">
                          Created Collections :{" "}
                          {collections()?.value.length ?? 0}
                        </p>
                        <p class="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                          Allowed Collections :{" "}
                          {organization().plan.allowed_collection}
                        </p>
                      </div>
                    </div>
                  </Card>
                  <Card class="p-4">
                    <div class="flex items-center justify-start space-x-5">
                      <ProgressCircle
                        value={
                          (100 * articleCount()?.value.length) /
                            organization().plan.allowed_articles ?? 0
                        }
                      />
                      <div>
                        <p class="text-tremor-default text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">
                          Article Created- {articleCount()?.value?.length ?? 0}
                        </p>
                        <p class="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                          Allowed Articles-{" "}
                          {organization().plan.allowed_articles}
                        </p>
                      </div>
                    </div>
                  </Card>
                  <Card class="p-4">
                    <div class="flex items-center justify-start space-x-5">
                      <ProgressCircle value={75} />
                      <div>
                        <p class="text-tremor-default text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">
                          {organization().plan.allowed_media_in_mb}
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
                <Show when={organization().plan.name === "free"}>
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
