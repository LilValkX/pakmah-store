import { UpdateConfigureVipserverDto } from './../configure/dto/update-configurevipserver.dto';
import { VipserverDocument } from './../schemas/vipserver.schema';
import { VipserverDto } from './dto/vipserver.dto';
import { ConfigureService } from './../configure/configure.service';
import { MembersService } from './../members/members.service';
import vipserver from '../utils/vipserver.class';
import { Injectable, HttpException } from '@nestjs/common';
import { Mutex, MutexInterface } from 'async-mutex';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vipserver } from './../schemas/vipserver.schema';

@Injectable()
export class VipserverService {
  private lock: Map<string, MutexInterface>;
  vipservercon: vipserver;

  constructor(
    private membersService: MembersService,
    private configureServices: ConfigureService,
    @InjectModel(Vipserver.name)
    private vipserverModel: Model<VipserverDocument>,
  ) {
    this.lock = new Map();
    this.initClass();
  }

  async initClass() {
    this.vipservercon = new vipserver(
      (await this.configureServices.getConfigure())?.cookie_roblox,
    );
  }

  async getBalance() {
    return (await this.configureServices.getConfigure()).current_balance_robux;
  }

  async taxCalculator(amount: number) {
    let configure = await this.configureServices.getConfigure();
    let CalRate = amount * Number(configure.rate_robux);
    let CalTax = (CalRate += await this.vipservercon.tax(CalRate));
    if (CalRate && CalTax) {
      return {
        robuxtax: CalTax,
      };
    }

    throw new HttpException('ไม่สามารถดึงข้อมูลได้', 400);
  }

  async firststep(dto: VipserverDto, member_id: any) {
    if (dto.amount < 10)
      throw new HttpException('เติมขั้นต่ำ 10 บาทเท่านั้น', 400);
    const { point } = await this.membersService.findMemberid(member_id);

    if (dto.amount > point)
      throw new HttpException('ยอดเงินคงเหลือไม่เพียงพอ', 400);
    const checkuser = await this.vipservercon.checkuser(dto.username);

    if (!checkuser.success)
      throw new HttpException('ไม่พบผู้ใช้ใน Roblox', 400);

    const robloxuser = await this.vipservercon.getdataprofile(checkuser.id);
    const { robuxtax } = await this.taxCalculator(dto.amount);
    if (robuxtax >= 500)
      throw new HttpException('ควรเติม Robux ไม่เกิน 500 โรบัค', 400);
    if ((await this.getBalance()) < robuxtax)
      throw new HttpException('Robux ไม่เพียงพอ', 400);
    if (robloxuser) {
      return {
        roblox_avatar: robloxuser.avatar,
        place_url: `https://www.roblox.com/games/${robloxuser.placeId}`,
      };
    } else {
      throw new HttpException('ไม่พบชื่อใน Roblox', 400);
    }
  }

  async laststep(dto: VipserverDto, member_id: any) {
    if (!this.lock.has(member_id)) {
      this.lock.set(member_id, new Mutex());
    }

    if (dto.amount < 10) throw new HttpException('ต้องเติมขั้น 10 บาท', 400);
    const release = await this.lock.get(member_id).acquire();
    const configure = await this.configureServices.getConfigure();
    const { point } = await this.membersService.findMemberid(member_id);

    const robuxraw = dto.amount * Number(configure.rate_robux);
    if (dto.amount > point) {
      release();
      throw new HttpException('ยอดเงินคงเหลือไม่เพียงพอ', 400);
    }
    if ((await this.getBalance()) < robuxraw) {
      release();
      throw new HttpException('Robux ไม่เพียงพอ', 400);
    }

    await this.membersService.updateMember(member_id, {
      point: -dto.amount,
    });

    const robloxuser = await this.vipservercon.checkuser(dto.username);
    if (robloxuser.success) {
      const customerprofile = await this.vipservercon.getdataprofile(
        robloxuser.id,
      );
      const costomerplace = await this.vipservercon.checkplace(
        customerprofile.placeId,
      );
      const { robuxtax } = await this.taxCalculator(dto.amount);
      if (Number(costomerplace.expectedPrice) != robuxtax) {
        release();

        await this.membersService.updateMember(member_id, {
          point: dto.amount,
        });

        throw new HttpException('ราคา Vipserver ไม่ตรงตามกำหนด', 400);
      }

      await this.vipservercon.sendrobux(costomerplace).catch(async () => {
        release();
        await this.membersService.updateMember(member_id, {
          point: dto.amount,
        });
      });
      const configure = await this.configureServices.getConfigure();
      const dtovipserver: UpdateConfigureVipserverDto = {
        id_roblox: configure.id_roblox,
        cookie_roblox: configure.cookie_roblox,
      };
      const manager = await this.vipserverModel.create({
        member_id,
        username: dto.username,
        amount: robuxraw,
      });

      if (manager) {
        release();
        await this.configureServices.updateConfigureVipserver(
          dtovipserver,
          'สั่งซื้อสินค้าสำเร็จ',
        );
        // throw new HttpException('สั่งซื้อสินค้าสำเร็จ', 200);
      }
    } else {
      throw new HttpException('ไม่พบชื่อใน Roblox', 400);
    }
  }
}
