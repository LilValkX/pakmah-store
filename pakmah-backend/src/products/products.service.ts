import { HttpException, Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from '../schemas/product.schema';
import { Model, Types } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { MembersService } from 'src/members/members.service';
import { StockService } from 'src/stock/stock.service';
import { QueuesService } from '../queues/queues.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
    @Inject(forwardRef(() => MembersService))
    private membersService: MembersService,
    private stockService: StockService,
    @Inject(forwardRef(() => QueuesService))
    private queuesService: QueuesService,
  ) {}

  async getProductswithCategory() {
    const products = await this.productModel.aggregate([
      {
        $group: {
          _id: '$category',
          data: {
            $push: {
              _id: '$_id',
              name: '$name',
              description: '$description',
              image: '$image',
              type: '$type',
              price: '$price',
            },
          },
        },
      },
      { $sort: { _id: -1 } },
    ]);
    if (!products)
      throw new HttpException(
        {
          statusCode: 404,
          message: 'ไม่พบสินค้า',
        },
        404,
      );
    return products;
  }

  async getProducts() {
    const products = await this.productModel.find().populate('category');
    if (!products)
      throw new HttpException(
        {
          statusCode: 404,
          message: 'ไม่พบสินค้าชิ้นนี้',
        },
        404,
      );
    return products;
  }

  async getProduct(id: string) {
    if (!Types.ObjectId.isValid(id))
      throw new HttpException(
        {
          statusCode: 422,
          message: 'ไอดีสินค้าไม่ถูกต้อง',
        },
        422,
      );
    const product = await this.productModel
      .findOne({ _id: id })
      .populate('category');
    if (!product)
      throw new HttpException(
        {
          statusCode: 404,
          message: 'ไม่พบสินค้าชิ้นนี้',
        },
        404,
      );
    return product;
  }

  async getProductQuantity(id: string) {
    const product = await this.stockService.getStocks({
      product_id: id,
      member_id: null,
    });
    return ~~product.length;
  }

  async createProduct(dto: CreateProductDto) {
    if (await this.productModel.findOne({ name: dto.name }))
      throw new HttpException(
        {
          statusCode: 409,
          message: 'ชื่อนี้ถูกใช้เเล้ว',
        },
        409,
      );
    const product = new this.productModel(dto);
    if (await product.save())
      throw new HttpException(
        {
          statusCode: 201,
          message: 'เพิ่มสินค้าสำเร็จ',
        },
        201,
      );
  }

  async updateProduct(id: string, dto: UpdateProductDto) {
    const updates = Object.keys(dto);
    const allowedUpdates = [
      'name',
      'description',
      'category',
      'image',
      'type',
      'price',
    ];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update),
    );

    if (!isValidOperation)
      throw new HttpException(
        {
          statusCode: 422,
          message: 'ไม่สามารถอัพเดทสินคค้าได้',
        },
        422,
      );

    const product = await this.getProduct(id);
    updates.forEach((update) => (product[update] = dto[update]));
    if (await product.save())
      throw new HttpException(
        {
          statusCode: 200,
          message: 'อัพเดทสินค้าสำเร็จ',
        },
        200,
      );
  }

  async deleteProduct(id: string) {
    const product = await this.productModel.findOneAndDelete({ _id: id });
    if (!product)
      throw new HttpException(
        {
          statusCode: 404,
          message: 'ไม่พบสินค้าชิ้นนี้',
        },
        404,
      );
    throw new HttpException(
      {
        statusCode: 200,
        message: 'ลบสินค้าสำเร็จ',
      },
      200,
    );
  }

  async buyproduct(member_id: string, product_id: string) {
    const member = await this.membersService.findMemberid(member_id);
    const product = await this.getProduct(product_id);
    if (member.point < product.price)
      throw new HttpException(
        {
          statusCode: 400,
          message: 'ยอดเงินไม่เพียงพอ',
        },
        400,
      );
    const stock = await this.stockService.getStockbyproductid(product._id);
    if (stock) {
      await this.membersService.updateMember(member._id, {
        point: -product.price,
      });
      await this.stockService.updateStock(stock._id, { member_id: member._id });
    }
  }

  async bestsellerProduct() {
    const mostStock = await this.stockService.getBestSellerStock();
    const mostQueue = await this.queuesService.getBestSellerQueue();
    return { mostStock, mostQueue };
  }
}
