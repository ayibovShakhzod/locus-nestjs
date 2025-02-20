import { RoleEnum } from 'src/infrastructure/entities/role.enum';

export class UserWithoutPassword {
  id: number;
  username: string;
  createDate: Date;
  updatedDate: Date;
  hashRefreshToken: string;
  role: RoleEnum;
}

export class UserM extends UserWithoutPassword {
  password: string;
}
