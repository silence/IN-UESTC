import Vue from "vue";
import App from "./App";

import store from "./store";

const { $Message, $Toast } = require('./iview/base/index');

Vue.config.productionTip = false;
App.mpType = "app";

Vue.prototype.$store = store;

Vue.prototype.$message = $Message;
Vue.prototype.$toast = $Toast;

const app = new Vue(App)
app.$mount()
