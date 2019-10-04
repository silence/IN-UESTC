enum Days {
  Mon = 1,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat,
  Sun
}
/**
 * moment.js
 * moment().format('E') Day of Week (ISO)
 * @return {number} 1,2,3,4,5,6,7
 */
function weekToday(): number {
  return Days[Date().split(' ')[0]]
}

/**
 * https://github.com/you-dont-need/You-Dont-Need-Momentjs#add
 * moment().add()
 */
function addDays(num: number): Date {
  const now = new Date()
  now.setDate(now.getDate() + num)
  return now
}

/**
 * https://github.com/you-dont-need/You-Dont-Need-Momentjs#subtract
 * moment().subtract()
 */
function subDays(num: number): Date {
  return new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * num)
}

export { weekToday, addDays, subDays }
