import Taro, { Component, ComponentClass } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
// import { AtIcon, AtInput } from 'taro-ui'
import { Header } from '@/components'
import './main.scss'

enum Days {
  Mon = 1,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat,
  Sun
}

interface State {
  weekdays: any
  list: any
  result: any
  start: string
  end: string
  startVisible: boolean
  endVisible: boolean
  currDay: string
  schoolbusList: any
}

class SchoolBus extends Component<any, State> {
  public state: State = {
    weekdays: [],
    list: [],
    result: {},
    start: '清水河校区',
    end: '沙河校区',
    startVisible: false,
    endVisible: false,
    currDay: Days[Date().split(' ')[0]],
    schoolbusList: []
  }
  private computeList() {
    const list = ['清水河校区', '沙河校区', '学府杏林', 'D组团', 'B组团', '地铁2号线天河路站C口']

    return list.map((list, idx) => ({
      name: list,
      index: idx
    }))
  }
  private computeWeeks() {
    const today: number = Days[Date().split(' ')[0]]
    const weeks: Array<string> = ['一', '二', '三', '四', '五', '六', '日']
    return weeks.map((day, idx) => ({
      label: day,
      curr: idx + 1 === today
    }))
  }
  private computeData(d) {
    let date = d || this.state.currDay
    if (!this.state.result) return []
    let data: Array<any> = []
    if (date === Days[Date().split(' ')[0]]) {
      data = this.state.result.today
    } else if (date === '6' || date === '7') {
      data = this.state.result.weekend
    } else {
      data = this.state.result.weekday
    }

    data.forEach(item => {
      item.time = item.time.split(':')[0] + ':' + item.time.split(':')[1]
      item.type = this.getBusName(item.type)
    })

    return data
  }
  private exchangeHandle() {
    if (this.state.start === '起点' || this.state.end === '终点') return
    let temp = this.state.start

    this.setState({
      start: this.state.end,
      end: temp
    })
  }
  private changeDate(e) {
    let idx = e.currentTarget.id
    if (!this.state.start || !this.state.end || !this.state.schoolbusList) return

    this.setState({
      currDay: String(idx + 1),
      schoolbusList: this.computeData(String(idx + 1))
    })
  }
  private showStartActions() {
    this.setState({
      startVisible: true
    })
  }
  private showEndActions() {
    this.setState({
      endVisible: true
    })
  }
  private cancelHandle() {
    this.setState({
      startVisible: false,
      endVisible: false
    })
  }
  private selectStart({ detail }) {
    this.setState({
      start: this.state.list[detail.index].name,
      startVisible: false
    })
  }
  private selectEnd({ detail }) {
    this.setState({
      end: this.state.list[detail.index].name,
      endVisible: false
    })
    this.searchHandle()
  }
  private tapHandle(e) {
    let id = e.currentTarget.dataset.id
    let bus = this.state.schoolbusList[id]

    Taro.setStorage({
      key: 'currBus',
      data: JSON.stringify(bus)
    })

    Taro.navigateTo({ url: './stations/main' })
  }
  private searchHandle() {
    if (!this.state.start || this.state.start === this.state.end) return
    return Taro.request({
      url: 'http://112.74.180.184/app_be/public/index.php/bus/bus/getBusInfo',
      data: { start: this.state.start, end: this.state.end },
      header: 'POST'
    }).then(({ data }) => {
      this.setState({
        result: data
      })
    })
  }
  private getBusName(type) {
    if (type === 'student') return '学生班车'
    else if (type === 'teacher') return '教职工班车'
    else if (type === '396') return '396路公交车'
  }
  public render(): JSX.Element {
    return (
      <View className="schoolbus page">
        <Header isBack bg title="校车查询"></Header>
        <View className="main">
          <View className="query">
            <View className="start" onClick={() => {}}></View>
            <View className="transfer" onClick={() => {}}>
              <Text className="icon iconfont icon-cycle"></Text>
            </View>
            <View className="end" onClick={() => {}}></View>
          </View>

          <View className="schoolbus-body">
            <View className="weekbar">
              <View></View>
            </View>
            <View className="schoolbus-list">
              <View className="list-title">
                <View className="time">出发时间</View>
                <View className="type">校车</View>
                <View className="board">起点</View>
                <View className="stations">经停</View>
              </View>
              <View className="schoolbus-info">
                <View className="time"></View>
                <View className="type"></View>
                <View className="board"></View>
                <View className="stations">
                  <Text className="icon iconfont icon-pos"></Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default SchoolBus as ComponentClass
