// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import {Input, Button, Form, FormItem,Tabs,TabPane,Row,Col,Dialog,Message,Pagination} from 'element-ui';
Vue.use(Input)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Row)
Vue.use(Col)
Vue.use(Dialog)
Vue.use(Pagination)
Vue.prototype.$message = Message;

Vue.config.productionTip = false

/* 配置请求域名 */
let $url = '';
let $http = document.location.protocol + "//";
let $host = window.location.host;
if (location.href.indexOf('//localhost') != -1 || location.href.indexOf('//192.168.116') != -1) {
    //本地接口地址
    $url = '';
} else if (location.href.indexOf('//192.168') != -1) {
    //测试接口地址
    $url = $http + $host + "/";
} else {
    // 线上接口地址
    $url = $http + $host + "";
}
Vue.prototype.$url = $url;

//import "babel-polyfill";

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
