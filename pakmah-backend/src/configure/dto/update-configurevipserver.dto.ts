import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateConfigureVipserverDto {
  @IsString()
  // @IsOptional()
  cookie_roblox: string;

  @IsString()
  // @IsOptional()
  id_roblox: string;

  // @IsNumber()
  // @IsOptional()
  // rate_roblox?: number;
}
