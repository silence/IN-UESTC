/** 
 * @file type.js
 */

export function isNum(val) {
  return Object.prototype.toString.call(val) === "[object Number]";
} 