import { User } from "./User";
import { Plan } from "./Plan";

export interface Organization {
  name: number;
  users?: User;
  uuid: string;
  description: string;
  created_on: string;
  org_id: string;
  plan: Plan;
  id: number;
  text_id: string;
}
