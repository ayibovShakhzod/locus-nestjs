export class UserWithoutPassword {
  id: number;
  username: string;
  email: string;
  role: string;
  hashRefreshToken: string;
}

export class UserM extends UserWithoutPassword {
  password: string;
}
