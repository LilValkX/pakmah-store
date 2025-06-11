import { Product, ProductDocument } from './../schemas/product.schema';
import { Member } from 'src/schemas/member.schema';
import { MemberDocument } from './../schemas/member.schema';
import { Vipserver, VipserverDocument } from './../schemas/vipserver.schema';
import { UpdateConfigureDto } from './dto/update-configure.dto';
import { Configure, ConfigureDocument } from './../schemas/configure.schema';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import vipserver from '../utils/vipserver.class';
import { UpdateConfigureVipserverDto } from './dto/update-configurevipserver.dto';

@Injectable()
export class ConfigureService {
  vipservercon: vipserver;

  constructor(
    @InjectModel(Configure.name)
    private configureModel: Model<ConfigureDocument>,
    @InjectModel(Vipserver.name)
    private vipserverModel: Model<VipserverDocument>,
    @InjectModel(Member.name)
    private memberModel: Model<MemberDocument>,
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
  ) {
    this.initClass();
  }

  async initClass() {
    this.vipservercon = new vipserver(
      (await this.getConfigure())?.cookie_roblox,
    );
  }

  async allmember() {
    const members = await this.memberModel.find();
    return members.length;
  }

  async allproduct() {
    const products = await this.productModel.find();
    return products.length;
  }

  async soldrobux() {
    const robuxs = await this.vipserverModel.find();
    return robuxs.reduce(
      (accumulator, current) => accumulator + current.amount,
      0,
    );
  }

  async getConfigure() {
    const configure = await this.configureModel
      .findOne()
      .sort({ created_at: -1 });
    return configure;
  }

  async renewConfigure() {
    const id = await (await this.getConfigure()).id;
    const data = {
      cookie_roblox: '',
      id_roblox: '',
      rate_robux: '',
      current_balance_robux: 0,
      logo_website: '',
      title_website: '',
      keyword_website: '',
      description_website: '',
      phone_wallet: '',
      banner_website: '',
    };
    const update = await this.configureModel.findByIdAndUpdate(id, data);
    if (update) {
      throw new HttpException('รีสำเร็จ', 200);
    }
  }

  async updateConfigure(dto: UpdateConfigureDto) {
    const id = await (await this.getConfigure()).id;
    const update = await this.configureModel.findByIdAndUpdate(id, {
      $set: dto,
    });
    if (update) {
      throw new HttpException('อัพเดทตั้งค่าสำเร็จ', 200);
    }
  }

  async updateConfigureVipserver(
    dto: UpdateConfigureVipserverDto,
    message: string,
  ) {
    const id = await (await this.getConfigure()).id;
    const current_balance_robux = await this.vipservercon.checkrobux(
      dto.id_roblox,
    );

    const update = await this.configureModel.findByIdAndUpdate(id, {
      $set: {
        ...dto,
        id_roblox: dto.id_roblox,
        current_balance_robux,
      },
    });
    if (update) {
      throw new HttpException(message, 200);
    }
  }
}
