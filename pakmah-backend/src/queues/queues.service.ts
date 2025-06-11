import { Injectable, HttpException, Inject, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Queue, QueueDocument } from '../schemas/queue.schema';
import { Model } from 'mongoose';
import { CreateQueueDto } from './dto/create-queue.dto';
import { MembersService } from '../members/members.service';
import { ProductsService } from 'src/products/products.service';
import { UpdateQueueDto } from './dto/update-queue.dto';
import { Status } from './enum/status.enum';

@Injectable()
export class QueuesService {
  constructor(
    @InjectModel(Queue.name)
    private queueModel: Model<QueueDocument>,
    @Inject(forwardRef(() => MembersService))
    private membersService: MembersService,
    @Inject(forwardRef(() => ProductsService))
    private productsService: ProductsService,
  ) {}

  async createQueue(dto: CreateQueueDto, member_id: any) {
    const { product_id } = dto;
    const member = await this.membersService.findMemberid(member_id);
    const product = await this.productsService.getProduct(product_id);

    if (member.point < product.price)
      throw new HttpException(
        {
          statusCode: 400,
          message: 'ยอดเงินไม่เพียงพอ',
        },
        400,
      );
    const queue = new this.queueModel({ ...dto, member_id: member._id });
    if (queue.save()) {
      await this.membersService.updateMember(member._id, {
        point: -product.price,
      });
      throw new HttpException(
        {
          statusCode: 201,
          message: 'สร้างคิวเรียบร้อย',
        },
        201,
      );
    }
  }

  async getQueues(condition?: object) {
    const queues = await this.queueModel
      .find(condition)
      .populate('product_id')
      .populate('member_id')
      .select('-name')
      .select('-password');
    return queues;
  }

  async getQueuesnyCondition(condition: object) {
    const queues = await this.queueModel
      .find(condition)
      .populate('product_id')
      .populate('member_id')
      .select('-name')
      .select('-password');
    return queues;
  }

  async getQueue(id: string) {
    const queue = await this.queueModel
      .findOne({ _id: id })
      .populate('product_id')
      .populate('member_id');
    return queue;
  }

  async updateQueue(id: string, dto: UpdateQueueDto) {
    if (dto.status === Status.FAILED)
      await this.membersService.updateMember(dto.member_id, {
        point: dto.product_price,
      });
    await this.queueModel.findOneAndUpdate(
      { _id: id },
      { $set: { status: dto.status, message: dto.message } },
    );
    throw new HttpException(
      {
        statusCode: 200,
        message: 'อัพเดทคิวเรียร้อย',
      },
      200,
    );
  }

  async getBestSellerQueue() {
    const queue = await this.queueModel.aggregate([
      { $group: { _id: '$product_id', count: { $count: {} } } },
      { $sort: { count: -1 } },
      { $limit: 2 },
    ]);
    return queue;
  }

  async incomeMoneyforMonth() {
    const date = new Date();
    const previousMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);

    const income = await this.queueModel.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $lookup: {
          from: 'products',
          localField: 'product_id',
          foreignField: '_id',
          as: 'product',
        },
      },
      { $unwind: '$product' },
      {
        $project: {
          month: { $month: '$createdAt' },
          price: '$product.price',
        },
      },
      {
        $group: {
          _id: '$month',
          total: { $sum: '$price' },
        },
      },
    ]);
    return income;
  }

  // async incomeMoneyforWeek() {
  //   const date = new Date();
  //   const previousWeek = new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000);

  //   const income = await this.queueModel.aggregate([
  //     { $match: { createdAt: { $gte: previousWeek } } },
  //     {
  //       $lookup: {
  //         from: 'products',
  //         localField: 'product_id',
  //         foreignField: '_id',
  //         as: 'product',
  //       },
  //     },
  //     { $unwind: '$product' },
  //     {
  //       $project: {
  //         week: { $week: '$createdAt' },
  //         price: '$product.price',
  //       },
  //     },
  //     {
  //       $group: {
  //         _id: '$week',
  //         total: { $sum: '$price' },
  //       },
  //     },
  //   ]);
  //   return income;
  // }

  // async getSoldQueue() {
  //   const sum = await this.queueModel.find().populate('product_id');
  //   return sum;
  // }
}
