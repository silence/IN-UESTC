// pages/aftifact/schoolbus/main.js
import moment from 'moment';
import list from './data';
Page({
  data: {
    weekdays: [],
    list: ["清水河校区", "沙河校区", "学府杏林", "D组团", "B组团", "地铁2号线天河路站C口"],
    start: '地铁2号线天河路站C口',
    end: '地铁2号线天河路站C口',
    startVisible: false,
    endVisible: false
  },

  computeWeeks() {
    const today = moment().format('E');
    const weeks = ['一', '二', '三', '四', '五', '六', '日'];
    return weeks.map((day, idx) => ({
      label: day,
      curr: String(idx + 1) === today
    }));
  },

  onLoad() {
    this.setData({
      weekdays: this.computeWeeks(),
      schoolbusList: list
    })
  }
})