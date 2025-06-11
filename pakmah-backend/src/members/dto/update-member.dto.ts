import { IsNumber, IsOptional } from 'class-validator';

export class UpdateMemberDto {
  @IsOptional()
  @IsNumber()
  point?: number;
}
