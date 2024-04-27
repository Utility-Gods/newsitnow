import { User } from "./User";
import { Article } from "./Article";

export interface Collection {
  id: number;
  name?: string;
  articles: { data: Article[] };
  creator?: { data: User };
  uuid: string;
  description?: string;
  url?: string;
  createdAt: string;
}
