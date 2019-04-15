Component({
  options: {
    multipleSlots: true
  },

  properties: {
    title: {
      type: String,
      value: ''
    },
    isBack: {
      type: Boolean,
      value: false
    },
    bg: {
      type: Boolean,
      value: false
    }
  },

  methods: {
    backHandle() {
      wx.navigateBack({
        delta: 1,
      });
    }
  }
})