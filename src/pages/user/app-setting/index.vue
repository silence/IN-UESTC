<template>
  <div class="app-setting page">
    <div class="storage">
      <span class="label">本地缓存</span>
      <span class="size">{{ currStorageSize + 'KB' }}</span>
    </div>
    <i-button class="submit" type="success" @tap="clearHandle">清除本地缓存</i-button>
  </div>
</template>

<script>

export default {
  name: "app-setting",
  data() {
    return {
      currStorageSize: 0
    }
  },
  methods: {
    clearHandle() {
      wx.clearStorage({
        success: () => {
          console.log("success");
          this.currStorageSize = 0;
        }
      });
    },
    getStorageInfo() {
      wx.getStorageInfo({
        success: res => {
          this.currStorageSize = res.currentSize;
        }
      });
    }
  },
  mounted () {
    this.getStorageInfo();
  }
}
</script>

<style lang="less" scoped>
.storage {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  font-size: 14px;
  padding: 10px;
  margin-bottom: 20px;

}
</style>
