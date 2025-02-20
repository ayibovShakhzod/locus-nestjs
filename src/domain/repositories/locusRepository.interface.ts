import { LocusFilterDto } from 'src/infrastructure/controllers/locus/locus-filter.dto';
import { Locus } from 'src/infrastructure/entities/locus.entity';
import { RoleEnum } from 'src/infrastructure/entities/role.enum';

export interface LocusRepository {
  findAll(filterDto: LocusFilterDto, userRole: RoleEnum): Promise<Locus[]>;
}
