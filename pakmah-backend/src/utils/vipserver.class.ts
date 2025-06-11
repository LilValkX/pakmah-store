'use strict';
const axios = require('axios');
const formUrlEncoded = (x) =>
  Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '');

export default class Vipserver {
  constructor(cookieRaw) {
    axios.defaults.headers.common['cookie'] = cookieRaw;
    axios.defaults.headers.common['sec-fetch-dest'] = 'empty';
    axios.defaults.headers.common['sec-fetch-mode'] = 'cors';
    axios.defaults.headers.common['sec-fetch-site'] = 'same-origin';
    axios.defaults.headers.common['user-agent'] =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36 Edg/88.0.705.81';
    axios.defaults.headers.common['origin'] = 'https://www.roblox.com';
    axios.defaults.headers.common['content-type'] =
      'application/x-www-form-urlencoded; charset=UTF-8';
  }
  async checkuser(username: string) {
    try {
      var result = await axios.get(
        'http://api.roblox.com/users/get-by-username?username=' + username,
      );
      if (result.data.success == false) {
        return { success: false };
      } else {
        return { success: true, id: result.data.Id };
      }
    } catch (e) {
      return { success: false };
    }
  }
  async getdataprofile(id: number) {
    var image_rawdata = await axios.get(
      'https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=' +
        id +
        '&size=150x150&format=png',
    );
    var place_rawdata = await axios.get(
      'https://www.roblox.com/users/profile/playergames-json?userId=' + id,
    );
    return {
      username: place_rawdata.data.Games[0].CreatorName,
      userId: id,
      avatar: image_rawdata.data.data[0].imageUrl,
      placeId: place_rawdata.data.Games[0].PlaceID,
    };
  }
  async tax(amount: number) {
    var percent = 42.86;
    var tax = (amount * percent) / 100;
    return this.round(tax, 0);
  }
  async checkplace(placeId: string) {
    try {
      var result_raw = await axios.get(
        'https://www.roblox.com/games/' + placeId,
      );
      var data = result_raw.data;
      if (data.isValid == false) {
        return null;
      } else {
        return {
          __RequestVerificationToken: data
            .split(
              '<input name="__RequestVerificationToken" type="hidden" value="',
            )
            .pop()
            .split('" />')[0],
          universeId: data.split('data-universe-id="').pop().split('"')[0],
          privateServerName: 'Multilab',
          productId: data
            .split('data-private-server-product-id="')
            .pop()
            .split('"')[0],
          expectedCurrency: 1,
          expectedPrice: data
            .split('data-private-server-price="')
            .pop()
            .split('"')[0],
          expectedSellerId: data.split('data-seller-id="').pop().split('"')[0],
          csrf: data
            .split('<meta name="csrf-token" data-token="')
            .pop()
            .split('" />')[0],
        };
      }
    } catch (e) {
      return null;
    }
  }

  async sendrobux(data: any) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = data.csrf;
    var response = await axios({
      method: 'post',
      url: 'https://games.roblox.com/v1/games/vip-servers/' + data.universeId,
      data: formUrlEncoded({
        expectedPrice: data.expectedPrice,
        name: 'Multilab',
      }),
    });
    return response;
  }

  async checkrobux(userId: any) {
    try {
      const result = await axios.get(
        'https://economy.roblox.com/v1/users/' + userId + '/currency',
      );
      const { robux } = result?.data;
      console.log('update robux -> ', robux);
      return robux;
    } catch (e) {
      console.log('error to update robux -> ', e);
      return 0;
    }
  }
  cutstring(start: any, end: any, str: any) {
    return str.split(start).pop().split(end)[0];
  }
  round(value: any, precision: any) {
    if (Number.isInteger(precision)) {
      var shift = Math.pow(10, precision);
      return Math.round(value * shift + 0.00000000000001) / shift;
    } else {
      return Math.round(value);
    }
  }
}
