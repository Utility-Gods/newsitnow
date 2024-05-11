import Upload from "@lib/icons/Upload";
import { upload_image } from "@lib/service/common";
import { Show } from "solid-js";

import { type Component, createSignal, createEffect } from "solid-js";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { showToast } from "~/components/ui/toast";

type ImageUploadProps = {
  value?: Record<string, string>;
  onUpload: (url: string) => void;
};

const ImageUpload: Component = (props: ImageUploadProps) => {
  const [loading, setLoading] = createSignal(false);

  const { value, onUpload } = props;

  const [imageURL, setImageURL] = createSignal(value);

  createEffect(() => {
    console.log({ value, imageURL: imageURL() });
  });

  const uploadImage = async (file: File) => {
    console.log({ file });
    setLoading(true);
    const res = await upload_image(file);
    setLoading(false);
    if (res.isErr()) {
      console.log(res.error);
      showToast({
        variant: "error",
        duration: 5000,
        title: "Failed to upload image",
        description: "An error occurred while uploading the image",
      });
    }

    if (res.isOk()) {
      console.log(res.value[0]);
      showToast({
        variant: "success",
        duration: 5000,
        title: "Image uploaded",
        description: "The image has been uploaded successfully",
      });
      onUpload(res.value);
      setImageURL(res.value[0] ?? "");
    }
  };

  return (
    <div
      class="w-full relative flex items-center gap-3"
      // style={
      //   imageURL()
      //     ? {
      //         "background-image": `url(${imageURL()})`,
      //         "background-size": "cover",
      //         "background-position": "center",
      //       }
      //     : {}
      // }
    >
      <Label
        for="image_ImageUpload"
        class="cursor-pointer flex gap-3 bg-secondary rounded-sm text-secondary-foreground p-3 font-semibold "
      >
        <div class="w-4 h-4">
          <Upload />
        </div>
        <div>{loading() ? "Uploading..." : "Upload Image"}</div>
      </Label>
      <Show when={imageURL()}>
        <img src={imageURL().url} class="w-12 h-12" />
        <span class="text-secondary">{imageURL().name}</span>
      </Show>
      <Input
        hidden
        class="hidden"
        onChange={async (e: Event) => {
          const file = e.target?.files[0];
          if (!file) return;
          uploadImage(file);
        }}
        accept="image/png, image/jpeg"
        id="image_ImageUpload"
        type="file"
      >
        Upload Image
      </Input>
    </div>
  );
};

export default ImageUpload;
