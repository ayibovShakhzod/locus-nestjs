import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { LocusMember } from './locus-member.entity';

@Entity({
  name: 'rnc_locus',
  database: 'locus-database',
})
export class Locus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', name: 'assembly_id' })
  assemblyId: string;

  @Column({ type: 'varchar', name: 'locus_name' })
  locusName: string;

  @Column({ type: 'varchar', name: 'public_locus_name' })
  publicLocusName: string;

  @Column({ type: 'varchar', name: 'chromosome' })
  chromosome: string;

  @Column({ type: 'varchar', name: 'strand' })
  strand: string;

  @Column({ type: 'int', name: 'locus_start' })
  locusStart: number;

  @Column({ type: 'int', name: 'locus_stop' })
  locusStop: number;

  @Column({ type: 'int', name: 'member_count' })
  memberCount: number;

  @OneToMany(() => LocusMember, member => member.locus)
  locusMembers: LocusMember[];
}
