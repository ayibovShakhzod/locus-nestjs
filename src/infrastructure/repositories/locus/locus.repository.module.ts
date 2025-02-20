import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocusTypeOrmConfigModule } from 'src/infrastructure/config/typeorm/locus-typeorm.module';
import { Locus } from 'src/infrastructure/entities/locus.entity';
import { DatabaseLocusRepository } from './locus.repository';
import { LocusMember } from 'src/infrastructure/entities/locus-member.entity';

@Module({
  imports: [LocusTypeOrmConfigModule, TypeOrmModule.forFeature([Locus, LocusMember], 'locus-database')],
  providers: [DatabaseLocusRepository],
  exports: [DatabaseLocusRepository],
})
export class LocusRepositoryModule {}
