import { Module } from '@nestjs/common';
import { LocusRepositoryModule } from './locus/locus.repository.module';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseUserRepository } from './user.repository';
import { User } from '../entities/user.entity';
import { DatabaseRoleRepository } from './role.repository';
import { Role } from '../entities/role.entity';

@Module({
  imports: [LocusRepositoryModule, TypeOrmConfigModule, TypeOrmModule.forFeature([User, Role])],
  providers: [DatabaseUserRepository, DatabaseRoleRepository],
  exports: [DatabaseUserRepository, DatabaseRoleRepository, LocusRepositoryModule],
})
export class RepositoriesModule {}
