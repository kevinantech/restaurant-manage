import { UserRole } from "@/backend/common/constants/user-roles-enum";

export interface ISystemUser {
  id: string;
  name: string;
  email: string;
  username: string;
  password: string;
  role: UserRole;
}
