<template>
  <div class="feedback page">
    <p class="desc">感谢您的宝贵意见，我们会尽快改进</p>
    <textarea name="feedback" rows="8" placeholder="请写下您的宝贵意见：）" v-model="text"></textarea>
    <i-button class="submit" type="success" @tap="submitHandle">提交</i-button>
  </div>
</template>

<script>

export default {
  name: "feedback",
  data() {
    return {
      text: ""
    }
  },
  methods: {
    submitHandle() {
      console.log(this.text);
    }
  }
}
</script>

<style lang="less" scoped>
.page {
  background: #fff;
}

.desc {
  padding: 0, 20px;
  font-size: 14px;
  text-align: center;
  margin-top: 30px;
}

textarea {
  margin: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  width: calc(~"100% - 40px");
  box-sizing: border-box;
  padding: 8px;
}
</style>
