import { ConfigureService } from './../configure/configure.service';
import { HttpException, Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Member, MemberDocument } from '../schemas/member.schema';
import { Model } from 'mongoose';
import { SignupDto } from '../auth/dto/auth-credentials.dto';
import { hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Topup, TopupDocument } from '../schemas/topup.schema';
import axios from 'axios';
// import { QueuesService } from '../queues/queuฦes.service';
// import { ProductsService } from 'src/products/products.service';

@Injectable()
export class MembersService {
  constructor(
    @InjectModel(Member.name)
    private memberModel: Model<MemberDocument>,
    @InjectModel(Topup.name)
    private topupModel: Model<TopupDocument>,
    private jwtService: JwtService,
    private configureService: ConfigureService, // private queuesService: QueuesService, // private productsService: ProductsService, // @Inject(forwardRef(() => ProductsService))
  ) {}

  async createMember(dto: SignupDto) {
    const { name, email, password } = dto;
    if (await this.memberModel.findOne({ name }))
      throw new HttpException(
        {
          statusCode: 409,
          message: 'ชื่อนี้ถูกใช้เเล้ว',
        },
        409,
      );
    const member = new this.memberModel({
      name,
      email,
      password: await hash(password, 10),
    });

    if (await member.save()) {
      const { _id, roles } = member;
      const payload = { id: _id, name, email, roles };
      const accesstoken = this.jwtService.sign({ member: payload });
      throw new HttpException(
        {
          statusCode: 201,
          accesstoken,
        },
        201,
      );
    }
  }

  async findMember(name: string) {
    const member = await this.memberModel.findOne({ name });
    if (!member)
      throw new HttpException(
        {
          statusCode: 404,
          message: 'ไม่พบผู้ใช้',
        },
        404,
      );
    return member;
  }

  async findMembers() {
    const member = await this.memberModel.find().select('-password');
    if (!member)
      throw new HttpException(
        {
          statusCode: 404,
          message: 'ไม่พบผู้ใช้',
        },
        404,
      );
    return member;
  }

  async findMemberid(id: string) {
    const member = await this.memberModel
      .findOne({ _id: id })
      .select('-password');
    if (!member)
      throw new HttpException(
        {
          statusCode: 404,
          message: 'ไม่พบผู้ใช้',
        },
        404,
      );
    return member;
  }

  async updateMember(id: string, dto: UpdateMemberDto) {
    // const point = (await this.findMemberid(id)).point + Number(dto.point);
    // await this.memberModel.findOneAndUpdate({ _id: id }, { $set: { point } });
    await this.memberModel.findOneAndUpdate(
      { _id: id },
      { $inc: { point: Number(dto.point) } },
    );
  }

  async deleteMember(id: string) {
    await this.memberModel.deleteOne({ _id: id });
    throw new HttpException(
      {
        statusCode: 200,
        message: 'ลบเรียบร้อย',
      },
      200,
    );
  }

  async topupMember(member_id: string, link: string) {
    const mobile = (await this.configureService.getConfigure()).phone_wallet;
    const code = link.split(/([/, =])/);
    const voucher_code = code[10];
    const { data } = await axios({
      url: `https://voucher.meowcdn.xyz/api`,
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'user-agent': 'multilabxxxxxxxx',
      },
      data: {
        mobile: mobile,
        voucher: voucher_code,
      },
    });

    if (data.status.code == 'SUCCESS') {
      await axios.post(
        'https://discord.com/api/webhooks/1015852553285685359/tHOveafOWFj8s68tKMojqnEOUOE9gVApMbLA7Q_zSrZP8CZYgUXJ6s9RgXjXigroSf_U',
        {
          content: `มีเงินเข้าจำนวน ${~~data.data.voucher
            .redeemed_amount_baht}`,
        },
      );
      const topup = new this.topupModel({
        member_id,
        amount: ~~data.data.voucher.redeemed_amount_baht,
      });
      if (await topup.save()) {
        await this.updateMember(member_id, {
          point: ~~data.data.voucher.redeemed_amount_baht,
        });
        throw new HttpException(
          `เติมพอทย์เป็นจำนวน ${data.data.voucher.redeemed_amount_baht} พอยท์เรียบร้อย`,
          200,
        );
      }
    }
    throw new HttpException('ซองไม่สามารถใช้ได้เเล้ว', 400);
  }

  async topupHistory(member_id: string) {
    const topups = this.topupModel
      .find({ member_id })
      .populate('member_id')
      .select('-password');
    return topups;
  }

  async incomeTopup() {
    const topup = await this.topupModel.find();
    return topup.reduce(
      (accumulator, current) => accumulator + current.amount,
      0,
    );
  }
}

/**const code: string = link.replace(
      'https://gift.truemoney.com/campaign/?v=',
      '',
    );
    if (code.length != 18)
      throw new HttpException(
        {
          statusCode: 400,
          message: 'ลิ้งซองไม่ถูกต้อง',
        },
        400,
      );
    try {
      const { data } = await axios.post(
        `https://gift.truemoney.com/campaign/vouchers/${code}/redeem`,
        {
          mobile: '0619560808',
          voucher_hash: code,
        },
        {
          httpsAgent: new https.Agent({
            minVersion: 'TLSv1.3',
            maxVersion: 'TLSv1.3',
          }),
        },
      );
      var result = data;
    } catch (err) {
      console.log(err);
      throw new HttpException(
        {
          statusCode: 400,
          message: err.response.data?.status.message,
        },
        400,
      );
    }
    const topup = new this.topupModel({
      member_id,
      amount: ~~result.data.voucher.amount_baht,
    });
    if (topup.save()) {
      await this.updateMember(member_id, {
        point: ~~result.data.voucher.amount_baht,
      });
      throw new HttpException(
        {
          statusCode: 200,
          message: `เติมพอทย์เป็นจำนวน ${result.data.voucher.amount_baht} พอยท์เรียบร้อย`,
        },
        200,
      );
    } */
