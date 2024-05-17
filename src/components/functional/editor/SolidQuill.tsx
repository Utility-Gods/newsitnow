import { Dynamic } from "solid-js/web";
import { mergeProps, createEffect, JSX, onMount, splitProps } from "solid-js";

import type {
  EditorChangeHandler,
  QuillOptionsStatic,
  SelectionChangeHandler,
  TextChangeHandler,
} from "quill";

import { Button } from "~/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "~/components/ui/dialog";

import Quill from "quill";
import ImageUpload from "~/components/functional/common/ImageUpload";
import { createSignal } from "solid-js";

function kebabCase(input: string) {
  return input
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, "-")
    .toLowerCase();
}

function imageHandler(e) {
  console.log(e);
}

const defaultValues: QuillOptionsStatic = {
  theme: "snow",
  imageHandler: imageHandler,
  formats: [
    "bold",
    "italic",
    "underline",
    "strike",
    "align",
    "list",
    "indent",
    "size",
    "header",
    "link",
    "image",
    "video",
    "color",
    "background",
    "clean",
  ],

  modules: {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ align: [] }],

      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],

      [{ size: ["small", false, "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["link", "image"],
      [{ color: [] }, { background: [] }],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  },
};

const events = [
  "onTextChange",
  "onSelectionChange",
  "onEditorChange",
  "onceTextChange",
  "onceSelectionChange",
  "onceEditorChange",
  "offTextChange",
  "offSelectionChange",
  "offEditorChange",
] as const;

export function SolidQuill(props: Props) {
  let editorRef!: HTMLElement;
  let quill: Quill;

  const [showImageUpload, setShowImageUpload] = createSignal(false);

  const mergedProps = mergeProps({ as: "div", ...defaultValues }, props);

  const [internal, otherProps] = splitProps(mergedProps, [
    "as",
    "ref",
    "onReady",
    ...events,
  ]);

  const [quillProps, externalProps] = splitProps(otherProps, [
    "debug",
    "modules",
    "placeholder",
    "readOnly",
    "theme",
    "formats",
    "bounds",
    "scrollingContainer",
    "strict",
  ]);

  function insertToEditor(quill: Quill, url: string) {
    // push image url to rich editor.
    const range = quill.getSelection();
    quill.insertEmbed(range?.index ?? 0, "image", `${url}`);
  }

  onMount(() => {
    quill = new Quill(editorRef, quillProps);

    // quill editor add image handler
    quill.getModule("toolbar").addHandler("image", () => {
      // selectLocalImage();
      setShowImageUpload(true);
    });

    for (const event of events) {
      if (!internal[event]) continue;

      const [modifier, ...eventParts] = kebabCase(event).split("-");
      quill[modifier](eventParts.join("-"), internal[event]);
    }

    if (internal.ref && typeof internal.ref === "function") {
      internal.ref(quill);
    }

    if (internal.onReady) {
      internal.onReady(quill);
    }
  });

  createEffect(() => {
    const state = quillProps.readOnly ? "disable" : "enable";
    quill[state]();
  });

  return (
    <>
      <Dynamic
        ref={editorRef}
        class="quill"
        component={internal.as}
        {...externalProps}
      />
      <Dialog
        open={showImageUpload()}
        onOpenChange={(val) => {
          setShowImageUpload(val);
        }}
      >
        <DialogContent class="w-[600px]">
          <DialogHeader class="space-y-1.5 overflow-hidden">
            <div class="text-lg font-semibold leading-none tracking-tight text-primary">
              Upload Media
            </div>
            <div class="text-sm text-muted-foreground">
              Upload new media and press save when you're done.
            </div>
          </DialogHeader>
          <ImageUpload
            id="media_upload"
            onUpload={(url) => {
              console.log({ url });
              const image_url: string = url[0].url;
              insertToEditor(quill, image_url);
            }}
          />
          <DialogFooter>
            <Button
              variant="ghost"
              type="button"
              onClick={() => {
                setShowImageUpload(false);
              }}
            >
              Close
            </Button>
            <Button
              onClick={() => {
                setShowImageUpload(false);
              }}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

interface Props extends QuillOptionsStatic, JSX.HTMLAttributes<Quill> {
  as?: string;

  onReady?: (quill: Quill) => unknown;

  onTextChange?: (handler: TextChangeHandler) => unknown;
  onSelectionChange?: (handler: SelectionChangeHandler) => unknown;
  onEditorChange?: (handler: EditorChangeHandler) => unknown;

  onceTextChange?: (handler: TextChangeHandler) => unknown;
  onceSelectionChange?: (handler: SelectionChangeHandler) => unknown;
  onceEditorChange?: (handler: EditorChangeHandler) => unknown;

  offTextChange?: (handler: TextChangeHandler) => unknown;
  offSelectionChange?: (handler: SelectionChangeHandler) => unknown;
  offEditorChange?: (handler: EditorChangeHandler) => unknown;
}
