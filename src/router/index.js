import Vue from 'vue'
import Router from 'vue-router'
import Bus from '@/bus'
import { SetDefaultHeader } from '_common/http'

import BasicData from './basic_data'
import ReportImport from './report_import'
import Board from './board'
import FarmBoard from './farm_board'
import DataEntry from './data_entry'
import Rights from './rights'
import Product from './product'

Vue.use(Router)


const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'layouts',
      redirect: '/home',
      component: () => import('@/layouts'),
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('_views/home'),
        },
        ...BasicData,
        ...ReportImport,
        ...DataEntry,
        ...Rights,
        ...FarmBoard,
        ...Product,
      ],
    },
    ...Board,
    {
      path: '/login_signup',
      component: () => import('_views/login_signup'),
      name: '登录注册',
      meta: {
        title: '登录注册',
      },
    },
  ],
  linkActiveClass: 'active',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0,
      }
    }
  },
})
/**
 * 路由拦截
 * 不是所有版块都需要鉴权的,所以需要鉴权的在路由meta添加添加一个字段needLogin,
 * 设置为true的时候就必须走鉴权,像登录页这些不要,是可以直接访问的!
 */
router.beforeEach((to, from, next) => {
  // 路由发生变化修改页面title
  if (to.meta.title) {
    document.title = to.meta.title
  }

  if (to.path === '/login_signup' || to.path === '/home' || to.path === '/') {
    next()
    return
  }
  let authorization = to.query.token || localStorage.getItem('Authorization')
  let phone = to.query.phone
  let username = to.query.name || phone
  if (authorization) {
    localStorage.setItem('Authorization', authorization)
    SetDefaultHeader('Authorization', authorization)
    if (phone) {
      localStorage.setItem('Phone', phone)
      localStorage.setItem('UserName', username)
    }
    next()
  } else {
    localStorage.clear()
    Bus.$message.error('登录失效')
    next({
      path: '/login_signup?isLogin=1&from=' + to.fullPath,
    })
  }
  next()
})

export default router
