import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'

interface IProps {
  course: {
    course_name: string
    color: string
    course_location: string
  }
  classList: Array<string>
}

export default (props: IProps) => {
  const course = props.course
  return (
    <View
      className={props.classList.join(' ')}
      onClick={() => console.log(props)}
      style={{ background: course.color }}
    >
      <View className="course-name">{course.course_name}</View>
      <View className="course-location">{course.course_location}</View>
    </View>
  )
}
