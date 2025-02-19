import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocusRepository } from 'src/domain/repositories/locusRepository.interface';
import { Locus } from '../../entities/locus';
import { Repository } from 'typeorm';
import { LocusM } from 'src/domain/model/locus';

@Injectable()
export class DatabaseLocusRepository implements LocusRepository {
  constructor(
    @InjectRepository(Locus, 'locus-database')
    private readonly locusEntityRepository: Repository<Locus>,
  ) {}

  async findAll(): Promise<LocusM[]> {
    const query = `WITH paginated_rl AS (
    SELECT * FROM rnc_locus
    ORDER BY id
    LIMIT 10 OFFSET 0
)
SELECT 
    rl.*, 
    COALESCE(json_agg(rlm) FILTER (WHERE rlm.id IS NOT NULL), '[]') AS locus_members
FROM paginated_rl rl
LEFT JOIN rnc_locus_members rlm ON rlm.locus_id = rl.id
GROUP BY rl.id, rl.assembly_id, rl.locus_name, rl.public_locus_name, rl.chromosome, rl.strand, rl.locus_start, rl.locus_stop, rl.member_count
    `;
    const locusEntities = await this.locusEntityRepository.query(query);
    const result = locusEntities.map(locusEntity => ({
      ...new LocusM(locusEntity, locusEntity.locus_members),
    }));

    return result;
  }
}
