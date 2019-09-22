import Taro, { useState } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtIcon, AtInput } from 'taro-ui'
import Header from '@/components/SimpleHeader'
import './main.scss'

export default () => {
  const [value, setValue] = useState('')
  return (
    <View className="lost page">
      <Header isback bg title="失物招领"></Header>
      <View className="main">
        <View className="banner">
          <View className="search">
            <AtIcon value="search" size="18" color="#ccc"></AtIcon>
            <AtInput
              name="search"
              type="text"
              placeholder="搜索"
              value={value}
              onChange={value => setValue(value)}
            />
          </View>
          <View className="add">发布</View>
        </View>
        <View className="list">
          <View className="list-item">
            <View className="detail">
              <View className="name">
                香奈儿5号淡香水 用过两次 几乎全新 味道迷人 有需要的美女请带走 包邮 拍下后不退换
                在北京的朋友可以上门自取
              </View>
              <View className="time"> 2018-9-20 18:00:00</View>
              <View className="desc">描述啦啦啦啦啦啦</View>
            </View>
            <View className="photo">
              <Image
                src="http://img.alicdn.com/bao/uploaded/i2/O1CN01shAFU21VMhktNTy2b_!!0-fleamarket.jpg"
                mode="aspectFill"
              />
            </View>
          </View>
          <View className="list-item">
            <View className="detail">
              <View className="name">
                韩都衣舍～温柔毛衣裙女冬宽松韩版学生中长款过膝内搭2018…
                颜色分类棕红色（天猫品质）,尺码均码
              </View>
              <View className="time"> 2018-9-20 18:00:00</View>
              <View className="desc">描述啦啦啦啦啦啦</View>
            </View>
            <View className="photo">
              <Image
                src="http://img.alicdn.com/bao/uploaded/i2/1766047907/O1CN0128HSA3UPwaauFyY_!!1766047907.jpg"
                mode="aspectFill"
              />
            </View>
          </View>
          <View className="list-item">
            <View className="detail">
              <View className="name">
                韩国代购女装正品2015新款COCO浪漫情人唯美… 颜色分类绿色,尺码均码
              </View>
              <View className="time"> 2018-9-20 18:00:00</View>
              <View className="desc">描述啦啦啦啦啦啦</View>
            </View>
            <View className="photo">
              <Image
                src="http://img.alicdn.com/bao/uploaded/i2/TB12WxLKXXXXXbTXpXXXXXXXXXX_!!0-item_pic.jpg"
                mode="aspectFill"
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}
