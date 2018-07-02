import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/Login'
import Dashboard from '@/components/Dashboard/Dashboard'
import CustomerService from '@/components/CustomerService/CustomerService'
import GetOwnBook from '@/components/GetOwnBook/GetOwnBook'
import PurchaseBook from '@/components/PurchaseBook/PurchaseBook'
import SalesStatistics from '@/components/SalesStatistics/SalesStatistics'
Vue.use(Router)

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
  ]
})
