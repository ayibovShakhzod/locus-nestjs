import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleRepository } from 'src/domain/repositories/roleRepository.interface';
import { Role } from '../entities/role.entity';
import { RoleEnum } from '../entities/role.enum';

@Injectable()
export class DatabaseRoleRepository implements RoleRepository {
  constructor(
    @InjectRepository(Role)
    private readonly roleEntityRepository: Repository<Role>,
  ) {}

  async getRoleByName(name: RoleEnum): Promise<string | null> {
    const role = await this.roleEntityRepository.findOne({ where: { name } });
    if (!role) {
      return null;
    }

    return role.name;
  }
}
