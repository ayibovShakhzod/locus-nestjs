import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LocusMember {
  @PrimaryGeneratedColumn()
  locusMemberId: number;
  regionId: number;
  locusId: number;
  memberShipStatus: string;
}
