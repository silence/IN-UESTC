<template>
  <div 
    :class="classList"
    :style="{ 'background': course.color }"
  >
    <div class="course-name">{{ course.course_name }}</div>
    <div class="course-location">{{ course.course_location }}</div>
  </div>
</template>

<script>
export default {
  name: 'Cession',
  props: {
    course: Object
  },
  computed: {
    classList() {
      let [ course_start, course_end ] = this.course.course_time.split('-'); 
      let courseLen = course_end - course_start;
      let courseDay = this.course.course_day;
      return ['course', `row-${courseLen+1}`, `top-${course_start}`, `left-${courseDay}`];
    }
  },
  mounted() {

  }
}
</script>

<style lang="less" scoped>
.course {
  position: absolute;
  z-index: 3;
  width: 50px;
  border: 1px dotted #ccc;
  box-sizing: border-box;
  border-radius: 5px;
  font-size: 12px;
  padding: 5px;
  color: #fff;
}

.row-1 {
  height: 60px;
}
.row-2 {
  height: 120px;
}

.row-3 {
  height: 180px;
}

.row-4 {
  height: 240px;
}

.row-8 {
  height: 480px;
}

.top-1 {
  top: 0
}

.top-3 {
  top: 120px;
}

.top-5 {
  top: 240px;
}

.top-7 {
  top: 360px;
}

.top-9 {
  top: 480px;
}

.left-1 {
  left: 0px;
}

.left-2 {
  left: 50px;
}

.left-3 {
  left: 100px;
}

.left-4 {
  left: 150px;
}

.left-5 {
  left: 200px;
}

.left-6 {
  left: 250px;
}

.left-7 {
  left: 300px;
}
</style>
