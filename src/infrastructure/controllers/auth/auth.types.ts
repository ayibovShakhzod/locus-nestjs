import { Request } from 'express';
import { User } from 'src/infrastructure/entities/user.entity';

export interface AuthRequest extends Request {
  user: User;
}
˚