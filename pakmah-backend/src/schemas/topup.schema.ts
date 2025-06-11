import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { Member } from './member.schema';

@Schema({ timestamps: true, versionKey: false })
export class Topup {
  @Prop({ type: SchemaTypes.ObjectId, ref: Member.name })
  member_id: Types.ObjectId;

  @Prop({ required: true, min: 0 })
  amount: number;
}

export type TopupDocument = Document & Topup;
export const TopupSchema = SchemaFactory.createForClass(Topup);
