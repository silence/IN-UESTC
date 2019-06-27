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
    args: {},
    cookies: ''
  },

  submitHandle(event) {
    if (!this.data.username || !this.data.password) return;
    const encryptedPassWord = encryptAES(this.data.password, this.data.args.key);
    const data = {
      args: {
        ...this.data.args,
        studentId: this.data.username,
        password: encryptedPassWord
      },
      cookies: this.data.cookies
    };
    console.log(data);
    http('http://112.74.180.184/app_be/public/index.php/user/student/getAuth', data, 'POST')
      .then(() => {
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
      })
  },

  usernameHandle(event) {
    console.log(event.detail.detail.value)
    this.setData({
      username: event.detail.detail.value
    });
  },

  pwdHandle(event) {
    console.log(event.detail.detail.value)
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
    http('http://112.74.180.184/app_be/public/index.php/user/student/getArgs', {}, 'GET')
      .then(data => {
        this.setData({
          args: data.args,
          cookies: data.cookies
        });
      })
    // http(url, {}, 'GET').then(data => {
    //   this.setData({
    //     code: data.codeImg,
    //     key: data.key
    //   })
    // })
  }
    
})