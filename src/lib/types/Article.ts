import { Collection } from "./Collection";
import { Status } from "./Status";

export interface Article {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  name?: string;
  created_on?: Date;
  creator?: Collection;
  status?: Status;
  uuid?: any;
  content: string;
  text_id: string;
}
