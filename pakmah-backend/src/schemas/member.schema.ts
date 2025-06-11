import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../auth/enum/role.enum';

@Schema({ timestamps: true, versionKey: false })
export class Member {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 0, min: 0 })
  point: number;

  @Prop({ enum: Role, default: Role.MEMBER })
  roles: Role;
}

export type MemberDocument = Document & Member;
export const MemberSchema = SchemaFactory.createForClass(Member);
