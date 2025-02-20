import { LocusRepository } from 'src/domain/repositories/locusRepository.interface';
import { LocusFilterDto } from 'src/infrastructure/controllers/locus/locus-filter.dto';
import { Locus } from 'src/infrastructure/entities/locus.entity';
import { RoleEnum } from 'src/infrastructure/entities/role.enum';

export class getLocusUseCases {
  constructor(private readonly locusRepository: LocusRepository) {}

  async execute(filterDto: LocusFilterDto, userRole: RoleEnum): Promise<Locus[]> {
    return this.locusRepository.findAll(filterDto, userRole);
  }
}
