import Taro, { useState, useEffect } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'

export interface ICourse {
  color: string
  course_day: number
  course_id: number
  course_location: string
  course_name: string
  course_teacher: string
  course_time: string
  course_week: string
}
interface IProps {
  course: ICourse
}

export default function Course(props: IProps) {
  const [classList, setClassList] = useState(new Array())
  const course = props.course
  useEffect(() => {
    const [course_start, course_end] = course.course_time.split('-').map(v => Number(v))
    const courseLen = course_end - course_start
    const courseDay = course.course_day
    setClassList(() => [
      'course',
      `row-${courseLen + 1}`,
      `top-${course_start}`,
      `left-${courseDay}`
    ])
  }, [])
  return (
    <View
      className={classList.join(' ')}
      onClick={() => console.log(props)}
      style={{ background: course.color }}
    >
      <View className="course-name">{course.course_name}</View>
      <View className="course-location">{course.course_location}</View>
    </View>
  )
}

Course.defaultProps = {
  course: {
    color: '',
    course_day: 1,
    course_id: 1,
    course_location: '',
    course_name: '',
    course_teacher: '',
    course_time: '',
    course_week: ''
  }
}
