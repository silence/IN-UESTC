const http = require("../../../utils/http.js");
const { $Toast } = require('../../../dist/iview/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: ''
  },

  inputHandle(event) {
    const value = event.detail.detail.value;
    this.setData({
      text: value
    });
  },

  submitHandle() {
    if (this.data.text) {
      wx.navigateBack({
        delta: 1,
        complete: () => {
          $Toast({ type: 'success', content: '提交成功' });
        }
      });
      // http(url, { value: this.data.text }, 'POST')
      //   .then(res => {
      //     wx.navigateBack({
      //       delta: 1,
      //       complete: () => {
      //         $Toast({ type: 'success', content: '提交成功' });
      //       }
      //     });
      //   })
    } 
  }
})