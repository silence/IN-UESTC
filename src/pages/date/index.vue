<template>
  <div class="date-page">
    <div class="date-axis">
      <div v-for="(weekday, idx) in week" :key="idx" :class="['date-axis-item', weekday.curr ? 'currday' : '']">
        <div class="day">{{ weekday.day }}</div>
        <div class="date">{{ weekday.date }}</div>
      </div>
    </div>
    <div class="no-axis">
      <div class="no-axis-item" v-for="(val, idx) in noAxis" :key="idx">{{ val }}</div>
    </div>
    <div class="date-body">
      <Course v-for="(item, idx) in courseList" :course="item" :key="idx" />
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import Course from '@/components/course';
const testData = [
  {
    course_id: '001',
    course_name: '网络与系统攻击技术',
    course_time: '5-8',
    course_day: 3,
    course_location: '品学楼C-403'
  }
];
export default {
  name: "date",
  components: { Course },
  data() {
    return {
      noAxis: [1, 2, 3, 4, 5, 6, 7 ,8, 9, 10, 11, 12],
      courseWidth: 40,
      courseHeight: 60
    }
  },
  computed: {
    week() {
      const today = moment().format('E');
      let monday = null;
      if (today !== 1) {
        monday = moment().subtract(today-1, 'days');
      } else {
        monday = moment();
      }

      const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
      return days.map((item, idx) => {
        let date = idx === 0 ? monday : monday.add(1, 'days');
        return {
          date: date.format('MM/DD'),
          day: item,
          curr: String(idx + 1) === today
        }
      })
    },
    courseList() {
      return testData.map(item => {
        const [courseStart, courseEnd] = item.course_time.split('-');
        const courseLength = courseEnd - courseStart + 1;

        return {
          x: (item.course_day - 1) * this.courseWidth,
          y: (courseStart - 1) * this.courseHeight,
          width: this.courseWidth,
          height: this.courseHeight * courseLength,
          name: item.course_name,
          location: item.course_location,
          color: '#ccc'
        }
      });
    }
  }
}
</script>

<style lang="less" scoped>
.date-axis {
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  padding-right: 10px;

  .date-axis-item {
    border-radius: 5px;
    flex: 0 0 40px;
    height: 40px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .day {
      font-size: 13px;
    }
    .date {
      font-size: 12px;
    }
  }

  .currday {
    background: #ccc;
  }
}
.no-axis {
  font-size: 13px;
  .no-axis-item {
    height: 60px;
    line-height: 60px;
    padding-left: 5px;
    border-bottom: 1px dashed #eee;
  }
}

.date-body {
  position: absolute;
  top: 50px;
  left: 20px;
  
}

</style>
