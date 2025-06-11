import { ConfigureModule } from './../configure/configure.module';
import { ProductsModule } from './../products/products.module';
import { forwardRef, Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Member, MemberSchema } from '../schemas/member.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MembersController } from './members.controller';
import { QueuesModule } from '../queues/queues.module';
import { StockModule } from '../stock/stock.module';
import { Topup, TopupSchema } from 'src/schemas/topup.schema';

@Module({
  imports: [
    // forwardRef(() => ProductsModule),
    forwardRef(() => QueuesModule),
    ConfigureModule,
    StockModule,
    PassportModule,
    JwtModule.register({
      secret: 'pakmah_gay',
      signOptions: { expiresIn: 60 * 60 * 24 },
    }),
    MongooseModule.forFeature([
      { name: Member.name, schema: MemberSchema },
      { name: Topup.name, schema: TopupSchema },
    ]),
  ],
  providers: [MembersService],
  exports: [MembersService],
  controllers: [MembersController],
})
export class MembersModule {}
