// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import {setCookie, getCookie, delCookie} from 'util/util'
// import _,{fetch, post, patch, put} from './util/http'

Vue.use(Element)
Vue.config.productionTip = false
Vue.prototype.$http = axios

Vue.prototype.setCookie = (username, password, expiredays) => {
  // document.cookie = username+"="+escape(password)
  var exdate = new Date()
  exdate.setDate(exdate.getDate() + expiredays)
  document.cookie = username + '=' + escape(password) + ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
}

Vue.prototype.getCookie = (username) => {
  // return document.cookie
  var reg = new RegExp('(^| )' + username + '=([^;]*)(;|$)')
  var arr = document.cookie.match(reg)
  if (arr) {
    return (arr[2])
  } else {
    return null
  }
}

Vue.prototype.delCookie = (username) => {
  // document.cookie = null;
  var exp = new Date()
  exp.setTime(exp.getTime() - 1)
  // var cval = getCookie(username);
  // if (cval != null)
  document.cookie = username + '=' + null + ';expires=' + exp.toGMTString()
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
