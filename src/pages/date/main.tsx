import Taro, { useState, useEffect } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { Header, Course, ICourse } from '@/components'
import './main.scss'
import mockData from './__mock__data'

interface T extends ICourse {
  color: string
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
  useEffect(() => {
    setData(() => mockData.map(item => ({ ...item, color: Colors[item.course_id] })))
  }, [])
  return (
    <View className="date-page">
      <Header isBack bg title="IN成电"></Header>
      <View className="date-axis">
        <View className="">
          <View className="day">{}</View>
          <View className="date">{}</View>
        </View>
      </View>
      <View className="no-axis">
        <View className="no-axis-item">{}</View>
      </View>
      <View className="date-body">
        {data.map((item, index) => (
          <Course course={item} key={index} />
        ))}
      </View>
    </View>
  )
}

/**
 * <!--pages/date/main.wxml-->
<view class="date-page">
  <header isBack bg title="IN成电"></header>
  <view class="date-axis">
    <view  
      wx:for="{{weeks}}" 
      wx:for-index="idx" 
      wx:key="idx" 
      wx:for-item="weekday"
      class="{{ ['date-axis-item', weekday.curr ? 'currday' : ''] }}"
    >
      <view class="day">{{ weekday.day }}</view>
      <view class="date">{{ weekday.date }}</view>
    </view>
  </view>
  <view class="no-axis">
    <view
      class="no-axis-item"
      wx:for="{{noAxis}}"
      wx:for-index="idx"
      wx:for-item="val"
      wx:key="idx"
    >
      {{ val }}
    </view>
  </view>
  <view class="date-body">
    <course 
      wx:for="{{ testData }}"
      wx:for-item="item"
      wx:for-index="idx"
      wx:key="idx"
      course="{{ item }}" 
      selectHandle="selectHandle" />
  </view>
</view>

 */
