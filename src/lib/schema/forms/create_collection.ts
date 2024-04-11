import * as v from "valibot";

export const CreateCollectionSchema = v.object({
  name: v.string([
    v.minLength(3, "Name must be at least 3 characters long"),
    v.maxLength(200, "Name must be at most 200 characters long"),
  ]),
  description: v.string([
    v.minLength(200, "Description must be at least 3 characters long"),
  ]),
});

export type CreateCollectionForm = v.Input<typeof CreateCollectionSchema>;
