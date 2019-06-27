// pages/user/main.js
const http = require('../../utils/http.js');
const { throttle } = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isBound: false,
  },

  bindHandle() {
    if (this.data.isBound) return;
    wx.navigateTo({
      url: './login/main',
    })
  },

  isAuth() {
    const openid = wx.getStorageSync('openid');
    console.log('auth');
    // http('http://112.74.180.184/app_be/public/index.php/user/student/isAuth', { openid }, 'POST')
    // http(url, { openid }, 'POST')
    //   .then(res => this.setData({ isBound: true }))
  },

  onLoad: function (options) {
    wx.getStorage({
      key: 'auth',
      success: res => {
        if (res.data) {
          this.setData({
            isBound: res.data
          })
        } else {
          this.isAuth();
        }
      },
      fail: res => this.isAuth()
    })
  }
})