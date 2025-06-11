import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { Product } from './product.schema';
import { Member } from './member.schema';
import { Status } from '../queues/enum/status.enum';

@Schema({ timestamps: true, versionKey: false })
export class Queue {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: Product.name })
  product_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: Member.name })
  member_id: Types.ObjectId;

  @Prop({ default: '' })
  message: string;

  @Prop({ enum: Status, default: Status.PENDING })
  status: Status;
}

export type QueueDocument = Document & Queue;
export const QueueSchema = SchemaFactory.createForClass(Queue);
