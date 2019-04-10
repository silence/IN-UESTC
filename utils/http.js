const baseUrl = '';
const { $Message } = require('../dist/iview/base/index');

const http = ({ url = '', methods, params = {}}) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + url,
      method: methods,
      data: params,
      header: {
        'Content-Type': 'application/json'
      },
      dataType: 'json',
      complete: res => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          if (res.data && res.data.status) {
            resolve(res.data.data);
          } else {
            const { errCode, errMsg } = res.data;
            reject({
              errCode,
              errMsg,
            });
            $Message({
              type: 'error',
              content: `Error: ${errCode} ${errMsg}`
            });
          }
        } else {
          reject(res);
        }
      }
    })
  });
};

module.exports = http;