import { IsNumber, IsString } from 'class-validator';

export class VipserverDto {
  @IsString()
  username: string;

  @IsNumber()
  amount: number;
}
