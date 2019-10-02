import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import Header from '@/components/SimpleHeader'
import Course from '@/components/Course'
import './main.scss'

export default () => {
  return (
    <View className="date-page">
      <Header isBack bg title="IN成电"></Header>
      <View className="date-axis">
        <View className={`date-axis-item ${weekday.curr ? 'currday' : ''}`}>
          <View className="day">{weekday.day}</View>
          <View className="date">{weekday.date}</View>
        </View>
      </View>
      <View className="no-axis">
        <View className="no-axis-item">{val}</View>
      </View>
      <View className="date-body">
        <Course course={{}} selectHandle="selectHandle" />
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
