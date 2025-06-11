import { Product, ProductSchema } from './../schemas/product.schema';
import { MemberSchema } from './../schemas/member.schema';
import { Vipserver, VipserverSchema } from './../schemas/vipserver.schema';
import { Module } from '@nestjs/common';
import { ConfigureService } from './configure.service';
import { ConfigureController } from './configure.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigureSchema, Configure } from '../schemas/configure.schema';
import { Member } from 'src/schemas/member.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Configure.name, schema: ConfigureSchema },
      { name: Vipserver.name, schema: VipserverSchema },
      { name: Member.name, schema: MemberSchema },
      { name: Product.name, schema: ProductSchema },
    ]),
  ],
  providers: [ConfigureService],
  controllers: [ConfigureController],
  exports: [ConfigureService],
})
export class ConfigureModule {}
