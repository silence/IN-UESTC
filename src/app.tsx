import '@tarojs/async-await'
import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
// import Index from './pages/index'
import Date from './pages/date/main'
import configStore from './store'
import './app.scss'
// import './sitemap.json'
const store = configStore()

interface AppConfig extends Config {
  sitemapLocation?: string
}

class App extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: AppConfig = {
    pages: [
      // 'pages/ground/detail/main',
      'pages/ground/main',
      // 'pages/ground/add/main',
      'pages/date/main',
      // 'pages/aftifact/lost/add/main',
      'pages/aftifact/main',
      // 'pages/aftifact/schoolbus/main',
      'pages/arrivals/main',
      'pages/user/main'
      // 'pages/user/message/main',
      // 'pages/user/profile/main',
      // 'pages/user/issue/main',
      // 'components/news/index'
    ],
    window: {
      navigationStyle: 'custom'
    },
    // usingComponents: {
    //   'i-message': './dist/iview/message/index'
    // },
    tabBar: {
      selectedColor: '#4cc9ac',
      list: [
        {
          pagePath: 'pages/date/main',
          text: '日程',
          iconPath: 'static/icon/date.png',
          selectedIconPath: 'static/icon/date-active.png'
        },
        {
          pagePath: 'pages/aftifact/main',
          text: '神器',
          iconPath: 'static/icon/aftifact.png',
          selectedIconPath: 'static/icon/aftifact-active.png'
        },
        {
          pagePath: 'pages/ground/main',
          text: '广场',
          iconPath: 'static/icon/ground.png',
          selectedIconPath: 'static/icon/ground-active.png'
        },
        {
          pagePath: 'pages/arrivals/main',
          text: '直达',
          iconPath: 'static/icon/arrivals.png',
          selectedIconPath: 'static/icon/arrivals-active.png'
        },
        {
          pagePath: 'pages/user/main',
          text: '我的',
          iconPath: 'static/icon/user.png',
          selectedIconPath: 'static/icon/user-active.png'
        }
      ]
    }
    // sitemapLocation: 'sitemap.json'
  }
  componentWillUnmount() {
    console.log(1)
  }

  componentDidMount() {
    console.log(2)
  }

  componentDidShow() {
    console.log(3)
  }

  componentDidHide() {
    console.log(4)
  }

  componentDidCatchError() {
    console.log(5)
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Date />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
