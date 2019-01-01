/**
 * 全站路由配置
 *
 * 建议:
 * 1. 代码中路由统一使用name属性跳转(不使用path属性)
 */
import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import Cookies from 'js-cookie'
import { clearLoginInfo } from '@/libs/utils.js'

Vue.use(Router)

// 开发环境不使用懒加载, 因为懒加载页面太多的话会造成webpack热更新太慢, 所以只有生产环境使用懒加载
const _import = require('./import-' + process.env.NODE_ENV)

// 全局路由(无需嵌套上左右整体布局)
const globalRoutes = [
  {
    path: '/404',
    component: _import('404'),
    name: '404',
    meta: { title: '404未找到' }
  },
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
    {
      path: '/article-detail',
      component: _import('article-detail'),
      name: 'article-detail'
    },
    {
      path: '/publish-article',
      component: _import('publish-article'),
      name: 'publish-article'
    },
    {
      path: '/persional',
      component: _import('persional'),
      name: 'persional',
      meta: { title: 'persional' }
    }
  ],
  beforeEnter(to, from, next) {
    let username = Cookies.get('username')
    if (!username || !/\S/.test(username)) {
      clearLoginInfo()
      next()
    } else {
      if (store.state.user.roleId) {
        console.log('hasGetInfo')
        next()
      } else {
        console.log('donthasGetInfo')
        store
          .dispatch('handleUserInfo')
          .then(() => {
            // 拉取用户信息，通过用户权限和跳转的页面的name来判断是否有权限访问;access必须是一个数组，如：['super_admin'] ['super_admin', 'admin']
            next()
          })
          .catch(() => {
            clearLoginInfo()
            next()
          })
      }
    }
  }
}

const router = new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  isAddDynamicMenuRoutes: false, // 是否已经添加动态(菜单)路由
  routes: globalRoutes
    .concat(mainRoutes)
})

export default router
