<template>
  <div class="login-page page">
    <div class="banner"></div>
    <div class="form-container">
      <i-input id="studentId" title="学号" @change="changeHandle" maxlength="-1"></i-input>
      <i-input id="password" title="密码" @change="changeHandle" type="password" maxlength="-1"></i-input>
    </div>
    <i-button class="submit" type="success" @tap="submitHandle">绑定学号</i-button>
  </div>
</template>

<script>

export default {
  name: "login",
  data() {
    return {
      form: {
        studentId: "",
        password: ""
      }
    }
  },
  methods: {
    changeHandle(e) {
      const key = e.target.id;
      const val = e.target.detail.Evalue;
      this.form[key] = val;
    },
    submitHandle() {
      console.log(this.form);
    }
  }
}
</script>

<style lang="less" scoped>
.banner {
  height: 120px;
  background-image: url("../../../../static/images/bg.png");
  background-position: center;
}

.form-container {
  margin-top: 15px;
  margin-bottom: 45px;
}
</style>
