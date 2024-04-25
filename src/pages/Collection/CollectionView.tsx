import { fetch_collection_by_id } from "@lib/service/collection";

import {
  Component,
  createResource,
  Show,
  createSignal,
  createEffect,
} from "solid-js";
import BreadCrumb from "~/components/bare/BreadCrumb";
import { BadgeDelta } from "~/components/ui/badge-delta";
import { Separator } from "~/components/ui/separator";

type CollectionViewProps = {};

const CollectionView: Component = (props: CollectionViewProps) => {
  const [collection] = createResource(props.params.id, fetch_collection_by_id);
  const [loading] = createSignal(false);

  createEffect(() => {
    console.log(collection());
  });

  const collection_details = () => collection()?.value?.attributes;

  return (
    <div class="flex flex-col flex-1 flex-grow overflow-hidden p-3 ">
      <Show when={collection()?.isErr()}>
        <div class="p-4 text-primary-100">Error loading collection</div>
      </Show>
      <Show when={loading()}>
        <div class="p-4 text-primary-100">Loading collection</div>
      </Show>
      <BreadCrumb
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/collection", label: "Collection" },
        ]}
      />
      <Show when={collection()?.isOk()}>
        <div class="flex p-3 flex-col gap-3 ">
          <div class="flex justify-between items-center">
            <div class="flex items-center text-2xl font-bold text-primary leading-10">
              {collection_details().name}
            </div>
            <div class="flex items-center gap-3 text-muted-foreground text-sm">
              <div class="flex gap-2 items-center">
                <BadgeDelta deltaType="increase">
                  {collection_details().status}
                </BadgeDelta>
              </div>
              <div class="flex gap-2 items-center">
                <div class="">
                  {new Date(
                    collection_details().createdAt,
                  ).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
          <div class="overflow-auto">{collection_details().description}</div>
          <Separator />
        </div>
      </Show>
    </div>
  );
};
export default CollectionView;
