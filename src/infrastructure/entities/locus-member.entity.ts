import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Locus } from './locus.entity';

@Entity({
  name: 'rnc_locus_members',
  database: 'locus-database',
})
export class LocusMember {
  @PrimaryGeneratedColumn({ name: 'id' })
  locusMemberId: number;

  @Column({ type: 'int', name: 'region_id' })
  regionId: number;

  @Column({ type: 'varchar', name: 'membership_status' })
  membershipStatus: string;

  @ManyToOne(() => Locus, locus => locus.locusMembers)
  @JoinColumn({ name: 'locus_id' })
  locus: Locus;
}
