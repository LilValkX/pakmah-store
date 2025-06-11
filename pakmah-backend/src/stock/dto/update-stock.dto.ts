import { IsMongoId, IsString } from 'class-validator';

export class UpdateStockDto {
  @IsMongoId()
  member_id: string;
}
