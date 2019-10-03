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

export { weekToday }
