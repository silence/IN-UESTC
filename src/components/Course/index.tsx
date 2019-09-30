import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

interface IProps {
  course: {
    course_name: string
    color: any
    course_location: any
  }
  classList: any
}

export default (props: IProps) => {
  const course = props.course
  return (
    <View className={props.classList} onClick={() => {}} style={{ background: course.color }}>
      <View className="course-name">{course.course_name}</View>
      <View className="course-location">{course.course_location}</View>
    </View>
  )
}
