import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import Header from '@/components/SimpleHeader'
import './main.scss'

export default () => {
  return (
    
<View className="date-page">
  <Header isBack bg title="IN成电"></Header>
  <View className="date-axis">
    <View  
      
      
      className={`date-axis-item ${weekday.curr ? 'currday' : ''}`}
    >
      <View className="day">{ weekday.day }</View>
      <View className="date">{ weekday.date }</View>
    </View>
  </View>
  <View className="no-axis">
    <View
      className="no-axis-item"
    
    >
      { val }
    </View>
  </View>
  <View className="date-body">
    <course 
      wx:for="{{ testData }}"
      wx:for-item="item"
      wx:for-index="idx"
      wx:key="idx"
      course="{{ item }}" 
      selectHandle="selectHandle" />
  </View>
</View>

  )
}
