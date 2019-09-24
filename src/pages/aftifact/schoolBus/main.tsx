import Taro, { Component, ComponentClass } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
// import { AtIcon, AtInput } from 'taro-ui'
import Header from '@/components/SimpleHeader'
import './main.scss'

class SchoolBus extends Component<any, any> {
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
