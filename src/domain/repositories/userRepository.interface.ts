import { UserM } from '../model/user';

export interface UserRepository {
  getUserByUsername(username: string): Promise<UserM>;
  updateRefreshToken(username: string, refreshToken: string): Promise<void>;
}
