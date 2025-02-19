export class UserWithoutPassword {
  id: number;
  username: string;
  createDate: Date;
  updatedDate: Date;
  hashRefreshToken: string;
  role: string;
}

export class UserM extends UserWithoutPassword {
  password: string;
}
