import { Vipserver, VipserverSchema } from './../schemas/vipserver.schema';
import { ConfigureModule } from './../configure/configure.module';
import { MembersModule } from './../members/members.module';
import { Module } from '@nestjs/common';
import { VipserverService } from './vipserver.service';
import { VipserverController } from './vipserver.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MembersModule,
    ConfigureModule,
    MongooseModule.forFeature([
      { name: Vipserver.name, schema: VipserverSchema },
    ]),
  ],
  providers: [VipserverService],
  controllers: [VipserverController],
})
export class VipserverModule {}
