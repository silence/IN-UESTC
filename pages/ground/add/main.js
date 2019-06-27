// pages/ground/main.js
const regeneratorRuntime = require('../../../utils/regeneratorRuntime');
const http = require('../../../utils/http');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: "",
    images: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  deleteHandle(e) {
    let id = e.target.dataset.id;
    let data = [...this.data.images];
    data.splice(id, 0);
    this.setData({
      images: data
    });
  },

  inputHandle(e) {
    let val = e.detail.value;
    this.setData({
      content: val
    })
  },

  chooseHandle() {
    wx.chooseImage({
      count: 9, // 做多3张
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        // 存储临时地址
        this.setData({
          images: res.tempFilePaths
        })
      }
    })
  },

  
  async submitHandle() {
    if (this.data.images.length) {
      for (let i = 0; i < this.data.images.length; i++) {
        await this.uploadFile(this.data.images[i]);
      }
    }
    else {
      // let fd = new FormData();
      fd.append('content', this.data.content);
      fd.append('open_id', wx.getStorageSync('open_id'));

      http('http://112.74.180.184/app_be/public/index.php/Forum/post/post', {content: this.data.content, open_id: wx.getStorageSync('open_id')}, 'POST')
    }
  },

  uploadFile(filePath) {
    console.log(filePath);
    let open_id = wx.getStorageSync('open_id');
    let content = this.data.text;
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: 'http://112.74.180.184/app_be/public/index.php/Forum/post/post',
        filePath: filePath,
        name: 'images[]',
        formData: {
          "title": "123",
          "content": content,
          "open_id": open_id
        },
        header: {
          "Content-Type": "multipart/form-data"
        },
        success: (res) =>{

        },
        fail:(err) => {
          console.log(err)
        }
      })
    });
  }
})