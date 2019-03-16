/** 
 * @file map.js
 */

import qqmap from "./qqmap-wx-jssdk.min.js";
import scope from "./scope";

const { $Message } = require('../../iview/base/index');

var qqmapSDK = null;

export function initSDK() {
  if (qqmapSDK) return false;
  qqmapSDK = new qqmap({
    key: "S6EBZ-EGVK4-4DZUG-XC64P-MTIBE-HHF3G"
  });
  console.log(1);
  return true;
}

export function getCurrPosText() {
  if (!qqmapSDK) return;

  return new Promise(
    function(resolve, reject) {
      // 调用微信api获取经纬度
      wx.getLocation({
        type: 'gcj02',
        success (res) {
          let location = {};

          location.latitude = res.latitude;
          location.longitude = res.longitude;

          resolve(location);
        },
        fail: function(res) {
          reject(res);
        },
        complete: function(res) {
          console.log(res);
        }
      });
    }
  ).then(function(location) {
    console.log(location);
    // 计算位置
    for (let i = 0; i < scope.length; i++) {
      
      let pos = scope[i];
      
      if (location.longitude > pos.maxLongitude || location.longitude < pos.minLongitude) continue;
      if (location.latitude > pos.maxLatitude || location.latitude < pos.minLatitude) continue;
      console.log(pos);
      return pos.name;
    }

    return "";
  });
}

// export function getCurrPosValue(address) {
//   if (!qqmapSDK) return;

//   qqmapSDK.geocoder({
//     address: address,
//     success: function(res) {
//       console.log(res, "success", "value");
//       // successHandle(res);
//     },
//     fail: function(res) {
//       console.log(res, "fail");
//       // failHandle(res);
//     },
//     complete: function(res) {
//       console.log(res, "complete");
//     }
//   });
// }