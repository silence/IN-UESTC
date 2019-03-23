// pages/date/main.js
import testData from './data';
const moment = require('moment');

const colors = ['#49BE75', '#99CCFF', '#FFCCCC', '#FFCC99', '#A799DB', '#FF6666', '#CCCCFF', '#98DBDE', '#8FD899', '#66CCFF'];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    noAxis: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    weeks: [],
    testData: []
  },

  /**
   * 计算时间轴
   */
  computeWeeks: () => {
    const today = moment().format('E');
    let monday = null;

    monday = today !== 1 ? moment().subtract(today - 1, 'days') : moment();

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

  /**
   * 处理课表数据
   */
  courseList() {
    return testData.map((item, idx) => ({
      ...item,
      // color: colors[Math.floor(Math.random()*10)]
      color: colors[idx]
    }));
  },

  /**
   * 选中课程回调
   * @param { Object } course 
   */
  selectHandle(course) {
    console.log(course);
  },
  
  onLoad: function (options) {
    this.setData({
      weeks: this.computeWeeks(),
      testData: this.courseList()
    });
  }
})