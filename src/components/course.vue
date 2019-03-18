<template>
  <div 
    class="course"
    :style="{ width: 80 + 'px', height: 120 + 'px', top: style.top + 'px', left: style.left + 'px', background: style.background }"
  >
    <div class="course-name">{{ course.name }}</div>
    <div class="course-location">{{ course.location }}</div>
  </div>
</template>

<script>
export default {
  name: 'Cession',
  props: {
    course: Object
  },
  computed: {
    style() {
      const { x, y, width, height, color } = this.course;
      const rpx = 750 / wx.getSystemInfoSync().windowWidth;
      return {
        width: width,
        height: height,
        top: y,
        left: x,
        background: color
      }
    }
  },
  mounted() {
    console.log(this.style);
  }
}
</script>

<style lang="less" scoped>
.course {
  position: absolute;
  z-index: 3;
}
</style>
