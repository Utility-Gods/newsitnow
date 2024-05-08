import * as v from "valibot";

export const UpdateArticleSchema = v.object({
  name: v.string([
    v.minLength(3, "Name must be at least 3 characters long"),
    v.maxLength(200, "Name must be at most 200 characters long"),
  ]),
  text: v.string([v.minLength(3, "Text must be at least 20 characters long")]),
});

export type UpdateArticleForm = v.Input<typeof UpdateArticleSchema>;
