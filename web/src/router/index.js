/**
 * 全站路由配置
 *
 * 建议:
 * 1. 代码中路由统一使用name属性跳转(不使用path属性)
 */
import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)

// 开发环境不使用懒加载, 因为懒加载页面太多的话会造成webpack热更新太慢, 所以只有生产环境使用懒加载
const _import = require('./import-' + process.env.NODE_ENV)

// 全局路由(无需嵌套上左右整体布局)
const globalRoutes = [
  // {
  //   path: '/404',
  //   component: _import('common/404'),
  //   name: '404',
  //   meta: { title: '404未找到' }
  // },
  // {
  //   path: '/login',
  //   component: _import('common/login/login'),
  //   name: 'login',
  //   meta: { title: '登录' }
  // }
]

// 主入口路由(需嵌套上左右整体布局) layou1
const mainRoutes = {
  path: '/',
  component: _import('layout/main'),
  name: 'main',
  redirect: { name: 'home' },
  meta: { title: '主入口整体布局' },
  children: [
    {
      path: '/home',
      component: _import('home'),
      name: 'home',
      meta: { title: '首页' }
    },
  ],
  // beforeEnter(to, from, next) {
  //   let token = Vue.cookie.get('token')
  //   if (!token || !/\S/.test(token)) {
  //     clearLoginInfo()
  //     next()
  //   } else {
  //     if (store.state.user.hasGetInfo) {
  //       console.log('hasGetInfo')
  //       next()
  //     } else {
  //       console.log('donthasGetInfo')
  //       store
  //         .dispatch('getUserInfo')
  //         .then(() => {
  //           // 拉取用户信息，通过用户权限和跳转的页面的name来判断是否有权限访问;access必须是一个数组，如：['super_admin'] ['super_admin', 'admin']
  //           next()
  //         })
  //         .catch(() => {
  //           clearLoginInfo()
  //           next()
  //         })
  //     }
  //   }
  // }
}

const router = new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  isAddDynamicMenuRoutes: false, // 是否已经添加动态(菜单)路由
  routes: globalRoutes
    .concat(mainRoutes)
})

export default router
