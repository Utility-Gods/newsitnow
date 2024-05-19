import { type Component, Show, createSignal, mergeProps } from "solid-js";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Skeleton } from "~/components/ui/skeleton";

import Org from "@lib/icons/Org";
import { createResource } from "solid-js";
import { fetch_organizations } from "@lib/service/organization";
import { Organization } from "@lib/types/Organization";
import { useNavigate, useParams } from "@solidjs/router";

type ChangeOrgProps = {
  onChange: (org: Organization) => void;
};

export default function (props: ChangeOrgProps): Component {
  const merged = mergeProps(props);
  const params = useParams();
  const org_id = () => params.org_id;

  const org_details = () =>
    orgList()?.value?.map((o) => {
      return { label: o.name, value: o.id, id: o.id };
    }) ?? [];

  const default_org = () =>
    org_details().find((o: Organization) => o.id == Number(org_id())) ||
    org_details()[0];
  const [orgList] = createResource(fetch_organizations);

  const [value, setValue] = createSignal(default_org());

  return (
    <Show
      when={!orgList.loading}
      fallback={
        <div class="flex gap-3 pt-1 flex-col">
          <Skeleton height={20} radius={6} />
          <Skeleton height={34} radius={6} />
        </div>
      }
    >
      <Show when={orgList()?.isOk()}>
        <div class="mb-2 flex items-center gap-2">
          <div class="w-5 h-5">
            <Org />
          </div>
          Organization
        </div>
        <Select
          modal={true}
          optionValue="value"
          optionTextValue="label"
          optionDisabled="disabled"
          defaultValue={default_org()}
          value={value()}
          options={org_details()}
          onChange={(o) => {
            console.log("changed", o);
            setValue(o);
            merged.onChange(o);
          }}
          placeholder={
            <div class="flex items-center">
              <span class="ms-2">Organization</span>
            </div>
          }
          itemComponent={(props) => (
            <SelectItem item={props.item}>
              {props.item.rawValue.label}
            </SelectItem>
          )}
        >
          <SelectTrigger aria-label="Organization">
            <SelectValue<string>>
              {(state) => state.selectedOption().label}
            </SelectValue>
          </SelectTrigger>
          <SelectContent class="font-bold"></SelectContent>
        </Select>
      </Show>
    </Show>
  );
}
