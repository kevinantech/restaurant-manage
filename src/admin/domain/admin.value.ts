import {
  ISystemUser,
  UserRole,
} from '../../shared/systemuser/domain/systemuser.entity';

export class Admin implements ISystemUser {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly username: string;
  readonly password: string;
  readonly role: UserRole.ADMIN;
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
