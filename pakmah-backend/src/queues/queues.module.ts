import { Module, forwardRef } from '@nestjs/common';
import { QueuesService } from './queues.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Queue, QueueSchema } from '../schemas/queue.schema';
import { MembersModule } from '../members/members.module';
import { ProductsModule } from '../products/products.module';
import { QueuesController } from './queues.controller';
import { StockModule } from '../stock/stock.module';

@Module({
  imports: [
    forwardRef(() => MembersModule),
    ProductsModule,
    StockModule,
    MongooseModule.forFeature([{ name: Queue.name, schema: QueueSchema }]),
  ],
  providers: [QueuesService],
  controllers: [QueuesController],
  exports: [QueuesService],
})
export class QueuesModule {}
