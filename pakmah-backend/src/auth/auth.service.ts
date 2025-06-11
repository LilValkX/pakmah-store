import { Injectable, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { MembersService } from '../members/members.service';
import { SignupDto, SigninDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    private membersService: MembersService,
    private jwtService: JwtService,
  ) {}

  async singup(dto: SignupDto) {
    return this.membersService.createMember(dto);
  }

  async signin(dto: SigninDto) {
    const member = await this.validateMember(dto);
    const { _id, name, email, roles } = member;
    const payload = { id: _id, name, email, roles };
    const accesstoken = this.jwtService.sign({ member: payload });
    throw new HttpException(
      {
        statusCode: 200,
        accesstoken,
      },
      200,
    );
  }

  async validateMember(dto: SigninDto) {
    const { name, password } = dto;
    const member = await this.membersService.findMember(name);
    if (await compare(password, member.password)) {
      return member;
    }
    throw new HttpException(
      {
        statusCode: 401,
        message: 'รหัสผ่านไม่ถูกต้อง',
      },
      401,
    );
  }
}
