import { User } from "./User";
import { Article } from "./Article";

export interface Collection {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  name?: string;
  articles: Article[];
  creator?: User;
  uuid: any;
  description?: string;
  url?: string;
  text_id: string;
}
