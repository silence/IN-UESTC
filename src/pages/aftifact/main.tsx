import Taro from '@tarojs/taro'
import { View, Text, Image, Navigator } from '@tarojs/components'
import Header from '@/components/SimpleHeader'
import './main.scss'

export default () => {
  return (
    <View className="aftifact page">
      <Header title="IN成电" bg isback></Header>
      <View className="main">
        <View className="item">
          <Navigator url="./">
            <Image className="bg" src="/static/images/01.svg" mode="aspectFit"></Image>
            <Text className="title">失物招领</Text>
            <Text className="desc">丢失物品发布查找</Text>
          </Navigator>
        </View>
        <View className="item">
          <Navigator url="./schoolbus/main">
            <Image className="bg" src="/static/images/02.svg" mode="aspectFit"></Image>
            <Text className="title">校车查询</Text>
            <Text className="desc">校车线路、时间查询</Text>
          </Navigator>
        </View>
        <View className="item">
          <Navigator url="./schoolbus/main">
            <Image className="bg" src="/static/images/03.svg" mode="aspectFit"></Image>
            <Text className="title">一卡通查询</Text>
            <Text className="desc">一卡通余额、消费查询</Text>
          </Navigator>
        </View>
      </View>
    </View>
  )
}
