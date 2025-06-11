import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Stock, StockDocument } from '../schemas/stock.schema';
import { Model } from 'mongoose';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';

@Injectable()
export class StockService {
  constructor(
    @InjectModel(Stock.name)
    private stockModel: Model<StockDocument>,
  ) {}

  async getStocks(condition?: object) {
    const stocks = await this.stockModel
      .find(condition)
      .populate('product_id')
      .populate('member_id');
    return stocks;
  }

  async getStock(id: string) {
    const stock = await this.stockModel.findOne({ _id: id });
    return stock;
  }

  async getStockbyproductid(product_id: string) {
    const stock = await this.stockModel.findOne({
      product_id: product_id,
      member_id: null,
    });
    if (!stock)
      throw new HttpException(
        {
          statusCode: 400,
          message: 'สินค้าหมดเเล้ว',
        },
        400,
      );
    return stock;
  }

  async getBestSellerStock() {
    const stock = await this.stockModel.aggregate([
      { $group: { _id: '$product_id', count: { $count: {} } } },
      { $sort: { count: -1 } },
      { $limit: 2 },
    ]);
    return stock;
  }

  async createStock(dto: CreateStockDto) {
    const stocks = await this.stockModel.insertMany(dto.toycodes);
    if (stocks)
      throw new HttpException(
        {
          statusCode: 201,
          message: 'สร้างสต็อกเรียบร้อย',
        },
        201,
      );
  }

  async updateStock(id: string, dto: UpdateStockDto) {
    const stocks = await this.stockModel.findOneAndUpdate(
      { _id: id },
      { $set: { member_id: dto.member_id } },
    );
    if (stocks)
      throw new HttpException(
        {
          statusCode: 201,
          message: 'อัพเดทสต็อกเรียบร้อย',
        },
        201,
      );
  }

  async deleteStock(id: string) {
    await this.stockModel.deleteOne({ _id: id });
    // if (stock)
    throw new HttpException(
      {
        statusCode: 201,
        message: 'ลบสต็อกเรียบร้อย',
      },
      201,
    );
  }
}
