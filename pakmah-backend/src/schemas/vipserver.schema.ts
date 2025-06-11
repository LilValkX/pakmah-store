import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { Member } from './member.schema';

@Schema({ timestamps: true, versionKey: false })
export class Vipserver {
  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: Member.name })
  member_id: Types.ObjectId;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true, min: 0 })
  amount: number;
}

export type VipserverDocument = Document & Vipserver;
export const VipserverSchema = SchemaFactory.createForClass(Vipserver);
