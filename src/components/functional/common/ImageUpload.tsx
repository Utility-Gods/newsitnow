import Photo from "@lib/icons/Photo";
import { upload_image } from "@lib/service/common";

import { Component, createSignal } from "solid-js";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { showToast } from "~/components/ui/toast";

type ImageUploadProps = {
  value?: string;
  onUpload: (url: string) => void;
};

const ImageUpload: Component = (props: ImageUploadProps) => {
  const [loading, setLoading] = createSignal(false);

  const { value, onUpload } = props;

  console.log({ value });

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
      console.log(res.value);
      showToast({
        variant: "success",
        duration: 5000,
        title: "Image uploaded",
        description: "The image has been uploaded successfully",
      });
      onUpload(res.value);
    }
  };

  return (
    <div
      class="w-full relative h-[220px] bg-muted flex items-center justify-center border-border border"
      style={
        value
          ? {
              "background-image": `url(${value})`,
              "background-size": "cover",
              "background-position": "center",
            }
          : {}
      }
    >
      <Label
        for="image_ImageUpload"
        class="w-full flex gap-3 cursor-pointer items-center justify-center h-full  text-xl p-3 bg-secondry backdrop-blur-sm blur-none font-semibold text-secondary text-center "
      >
        <div class="w-6 h-6">
          <Photo />
        </div>
        <div>{loading() ? "Uploading..." : "Upload Image"}</div>
      </Label>
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
