export enum UserRole {
  ADMIN = 'ADMIN',
}

export interface ISystemUser {
  id: string;
  name: string;
  email: string;
  username: string;
  password: string;
  role: UserRole;
}
