import { UserRole } from "@/backend/common/constants/user-roles-enum";

export interface ISystemUser {
  _id: string;
  name: string;
  username: string;
  password: string;
  role: UserRole;
}