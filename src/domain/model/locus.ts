import { Locus } from '../../infrastructure/entities/locus';
import { LocusMemberM } from './locus-member';
export class LocusM {
  id: number;
  assemblyId: string;
  locusName: string;
  publicLocusName: string;
  chromosome: string;
  strand: string;
  locusStart: number;
  locusStop: number;
  memberCount: number;
  locusMembers: Array<LocusMemberM>;

  constructor(locus: Locus, locusMembers: Array<LocusMemberM>) {
    this.id = locus.id;
    this.assemblyId = locus.assembly_id;
    this.locusName = locus.locus_name;
    this.publicLocusName = locus.public_locus_name;
    this.chromosome = locus.chromosome;
    this.strand = locus.strand;
    this.locusStart = locus.locus_start;
    this.locusStop = locus.locus_stop;
    this.memberCount = locus.member_count;
    this.locusMembers = locusMembers.map(locusMember => new LocusMemberM(locusMember));
  }
}
