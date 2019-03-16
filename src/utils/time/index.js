/** 
 * @file time.js
 */

export function getWeek() {
  let week = new Date().getDay();
  return week === 0 ? 7 : week;
}