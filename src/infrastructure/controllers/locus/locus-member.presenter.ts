import { ApiProperty } from '@nestjs/swagger';
import { LocusMemberM } from 'src/domain/model/locus-member';

export class LocusMemberPresenter {
  @ApiProperty()
  locusMemberId: number;

  @ApiProperty()
  regionId: number;

  @ApiProperty()
  locusId: number;

  @ApiProperty()
  memberShipStatus: string;

  constructor(locusMember: LocusMemberM) {
    this.locusMemberId = locusMember.locusMemberId;
    this.regionId = locusMember.regionId;
    this.locusId = locusMember.locusId;
    this.memberShipStatus = locusMember.memberShipStatus;
  }
}
