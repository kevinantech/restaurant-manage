import { UserRole } from "@/backend/common/constants/user-roles-enum";
import { ISystemUser } from "../../shared/systemuser/domain/systemuser.entity";

export class Admin implements ISystemUser {
  id: string;
  name: string;
  email: string;
  username: string;
  password: string;
  role: UserRole;
  constructor(
    id: string,
    name: string,
    email: string,
    username: string,
    password: string
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.username = username;
    this.password = password;
    this.role = UserRole.ADMIN;
  }
}
