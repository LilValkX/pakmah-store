import {
  Controller,
  Get,
  Param,
  UseGuards,
  Put,
  Body,
  Delete,
  forwardRef,
  Inject,
  Post,
} from '@nestjs/common';
import { GetMember } from 'src/utils/member.decorator';
import { MembersService } from './members.service';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from 'src/utils/roles.decorator';
import { Role } from 'src/auth/enum/role.enum';
import { UpdateMemberDto } from './dto/update-member.dto';
import { QueuesService } from 'src/queues/queues.service';
import { StockService } from '../stock/stock.service';

@Controller('members')
export class MembersController {
  constructor(
    private membersService: MembersService,
    @Inject(forwardRef(() => QueuesService))
    private queueService: QueuesService,
    private stockService: StockService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async getMembers() {
    return await this.membersService.findMembers();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async getMember(@Param('id') id: string) {
    return await this.membersService.findMemberid(id);
  }

  @Post('historyrobux')
  @UseGuards(JwtAuthGuard)
  async getHistoryRobux(@GetMember() { id }) {
    return this.queueService.getQueues({ member_id: id });
  }

  @Post('historytoycode')
  @UseGuards(JwtAuthGuard)
  async getHistoryToycode(@GetMember() { id }) {
    return this.stockService.getStocks({ member_id: id });
  }

  @Post('historytopup')
  @UseGuards(JwtAuthGuard)
  async getHistoryTopup(@GetMember() { id }) {
    return this.membersService.topupHistory(id);
  }

  @Post('income/month')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
  async incomeMoneyforMonth() {
    return this.queueService.incomeMoneyforMonth();
  }

  @Post('income/topup')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
  async incomeTopup() {
    return this.membersService.incomeTopup();
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async updateMember(@Param('id') id: string, @Body() dto: UpdateMemberDto) {
    return await this.membersService.updateMember(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async deleteMember(@Param('id') id: string) {
    return await this.membersService.deleteMember(id);
  }

  @Post('topup')
  @UseGuards(JwtAuthGuard)
  async topupMember(@GetMember() { id }, @Body('link') link: string) {
    return this.membersService.topupMember(id, link);
  }
}
