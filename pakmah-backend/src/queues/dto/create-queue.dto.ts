import { IsString } from 'class-validator';

export class CreateQueueDto {
  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsString()
  product_id: string;
}
