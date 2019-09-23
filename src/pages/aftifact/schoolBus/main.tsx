import Taro, { Component, ComponentclassName } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtIcon, AtInput } from 'taro-ui'
import Header from '@/components/SimpleHeader'
import './main.scss'
import { ComponentClass } from 'react'

className SchoolBus extends Component<{}, {}> {
  public render(): JSX.Element {
    return (
        <View className="schoolbus page">
  <Header isBack bg title="校车查询"></Header>
  <View className="main">
    <View className="query">
      <View className="start" onClick={}>{{ start }}</View>
      <View className="transfer" onClick={}>
        <Text className="icon iconfont icon-cycle"></Text>
      </View>
      <View className="end" onClick={}>{{ end }}</View>
    </View>
    <i-action-sheet
      visible="{{ startVisible }}"
      actions="{{ list }}"
      bind:cancel="cancelHandle"
      bind:click="selectStart"
    >
    </i-action-sheet>
    <i-action-sheet
      visible="{{ endVisible }}"
      actions="{{ list }}"
      bind:cancel="cancelHandle"
      bind:click="selectEnd"
    >
    </i-action-sheet>
    <View className="schoolbus-body">
      <View className="weekbar">
        <View 
          wx:for="{{ weekdays }}"
          wx:for-item="weekday"
          wx:for-index="idx"
          wx:key="idx"
          className="{{ ['weekday', weekday.curr && 'weekday-curr'] }}"
          data-id="{{ idx }}"
          bindtap="changeDate"
        >
        {{ weekday.label }}
        </View>
      </View>
      <View className="schoolbus-list">
        <View className="list-title">
          <View className="time">出发时间</View>
          <View className="type">校车</View>
          <View className="board">起点</View>
          <View className="stations">经停</View>
        </View>
        <View 
          className="schoolbus-info"
          wx:for="{{ schoolbusList }}"
          wx:for-item="bus"
          wx:for-index="idx"
          wx:key="idx"
        >
          <View className="time">{{ bus.time }}</View>
          <View className="type">{{ bus.type }}</View>
          <View className="board">{{ bus.start }}</View>
          <View className="stations">
            <i className="icon iconfont icon-pos" data-id="{{idx}}" wx-if="{{ bus.via }}" bindtap="tapHandle"></i>
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
