import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  database: 'locus-database',
})
export class Locus {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;
  assembly_id: string;
  locus_name: string;
  public_locus_name: string;
  chromosome: string;
  strand: string;
  locus_start: number;
  locus_stop: number;
  member_count: number;
}
