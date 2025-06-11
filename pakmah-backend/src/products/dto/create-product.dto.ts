import { IsEnum, IsNumber, IsString } from 'class-validator';
import { ProductType } from '../enum/product.dto';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  category: string;

  @IsString()
  image: string;

  @IsEnum(ProductType)
  type: ProductType;

  @IsString()
  price: string;
}
