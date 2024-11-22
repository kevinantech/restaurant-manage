import { UserRole } from "@/backend/common/constants/user-roles-enum";
import { SystemUserInput } from "./admin.repository";

export class Admin implements SystemUserInput {
  name: string;
  username: string;
  password: string;
  role: UserRole;
  constructor(name: string, username: string, password: string) {
    this.name = name;
    this.username = username;
    this.password = password;
    this.role = UserRole.ADMIN;
  }
}
