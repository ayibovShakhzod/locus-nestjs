import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocusTypeOrmConfigModule } from 'src/infrastructure/config/typeorm/locus-typeorm.module';
import { Locus } from 'src/infrastructure/entities/locus';
import { DatabaseLocusRepository } from './locus.repository';

@Module({
  imports: [LocusTypeOrmConfigModule, TypeOrmModule.forFeature([Locus], 'locus-database')],
  providers: [DatabaseLocusRepository],
  exports: [DatabaseLocusRepository],
})
export class LocusRepositoryModule {}
