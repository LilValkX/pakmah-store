import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Category, CategoryDocument } from '../schemas/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name)
    private categoryModel: Model<CategoryDocument>,
  ) {}

  async getCategoies() {
    const categories = await this.categoryModel.find({});
    if (!categories)
      throw new HttpException(
        {
          statusCode: 404,
          message: 'ไม่พบหมวดหมู่สินค้า',
        },
        404,
      );
    return categories;
  }

  async getCategory(id: string) {
    if (!Types.ObjectId.isValid(id))
      throw new HttpException(
        {
          statusCode: 422,
          message: 'ไอดีหมวดหมู่สินค้าไม่ถูกต้อง',
        },
        422,
      );
    const category = await this.categoryModel.findOne({ _id: id });
    if (!category)
      throw new HttpException(
        {
          statusCode: 404,
          message: 'ไม่พบหมวดหมู่สินค้าหมวดนี้',
        },
        404,
      );
    return category;
  }

  async createCategory(dto: CreateCategoryDto) {
    if (await this.categoryModel.findOne({ name: dto.name }))
      throw new HttpException(
        {
          statusCode: 409,
          message: 'ชื่อนี้หมวดหมู่นี้ถูกใช้เเล้ว',
        },
        409,
      );
    const category = new this.categoryModel(dto);
    if (await category.save())
      throw new HttpException(
        {
          statusCode: 201,
          message: 'เพิ่มหมวดหมู่สินค้าสำเร็จ',
        },
        201,
      );
  }

  async updateCategory(id: string, dto: UpdateCategoryDto) {
    const updates = Object.keys(dto);
    const allowedUpdates = ['name'];
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

    const category = await this.getCategory(id);
    updates.forEach((update) => (category[update] = dto[update]));
    if (await category.save())
      throw new HttpException(
        {
          statusCode: 200,
          message: 'อัพเดทหมวดหมู่สินค้าสำเร็จ',
        },
        200,
      );
  }

  async deleteCategory(id: string) {
    const category = await this.categoryModel.findOneAndDelete({ _id: id });
    if (!category)
      throw new HttpException(
        {
          statusCode: 404,
          message: 'ไม่พบหมวดหมู่สินค้าชิ้นนี้',
        },
        404,
      );
    throw new HttpException(
      {
        statusCode: 200,
        message: 'ลบหมวดหมู่สินค้าสำเร็จ',
      },
      200,
    );
  }
}
