import { Collection } from "./Collection";

export interface Article {
  id: number;
  attributes: {
    name?: string;
    created_on?: string;
    creator?: { data: Collection };
    status?: "Published" | "Draft" | "Deleted";
    uuid?: any;
    content: string;
    createdAt: string;
  };
}
