import { ConfigureService } from './configure.service';
import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { UpdateConfigureDto } from './dto/update-configure.dto';
import { Roles } from 'src/utils/roles.decorator';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { Role } from 'src/auth/enum/role.enum';
import { RolesGuard } from 'src/guards/roles.guard';
import { UpdateConfigureVipserverDto } from './dto/update-configurevipserver.dto';
import { SkipThrottle } from '@nestjs/throttler';

@SkipThrottle()
@Controller('configure')
export class ConfigureController {
  constructor(private configureService: ConfigureService) {}

  @Get()
  async getconfigure() {
    const {
      rate_robux,
      current_balance_robux,
      logo_website,
      banner_website,
      title_website,
      keyword_website,
      description_website,
      phone_wallet,
    } = await this.configureService.getConfigure();

    return {
      rate_robux,
      current_balance_robux,
      logo_website,
      banner_website,
      title_website,
      keyword_website,
      description_website,
      phone_wallet,
      sold_robux: await this.configureService.soldrobux(),
      all_member: await this.configureService.allmember(),
      all_product: await this.configureService.allproduct(),
    };
  }

  @Post('renew')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async renewConfigure() {
    return this.configureService.renewConfigure();
  }

  @Patch()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async updateconfigure(@Body() dto: UpdateConfigureDto) {
    return this.configureService.updateConfigure(dto);
  }

  @Patch('vipserver')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async updateconfigurevipserver(@Body() dto: UpdateConfigureVipserverDto) {
    return this.configureService.updateConfigureVipserver(
      dto,
      'อัพเดทตั้งค่าสำเร็จ',
    );
  }
}
