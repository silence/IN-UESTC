<template>
  <div class="user-page page">
    <div class="section user-info">
      <div class="user-info-left">
        <open-data type="userAvatarUrl"></open-data>
      </div>
      <div class="user-info-right">
        <p class="username">
          <open-data type="userNickName"></open-data>
        </p>
        <p :class="['is-bound-status', isBound ? 'is-bound' : 'is-not-bound']">
          <span @tap="bindHandle">{{ isBound ? "已绑定" : "点击绑定学号"}}</span>
        </p>
      </div>
    </div>
    <div class="section about-me">
      <div class="item item-message">
        <navigator url="./message">
          <div class="item-icon">
            <i class="icon iconfont icon-message"></i>
          </div>
          <div class="item-name">我的消息</div>
        </navigator>
      </div>
      <div class="item item-issue">
        <navigator url="./issue">
          <div class="item-icon">
            <i class="icon iconfont icon-issue"></i>
          </div>
          <div class="item-name">我的发布</div>
        </navigator>
      </div>
      <div class="item item-profile">
        <navigator url="./profile">
          <div class="item-icon">
            <i class="icon iconfont icon-profile"></i>
          </div>
          <div class="item-name">我的简介</div>
        </navigator>
      </div>
    </div>
    <div class="navigator-group">
      <i-cell-group>
        <i-cell 
          i-class="personality"
          title="个性化设置"
          is-link
          url="./personal-setting/main"
          link-type="navigateTo"
        >
        </i-cell>
        <i-cell 
          i-class="system"
          title="小程序设置"
          is-link
          url="./app-setting/main"
          link-type="navigateTo"
        >
        </i-cell>
      </i-cell-group>
    </div>
    <div class="navigator-group">
      <i-cell-group>
        <i-cell 
          i-class="feedback"
          title="问题设置"
          is-link
          url="./feedback/main"
          link-type="navigateTo"
        >
        </i-cell>
        <i-cell 
          i-class="aboutus"
          title="关于我们"
          is-link
          url="./aboutus/main"
          link-type="navigateTo"
        >
        </i-cell>
      </i-cell-group>
    </div>
    <div class="share">
      <i-button open-type="share" type="success" class="share">分享</i-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "user",
  computed: {
    isBound() {
      return this.$store.state.user.isBound;
    }
  },
  methods: {
    bindHandle() {
      if (this.isBound) return;
      wx.navigateTo({
        url: "./login/main"
      });
    }
  },
  mounted() {
  }
}
</script>

<style lang="less" scoped>
.section {
  display: flex;
  padding: 0 20px;
  align-items: center;
  background: #fff;
}

.user-info {
  height: 80px;
  align-items: center;
  margin-bottom: 2px;

  &-left {
    height: 60px;
    width: 60px;
    margin-right: 15px;
  }

  &-right {
    .username {
      font-size: 15px;
    }

    .is-bound-status {
      margin-top: 4px;
      font-size: 12px;
    }

    .is-bound {
      color: #ccc;
    }

    .is-not-bound {
      color: red;
    }
  }
}

.about-me {
  height: 80px;
  padding: 0 40px;
  justify-content: space-between;

  .item {
    text-align: center;

    .item-icon > i {
      font-size: 20px;
    }

    .item-name {
      font-size: 12px;
    }
  }
}

.navigator-group {
  margin-top: 20px;
  overflow: hidden;
}

.share {
  margin-top: 40px;
  overflow: hidden;
}
</style>
