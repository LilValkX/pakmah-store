import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { Member } from './member.schema';
import { Product } from './product.schema';

@Schema({ timestamps: true, versionKey: false })
export class Stock {
  @Prop({ required: true })
  toycode: string;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: Product.name })
  product_id: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: Member.name, default: null })
  member_id: Types.ObjectId;
}

export type StockDocument = Document & Stock;
export const StockSchema = SchemaFactory.createForClass(Stock);
