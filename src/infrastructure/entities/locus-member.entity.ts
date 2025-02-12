import { Entity } from 'typeorm';

@Entity()
export class LocusMember {
  locusMemberId: number;
  regionId: number;
  locusId: number;
  memberShipStatus: string;
}
