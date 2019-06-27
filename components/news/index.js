// components/news/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    news: {
      type: Object,
      value: {
        avatar: '',
        username: '',
        time: '',
        content: '',
        images: '',
        praise_status: false,
        praise_nums: 0,
        repeat_nums: 0,
        views: 0
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    previewHandle(e) {
      let id = e.target.dataset.id;
      wx.previewImage({
        current: this.data.news.images[id],
        urls: this.data.news.images
      });
    }
  }
})
