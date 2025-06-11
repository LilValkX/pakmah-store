import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsService } from './products.service';
import { Product, ProductSchema } from '../schemas/product.schema';
import { ProductsController } from './products.controller';
import { MembersModule } from '../members/members.module';
import { StockModule } from '../stock/stock.module';
import { QueuesModule } from '../queues/queues.module';

@Module({
  imports: [
    forwardRef(() => MembersModule),
    StockModule,
    forwardRef(() => QueuesModule),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  providers: [ProductsService],
  controllers: [ProductsController],
  exports: [ProductsService],
})
export class ProductsModule {}
