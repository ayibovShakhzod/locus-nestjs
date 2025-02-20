import { Request } from 'express';
import { UserM } from 'src/domain/model/user';

export interface AuthRequest extends Request {
  user: UserM;
}
