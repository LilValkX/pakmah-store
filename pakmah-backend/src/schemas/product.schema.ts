import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { ProductType } from 'src/products/enum/product.dto';
import { Category } from './category.schema';

@Schema({ timestamps: true, versionKey: false })
export class Product {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: Category.name })
  category: Types.ObjectId;

  @Prop({ required: true })
  image: string;

  @Prop({ enum: ProductType, required: true })
  type: ProductType;

  @Prop({ required: true, default: 0, min: 0 })
  price: number;
}

export type ProductDocument = Document & Product;
export const ProductSchema = SchemaFactory.createForClass(Product);
