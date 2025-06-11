import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MembersModule } from './members/members.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { QueuesModule } from './queues/queues.module';
import { StockModule } from './stock/stock.module';
import { VipserverModule } from './vipserver/vipserver.module';
import { ConfigureModule } from './configure/configure.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

//

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://memon:tomonxc9@cluster0.tclhf48.mongodb.net/pakmah',
    ),
    QueuesModule,
    MembersModule,
    AuthModule,
    ProductsModule,
    CategoriesModule,
    StockModule,
    VipserverModule,
    ConfigureModule,
    ThrottlerModule.forRoot({
      ttl: 160,
      limit: 20,
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    }, // To guard globally
  ],
})
export class AppModule {}
