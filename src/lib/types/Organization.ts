import { User } from "./User";

export interface Organization {
  name: number;
  users?: { data: User };
  uuid: string;
  description: string;
  created_on: string;
  org_id: string;
}
