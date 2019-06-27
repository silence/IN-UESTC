// pages/aftifact/schoolbus/main.js
import moment from 'moment';
import http from '../../../utils/http';

Page({
  data: {
    weekdays: [],
    list: [],
    result: {},
    start: '清水河校区',
    end: '沙河校区',
    startVisible: false,
    endVisible: false,
    currDay: moment().format('E'),
    schoolbusList: []
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

  computeData(d) {
    let date = d || this.data.currDay;
    if (!this.data.result) return [];
    let data = '';
    if (date === moment().format('E')) {
      data = this.data.result.today;
    } else if (date === '6' || date === '7'){
      data = this.data.result.weekend;
    } else {
      data = this.data.result.weekday;
    };

    data.forEach(item => {
      item.time = item.time.split(':')[0] + ":" +item.time.split(':')[1]
      item.type = this.getBusName(item.type);
    }); 

    return data;
  },

  exchangeHandle() {
    if (this.start === '起点' || this.end === '终点') return;
    let temp = this.data.start;

    this.setData({
      start: this.data.end,
      end: temp
    })
  },

  changeDate(e) {
    let idx = e.currentTarget.id;
    if (!this.data.start || !this.data.end || !this.data.schoolbusList) return;

    this.setData({
      currDay: String(idx + 1),
      schoolbusList: this.computeData(String(idx + 1))
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
    this.searchHandle();
  },

  tapHandle(e) {
    let id = e.currentTarget.dataset.id;
    let bus = this.data.schoolbusList[id];

    wx.setStorage({
      key: 'currBus',
      data: JSON.stringify(bus)
    });

    wx.navigateTo({ url: './stations/main'})
  },

  searchHandle() {
    if (!this.data.start || this.data.start === this.data.end) return;
    
    return http('http://112.74.180.184/app_be/public/index.php/bus/bus/getBusInfo', { start: this.data.start, end: this.data.end }, 'POST')
      .then(({ data }) => {
        this.setData({
          result: data
        });
      });
  },

  getBusName(type) {
    if (type === 'student') return '学生班车';
    else if (type === 'teacher') return '教职工班车';
    else if (type === '396') return '396路公交车';
  },

  onLoad() {
    this.searchHandle().then(() => {
      this.setData({
        list: this.computeList(),
        weekdays: this.computeWeeks(),
        schoolbusList: this.computeData()
      });
    });
    
  }
})