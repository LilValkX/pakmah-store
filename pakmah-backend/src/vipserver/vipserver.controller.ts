import { VipserverDto } from './dto/vipserver.dto';
import { JwtAuthGuard } from './../guards/jwt.guard';
import { VipserverService } from './vipserver.service';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { GetMember } from 'src/utils/member.decorator';

@Controller('vipserver')
export class VipserverController {
  constructor(private vipserverService: VipserverService) {}

  @Get('balance')
  async getbalance() {
    return this.vipserverService.getBalance();
  }

  @UseGuards(JwtAuthGuard)
  @Post('firststep')
  async firststep(@GetMember() { id }, @Body() dto: VipserverDto) {
    return await this.vipserverService.firststep(dto, id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('laststep')
  async laststep(@GetMember() { id }, @Body() dto: VipserverDto) {
    return await this.vipserverService.laststep(dto, id);
  }
}
