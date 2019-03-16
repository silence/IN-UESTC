/**
 * @file main.js
 * @desc 日程页面
*/

import Vue from 'vue';
import App from './index';

const app = new Vue(App);
app.$mount();

export default {
  config: {
    "navigationBarTitleText": "日程"
  }
};
