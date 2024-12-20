import { UserRole } from "@/backend/common/constants/user-roles-enum";
import { SystemUserInput } from "./admin.repository";

export class Admin implements SystemUserInput {
  name: string;
  email: string;
  username: string;
  password: string;
  role: UserRole;
  constructor(name: string, email: string, username: string, password: string) {
    this.name = name;
    this.email = email;
    this.username = username;
    this.password = password;
    this.role = UserRole.ADMIN;
  }
}
