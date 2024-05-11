import { Component } from "solid-js";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "~/components/ui/dialog";

type AreYouSureProps = {
  onSubmit: (val: boolean) => void;
  message: string;
  show: boolean;
  onOpenChange: (val: boolean) => void;
};

const AreYouSure: Component = (props: AreYouSureProps) => {
  return (
    <Dialog open={props.show} onOpenChange={props.onOpenChange}>
      <DialogContent class="w-[600px]">
        <DialogHeader class="space-y-1.5 overflow-hidden">
          <h2 class="text-lg font-semibold">Are you sure?</h2>
          <p class="text-sm text-gray-500">{props.message}</p>
          <div class="flex justify-end space-x-2">
            <Button onClick={() => props.onSubmit(false)} variant="outline">
              Cancel
            </Button>
            <Button onClick={() => props.onSubmit(true)}>Yes</Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AreYouSure;
