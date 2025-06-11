import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Configure {
  @Prop({ required: true })
  cookie_roblox: string;

  @Prop({ required: true })
  id_roblox: string;

  @Prop({ required: true })
  rate_robux: string;

  @Prop({ required: true, default: 0 })
  current_balance_robux: number;

  @Prop({ required: true })
  logo_website: string;

  @Prop({ required: true })
  title_website: string;

  @Prop({ required: true })
  keyword_website: string;

  @Prop({ required: true })
  description_website: string;

  @Prop({ required: true })
  phone_wallet: string;

  @Prop({ required: true })
  banner_website: string[];
}

export type ConfigureDocument = Document & Configure;
export const ConfigureSchema = SchemaFactory.createForClass(Configure);
