// pages/user/message/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 'system',
    systemCount: 3,
    otherNotices: 0,
    systemNotices: [
      {
        id: '123123',
        title: '失物招领',
        content: '你的饭卡找到啦你的饭卡找到啦你的饭卡找到啦你的饭卡找到啦你的饭卡找到啦你的饭卡找到啦',
        is_read: false,
        time: '4小时前'
      },
      {
        id: '123123',
        title: '紧急事务',
        content: '你女朋友喊你了',
        is_read: false,
        time: '2小时前'
      },
      {
        id: '123123',
        title: '追星动态',
        content: '快看鞠婧祎',
        is_read: false,
        time: '1分钟前'
      }
    ],
    otherNotices: [
      {
        id: 111,
        title: '鞠婧祎给你点赞了',
        avatar: 'https://tvax3.sinaimg.cn/crop.0.0.749.749.180/dab20f8dly8fg4yi5hsb3j20ku0ktmxw.jpg',
        content: '',
        time: '1分钟前',
        is_read: true
      },
      {
        id: 113,
        title: '赵敏给你回复了',
        avatar: 'https://tvax3.sinaimg.cn/crop.0.0.512.512.180/006mwaFnly8fnnxnmxwqoj30e80e8wer.jpg',
        content: '老铁666',
        time: '2分钟前',
        is_read: true
      }
    ]
  },

  changeHandle(event) {
    this.setData({
      current: event.detail.key
    });
  },

  tapHandle(event) {
    const { id, key } = event.currentTarget.dataset;
    let source = this.data.current + 'Notices';
    let list = [...this.data[source]];
    list[key].is_read = true;
    
    if (this.data.current === 'system') {
      this.setData({
        systemNotices: list,
        systemCount: this.data.systemCount-1
      });
    } else {
      this.setData({
        otherNotices: list,
        otherCount: this.data.otherCount - 1
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})