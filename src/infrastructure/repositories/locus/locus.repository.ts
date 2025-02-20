import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocusRepository } from 'src/domain/repositories/locusRepository.interface';
import { Locus } from '../../entities/locus.entity';
import { Repository } from 'typeorm';
import { LocusFilterDto } from 'src/infrastructure/controllers/locus/locus-filter.dto';
import { RoleEnum } from 'src/infrastructure/entities/role.enum';

@Injectable()
export class DatabaseLocusRepository implements LocusRepository {
  constructor(
    @InjectRepository(Locus, 'locus-database')
    private readonly locusEntityRepository: Repository<Locus>,
  ) {}

  async findAll(filterDto: LocusFilterDto, userRole: RoleEnum): Promise<Locus[]> {
    const { id, assemblyId, regionId, membershipStatus, sideloading, page, rows, sortBy, sortOrder } = filterDto;
    const query = this.locusEntityRepository
      .createQueryBuilder('locus')
      .leftJoinAndSelect('locus.locusMembers', 'locusMembers');

    if (id) query.andWhere('locus.id = :id', { id });
    if (assemblyId) query.andWhere('locus.assemblyId = :assemblyId', { assemblyId });
    if (regionId) query.andWhere('locusMembers.regionId = :regionId', { regionId });
    if (membershipStatus) query.andWhere('locusMembers.membershipStatus = :membershipStatus', { membershipStatus });

    if (userRole === RoleEnum.NORMAL) {
      query.select(['locus.id', 'locus.assemblyId']);
    } else if (userRole === RoleEnum.LIMITED) {
      query.andWhere('locusMembers.regionId IN (:...regionIds)', {
        regionIds: [86118093, 86696489, 88186467],
      });
    }

    if (sideloading && userRole !== RoleEnum.NORMAL) {
      query.leftJoinAndSelect('locus.locusMembers', 'locusMembers');
    }

    if (sortBy) {
      query.orderBy(`locus.${sortBy}`, sortOrder);
    }

    return query
      .skip((page - 1) * rows)
      .take(rows)
      .getMany();
  }
}
