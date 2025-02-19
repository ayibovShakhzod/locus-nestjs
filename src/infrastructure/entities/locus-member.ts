import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  database: 'locus-database',
})
export class LocusMember {
  @PrimaryGeneratedColumn()
  locusMemberId: number;
  regionId: number;
  locusId: number;
  memberShipStatus: string;
}
