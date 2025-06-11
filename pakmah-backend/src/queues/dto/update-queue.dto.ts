import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Status } from '../enum/status.enum';

export class UpdateQueueDto {
  @IsEnum(Status)
  status: Status;

  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @IsNumber()
  product_price?: number;

  @IsOptional()
  @IsString()
  member_id?: string;
}
