// pages/aftifact/schoolbus/main.js
import moment from 'moment';
import list from './data';
Page({
  data: {
    weekdays: [],
    list: [],
    start: '起点',
    end: '终点',
    startVisible: false,
    endVisible: false
  },

  computeList(){ 
    const list = ["清水河校区", "沙河校区", "学府杏林", "D组团", "B组团", "地铁2号线天河路站C口"];

    return list.map((list, idx) => ({
      name: list,
      index: idx
    }))
  },

  computeWeeks() {
    const today = moment().format('E');
    const weeks = ['一', '二', '三', '四', '五', '六', '日'];
    return weeks.map((day, idx) => ({
      label: day,
      curr: String(idx + 1) === today
    }));
  },

  exchangeHandle() {
    if (this.start === '起点' || this.end === '终点') return;
    let temp = this.data.start;

    this.setData({
      start: this.data.end,
      end: temp
    })
  },

  showStartActions() {
    this.setData({
      startVisible: true
    })
  },

  showEndActions() {
    this.setData({
      endVisible: true
    })
  },

  cancelHandle() {
    this.setData({
      startVisible: false,
      endVisible: false
    });
  },

  selectStart({ detail }) {
    this.setData({
      start: this.data.list[detail.index].name,
      startVisible: false
    });
  },

  selectEnd({ detail }) {
    this.setData({
      end: this.data.list[detail.index].name,
      endVisible: false
    });
  },

  onLoad() {
    this.setData({
      list: this.computeList(),
      weekdays: this.computeWeeks(),
      schoolbusList: list
    })
  }
})