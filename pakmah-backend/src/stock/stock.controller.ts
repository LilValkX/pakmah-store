import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Get,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { StockService } from './stock.service';
import { UpdateStockDto } from './dto/update-stock.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/utils/roles.decorator';
import { Role } from 'src/auth/enum/role.enum';

@Controller('stock')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class StockController {
  constructor(private stockService: StockService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async getStocks() {
    return await this.stockService.getStocks();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async getStock(@Param('id') id: string) {
    return await this.stockService.getStock(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async createStock(@Body() dto: CreateStockDto) {
    return await this.stockService.createStock(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async updateStock(@Param('id') id: string, @Body() dto: UpdateStockDto) {
    return await this.stockService.updateStock(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async deleteStock(@Param('id') id: string) {
    return await this.stockService.deleteStock(id);
  }
}
