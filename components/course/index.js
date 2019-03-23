Component({
  options: {
    multipleSlots: true
  },

  data: {
    classList: []
  },

  properties: {
    course: {
      type: Object,
      value: {
        course_time: '-',
        course_name: '',
        course_location: ''
      }
    },
    selectHandle: {
      type: Function,
      value: () => {}
    }
  },

  methods: {
    computeClass() {
      let [ course_start, course_end ] = this.data.course.course_time.split('-'); 
      let courseLen = course_end - course_start;
      let courseDay = this.data.course.course_day;
      this.setData({
        classList: ['course', `row-${courseLen+1}`, `top-${course_start}`, `left-${courseDay}`]
      });
    },
    tapHandle() {
      console.log(this.data.course);
    }
  },

  attached() {
    console.log(this);
    this.computeClass();
  }
});