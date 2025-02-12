import { ApiProperty } from '@nestjs/swagger';
import { LocusM } from 'src/domain/model/locus';
import { LocusMemberPresenter } from './locus-member.presenter';

export class LocusPresenter {
  @ApiProperty()
  id: number;

  @ApiProperty()
  assemblyId: string;

  @ApiProperty()
  locusName: string;

  @ApiProperty()
  publicLocusName: string;

  @ApiProperty()
  chromosome: string;

  @ApiProperty()
  strand: string;

  @ApiProperty()
  locusStart: number;

  @ApiProperty()
  locusStop: number;

  @ApiProperty()
  memberCount: number;

  @ApiProperty({
    isArray: true,
    type: LocusMemberPresenter,
  })
  locusMembers: Array<LocusMemberPresenter>;

  constructor(locus: LocusM) {
    this.id = locus.id;
    this.assemblyId = locus.assemblyId;
    this.locusName = locus.locusName;
    this.publicLocusName = locus.publicLocusName;
    this.chromosome = locus.chromosome;
    this.strand = locus.strand;
    this.locusStart = locus.locusStart;
    this.locusStop = locus.locusStop;
    this.memberCount = locus.memberCount;
    this.locusMembers = locus.locusMembers.map(locusMember => new LocusMemberPresenter(locusMember));
  }
}
