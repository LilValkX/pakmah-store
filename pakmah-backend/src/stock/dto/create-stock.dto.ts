import { IsArray } from 'class-validator';

export class CreateStockDto {
  @IsArray()
  toycodes: object[];
}
