import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
// import {post,fetch,patch,put} from '@/util/http'
// import {delCookie,getCookie} from '@/util/util'
import Login from '@/components/login/Login'
import Dashboard from '@/components/Dashboard/Dashboard'
import CustomerService from '@/components/CustomerService/CustomerService'
import GetOwnBook from '@/components/GetOwnBook/GetOwnBook'
import PurchaseBook from '@/components/PurchaseBook/PurchaseBook'
import SalesStatistics from '@/components/SalesStatistics/SalesStatistics'
Vue.use(Router)
Vue.prototype.$http = axios
const routes = [
  {
    path: '/Dashboard',
    component: Dashboard,
    meta: { requireAuth: true },
    children: [
      {
        path: 'CustomerService',
        component: CustomerService,
        meta: { requireAuth: true }
      },
      {
        path: 'GetOwnBook',
        component: GetOwnBook,
        meta: { requireAuth: true }
      },
      {
        path: 'PurchaseBook',
        component: PurchaseBook,
        meta: { requireAuth: true }
      },
      {
        path: 'SalesStatistics',
        component: SalesStatistics,
        meta: { requireAuth: true }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/*',
    redirect: '/login'
  }
];

const router = new Router({
  routes
});

// 这个是请求页面路由的时候会验证token存不存在，不存在的话会到登录页
router.beforeEach((to, from, next) => {
  if(to.meta.requireAuth) {
    axios.get('/api/user/login').then(res => {
      //console.log(res)
      if(res.data.status === true) {
        next();
      } else {
        next({
          path: '/login',
          query: {redirect: to.fullPath}
        });
      }
    });
  } else {
    //console.log("login")
    next()
  }
})

export default router
