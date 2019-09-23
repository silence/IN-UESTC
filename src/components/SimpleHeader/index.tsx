import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

interface IProps {
  bg: boolean
  isBack: boolean
  title: string
  children?: any
}

export default function Header(props: IProps) {
  return (
    <View className="normal-header" style={{ background: `${props.bg ? '#4cc9ac' : 'none'}` }}>
      {props.isBack ? (
        <View
          className="back"
          onClick={() => {
            Taro.navigateBack({ delta: 1 })
          }}
        >
          <Text className="icon iconfont icon-back"></Text>
          <Text>返回</Text>
        </View>
      ) : null}
      {props.children}
      <Text className="title">{props.title}</Text>
    </View>
  )
}

Header.defaultProps = {
  bg: false,
  isBack: false,
  title: ''
}
