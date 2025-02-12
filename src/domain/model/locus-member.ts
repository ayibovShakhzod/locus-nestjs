export class LocusMemberM {
  locusMemberId: number;
  regionId: number;
  locusId: number;
  memberShipStatus: string;

  constructor(locusMember) {
    this.locusMemberId = locusMember.id;
    this.regionId = locusMember.region_id;
    this.locusId = locusMember.locus_id;
    this.memberShipStatus = locusMember.membership_status;
  }
}
