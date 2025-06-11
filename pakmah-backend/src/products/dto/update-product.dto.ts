import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ProductType } from '../enum/product.dto';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsOptional()
  @IsEnum(ProductType)
  type?: ProductType;

  @IsString()
  @IsOptional()
  price?: string;
}
