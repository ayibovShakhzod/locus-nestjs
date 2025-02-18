import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/domain/repositories/userRepository.interface';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UserM } from 'src/domain/model/user';

@Injectable()
export class DatabaseUserRepository implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userEntityRepository: Repository<User>,
  ) {}

  async getUserByUsername(username: string): Promise<UserM> {
    const user = await this.userEntityRepository.findOne({
      where: {
        username,
      },
    });

    if (!user) {
      return null;
    }

    return this.toUser(user);
  }

  private toUser(user: User): UserM {
    const adminUser: UserM = new UserM();

    adminUser.id = user.id;
    adminUser.username = user.username;
    adminUser.password = user.password;
    adminUser.role = user.role.name;
    adminUser.email = user.email;
    adminUser.hashRefreshToken = user.hash_refresh_token;

    return adminUser;
  }
}
