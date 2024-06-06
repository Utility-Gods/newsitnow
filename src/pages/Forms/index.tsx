import { fetch_forms } from "@lib/service/form";
import { useNavigate, useParams } from "@solidjs/router";
import { createResource, type Component } from "solid-js";
import FormList from "~/components/functional/form/FormList";
import { Button } from "~/components/ui/button";
import { showToast } from "~/components/ui/toast";

const Forms: Component = () => {
  const navigate = useNavigate();
  const params = useParams();
  const org_id = () => params.org_id;

  if (!org_id) {
    showToast({
      title: "Error",
      description: "Organization ID is required",
      duration: 5000,
      variant: "error",
    });
    return navigate("/404");
  }

  const [formList, { refetch }] = createResource(org_id, fetch_forms);

  return (
    <div class="flex flex-col flex-1 flex-grow overflow-hidden p-3 ">
      <div class="flex justify-between items-center p-3  ">
        <div class="text-2xl font-bold text-primary leading-10">Forms</div>
        <Button
          class="font-bold text-base"
          size="lg"
          onClick={() => {
            navigate("create");
          }}
        >
          Create Form
        </Button>
      </div>
      <div class="flex gap-4 flex-col p-3 overflow-auto h-full ">
        <FormList formList={formList} refetch={refetch} />
      </div>
    </div>
  );
};

export default Forms;
