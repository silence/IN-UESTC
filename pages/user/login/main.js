// pages/user/login/main.js
const encryptAES = require('./encrypt.js');
const http = require('../../../utils/http.js');
const { $Message } = require('../../../dist/iview/base/index');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: '',
    code: '',
    errMsg: '',
    codeImg: '',
    key: '123'
  },

  submitHandle() {
    const encryptedPassWord = encryptAES(this.data.password, this.data.key);
    console.log(this.data.username, encryptedPassWord, this.data.code);
    wx.navigateBack({
      delta: 1,
      complete() {
        $Message({ type: 'success', content: '登陆成功' })
        wx.setStorage({
          key: 'auth',
          data: true,
        });
        let pages = getCurrentPages();
        pages[pages.length - 1].setData({ isBound: true })
      }
    });
    // http(url, {username, password: encryptedPassWord, code}, 'POST')
    //   .then(data => {

    //   });
  },

  usernameHandle(event) {
    this.setData({
      username: event.detail.detail.value
    });
  },

  pwdHandle(event) {
    this.setData({
      password: event.detail.detail.value
    });
  },

  codeHandle(event) {
    this.setData({
      code: event.detail.value
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    // http(url, {}, 'GET').then(data => {
    //   this.setData({
    //     code: data.codeImg,
    //     key: data.key
    //   })
    // })
  }
    
})