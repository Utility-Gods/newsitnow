import * as v from "valibot";

export const CreateArticleSchema = v.object({
  name: v.string([
    v.minLength(3, "Name must be at least 3 characters long"),
    v.maxLength(200, "Name must be at most 200 characters long"),
  ]),
  content: v.string([
    v.minLength(20, "Description must be at least 20 characters long"),
  ]),
});

export type CreateArticleForm = v.Input<typeof CreateArticleSchema>;
