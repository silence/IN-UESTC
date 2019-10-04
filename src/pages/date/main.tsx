import Taro, { useState, useEffect } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { Header, Course, ICourse } from '@/components'
import { weekToday, addDays, subDays } from '@/utils'
import { AtActivityIndicator } from 'taro-ui'
import mockData from './__mock__data'
import './main.scss'

interface T extends ICourse {
  color: string
}
interface W {
  date: string
  day: string
  curr: boolean
}
enum Colors {
  '#49BE75',
  '#99CCFF',
  '#FFCCCC',
  '#FFCC99',
  '#A799DB',
  '#FF6666',
  '#CCCCFF',
  '#98DBDE',
  '#8FD899',
  '#66CCFF'
}

export default () => {
  const [data, setData] = useState([] as Array<T>)
  const [weeks, setWeeks] = useState([] as Array<W>)
  const noAxis = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  useEffect(() => {
    const weeksList = days.map((value, index) => {
      const bias = index + 1 - weekToday()
      const date = bias < 0 ? subDays(Math.abs(bias)) : addDays(bias)
      const dateString = date.toLocaleDateString().split('/')
      dateString.pop()
      return {
        date: dateString.join('/'),
        day: value,
        curr: bias === 0
      }
    })
    setWeeks(() => weeksList)
    sleep().then(() => {
      setData(() => mockData.map(item => ({ ...item, color: Colors[item.course_id] })))
    })
  }, [])
  return (
    <View className="date-page">
      <Header isBack bg title="IN成电"></Header>
      <View className="date-axis">
        {weeks.map((item, index) => (
          <View className={`date-axis-item ${item.curr ? 'currday' : ''}`} key={index}>
            <View className="day">{item.day}</View>
            <View className="date">{item.date}</View>
          </View>
        ))}
      </View>
      <View className="no-axis">
        {noAxis.map((val, index) => (
          <View className="no-axis-item" key={index}>
            {val}
          </View>
        ))}
      </View>
      <View className="date-body">
        {data.length === 0 ? (
          <AtActivityIndicator mode="center"></AtActivityIndicator>
        ) : (
          data.map((item, index) => <Course course={item} key={index} />)
        )}
      </View>
    </View>
  )
}

async function sleep() {
  return await new Promise(res => {
    setTimeout(() => res(console.log('waiting 3s')), 3000)
  })
}
