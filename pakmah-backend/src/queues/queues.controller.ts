import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { QueuesService } from './queues.service';
import { CreateQueueDto } from './dto/create-queue.dto';
import { GetMember } from 'src/utils/member.decorator';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from 'src/utils/roles.decorator';
import { Role } from 'src/auth/enum/role.enum';
import { UpdateQueueDto } from './dto/update-queue.dto';

@Controller('queues')
export class QueuesController {
  constructor(private queuesService: QueuesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createQueue(@Body() dto: CreateQueueDto, @GetMember() { id }) {
    return await this.queuesService.createQueue(dto, id);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async getQueues() {
    return await this.queuesService.getQueues();
  }

  @Post('condition')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async getQueuesnyCondition(@Body('condition') condition: object) {
    return await this.queuesService.getQueuesnyCondition(condition);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async getQueue(@Param('id') id: string) {
    return await this.queuesService.getQueue(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async updateQueue(@Param('id') id: string, @Body() dto: UpdateQueueDto) {
    return await this.queuesService.updateQueue(id, dto);
  }
}
