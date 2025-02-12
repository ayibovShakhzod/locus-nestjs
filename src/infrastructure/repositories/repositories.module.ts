import { Module } from '@nestjs/common';
import { LocusRepositoryModule } from './locus/locus.repository.module';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [LocusRepositoryModule, TypeOrmConfigModule, TypeOrmModule.forFeature([])],
  providers: [],
  exports: [LocusRepositoryModule],
})
export class RepositoriesModule {}
