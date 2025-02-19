import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
import { User } from '../entities/user.entity';
import { DatabaseUserRepository } from './user.repository';
import { Role } from '../entities/role.entity';
import { DatabaseRoleRepository } from './role.repository';
import { LocusRepositoryModule } from './locus/locus.repository.module';

@Module({
  imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([User, Role]), LocusRepositoryModule],
  providers: [DatabaseUserRepository, DatabaseRoleRepository],
  exports: [DatabaseUserRepository, DatabaseRoleRepository],
})
export class RepositoriesModule {}
