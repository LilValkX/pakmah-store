import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { GetMember } from 'src/utils/member.decorator';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Role } from 'src/auth/enum/role.enum';
import { Roles } from 'src/utils/roles.decorator';
import { SkipThrottle } from '@nestjs/throttler';

@SkipThrottle()
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('category')
  async getProductswithCategory() {
    return this.productsService.getProductswithCategory();
  }

  @Get('bestseller')
  async bestsellerProduct() {
    return this.productsService.bestsellerProduct();
  }

  @Get()
  async getProducts() {
    return this.productsService.getProducts();
  }

  @Get(':id')
  async getProduct(@Param('id') id: string) {
    return this.productsService.getProduct(id);
  }

  @Get('quantity/:id')
  async getProductQuantity(@Param('id') id: string) {
    return this.productsService.getProductQuantity(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async createProduct(@Body() dto: CreateProductDto) {
    return this.productsService.createProduct(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async updateProduct(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productsService.updateProduct(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }

  @Post('buy')
  @UseGuards(JwtAuthGuard)
  async buyproduct(
    @GetMember() { id },
    @Body('product_id') product_id: string,
  ) {
    return await this.productsService.buyproduct(id, product_id);
  }
}
