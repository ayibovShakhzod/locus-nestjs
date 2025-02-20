import { IsOptional, IsEnum, IsInt, IsString, Min, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

export enum SideloadingEnum {
  LOCUS_MEMBERS = 'locusMembers',
}

export class LocusFilterDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  id?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  assemblyId?: number;

  @IsOptional()
  @IsEnum([86118093, 86696489, 88186467])
  regionId?: number;

  @IsOptional()
  @IsString()
  membershipStatus?: string;

  @IsOptional()
  @IsEnum(SideloadingEnum)
  sideloading?: SideloadingEnum;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  page: number = 1;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  rows: number = 1000;

  @IsOptional()
  @IsIn(['id', 'assemblyId', 'locusStart', 'locusStop'])
  sortBy?: string;

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sortOrder: 'ASC' | 'DESC' = 'ASC';
}
