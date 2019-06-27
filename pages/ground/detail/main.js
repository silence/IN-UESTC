// pages/ground/main.js
const regeneratorRuntime = require('../../../utils/regeneratorRuntime');
const http = require('../../../utils/http');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    news: {
      avatar: 'https://tvax3.sinaimg.cn/crop.0.0.749.749.180/dab20f8dly8fg4yi5hsb3j20ku0ktmxw.jpg',
      username: '鞠婧祎',
      time: '一小时前',
      content: '今晚八点爱奇艺，白素贞小白🐍来啦！养蛇了朋友们',
      repeat_nums: 0,
      praise_status: false,
      praise_nums: 0,
      views: 233
    },
    reply: [
      {
        content: "sdsadsad",
        time: "2019-06-19 16:56:31"
      },
      {
        content: "sdsadsad",
        time: "2019-06-19 16:56:31"
      },
      {
        content: "sdsadsad",
        time: "2019-06-19 16:56:31"
      },
      {
        content: "sdsadsad",
        time: "2019-06-19 16:56:31"
      },
      {
        content: "sdsadsad",
        time: "2019-06-19 16:56:31"
      },
      {
        content: "sdsadsad",
        time: "2019-06-19 16:56:31"
      },
      {
        content: "sdsadsad",
        time: "2019-06-19 16:56:31"
      },
      {
        content: "sdsadsad",
        time: "2019-06-19 16:56:31"
      },
      {
        content: "sdsadsad",
        time: "2019-06-19 16:56:31"
      },
      {
        content: "sdsadsad",
        time: "2019-06-19 16:56:31"
      },
      {
        content: "sdsadsad",
        time: "2019-06-19 16:56:31"
      },
      {
        content: "sdsadsad",
        time: "2019-06-19 16:56:31"
      }
    ],
    text: ''
  },

  inputHandle(e) {
    this.setData({
      text: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
})