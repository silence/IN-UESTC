/**
 * @file request.js
 * @desc 异步请求客户端
*/

import urls from "./urls";

const { $Message } = require('../../dist/iview/base/index');

const baseConfig = {
  baseUrl: "http://localhost:3000",
  responseType: "json",
  dataType: "json",
  headers: {
    "Content-Type": "application/json"
  }
};

function HttpServer() {
  this.config = baseConfig;
}

HttpServer.prototype.request = function(url, data, method) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data: {...data},
      method: method,
      header: this.config.headers,
      dataType: this.config.dataType,
      responseType: this.config.responseType,
      success: res => {
        if (res.code === 0) {
          resolve(res.data);
        } else {
          reject(res.message);
        }
      },
      fail: res => {
        reject(res.message);
        $Message({
          content: '这是一条错误提醒',
          type: 'error'
        });
      }
    })
  });
};

HttpServer.prototype.post = function(url, data) {
  this.request(url, data, "POST");
};

HttpServer.prototype.get = function(url) {
  this.request(url, data, "GET");
};

Object.keys(urls).forEach(name => {
  HttpServer.prototype[name] = function(data) {
    let { method, url } = urls.name;

    this[method](url, data);
  };
});

const httpClient = new HttpServer();

export default httpClient;
