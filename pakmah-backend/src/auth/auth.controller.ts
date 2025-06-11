import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto, SigninDto } from './dto/auth-credentials.dto';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { GetMember } from '../utils/member.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: SignupDto) {
    return this.authService.singup(dto);
  }

  @Post('signin')
  async signin(@Body() dto: SigninDto) {
    return this.authService.signin(dto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async profile(@GetMember() member: any) {
    return member;
  }
}
