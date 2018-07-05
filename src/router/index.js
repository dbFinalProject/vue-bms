import Vue from 'vue'
import Router from 'vue-router'
// import {post,fetch,patch,put} from '@/util/http'
// import {delCookie,getCookie} from '@/util/util'
import Login from '@/components/login/Login'
import Dashboard from '@/components/Dashboard/Dashboard'
import CustomerService from '@/components/CustomerService/CustomerService'
import GetOwnBook from '@/components/GetOwnBook/GetOwnBook'
import PurchaseBook from '@/components/PurchaseBook/PurchaseBook'
import SalesStatistics from '@/components/SalesStatistics/SalesStatistics'
Vue.use(Router);

export default new Router({
  routes: [
  {
    path: '/Dashboard',
    component: Dashboard,
    children: [
      {
        path: 'CustomerService',
        component: CustomerService
      },
      {
        path: 'GetOwnBook',
        component: GetOwnBook
      },
      {
        path: 'PurchaseBook',
        component: PurchaseBook
      },
      {
        path: 'SalesStatistics',
        component: SalesStatistics
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
]})

// //这个是请求页面路由的时候会验证token存不存在，不存在的话会到登录页
// router.beforeEach((to, from, next) => {
//  if(to.meta.requireAuth) {
//   fetch('/api/user/login').then(res => {
//     console.log(res)
//    if(res.status == 200) {
//     next();
//    } else {
//     if(getCookie('session')) {
//      delCookie('session');
//     }
//     next({
//      path: '/'
//     });
//    }
//   });
//  } else {
//   next();
//  }
// });
//})
