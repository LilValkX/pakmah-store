import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateConfigureDto {
  // @IsString()
  // @IsOptional()
  // cookie_roblox?: string;

  // @IsNumber()
  // @IsOptional()
  // id_roblox?: number;

  @IsString()
  @IsOptional()
  logo_website?: string;

  @IsArray()
  @IsOptional()
  banner_website?: string[];

  @IsString()
  @IsOptional()
  title_website?: string;

  @IsString()
  @IsOptional()
  keyword_website?: string;

  @IsString()
  @IsOptional()
  description_website?: string;

  @IsString()
  @IsOptional()
  phone_wallet?: string;

  @IsString()
  @IsOptional()
  rate_robux?: string;
}
