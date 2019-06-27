// pages/aftifact/schoolbus/main.js
Page({
  data: {
    list: []
  },

  onLoad() {
    wx.getStorage({
      key:'currBus', 
      success: res => {
        this.setData({
          list: JSON.parse(res.data).via
        })
      }
    })
  }
})