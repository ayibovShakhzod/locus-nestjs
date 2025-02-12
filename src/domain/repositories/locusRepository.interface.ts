import { LocusM } from '../model/locus';

export interface LocusRepository {
  findAll(): Promise<LocusM[]>;
}
