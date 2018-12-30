import Vue from 'vue'
import router from '@/router'
import store from '@/store'
import Cookies from 'js-cookie'
/**
 * 清除登录信息
 */
export function clearLoginInfo() {
  // Vue.cookie.delete('token')
  Cookies.remove('username')
  // store.commit('resetStore')
}

export const TOKEN_KEY = 'token'

export const setToken = token => {
  Cookies.set(TOKEN_KEY, token, { expires: config.cookieExpires || 1 })
}

export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY)
  if (token) return token
  else return false
}

export const setUser = (username) => {
  Cookies.set('username', username)
}

export const getUsername = () => {
  const username = Cookies.get('username')
  console.log(username)
  if (username) return username
  else return false
}

export const getUid = () => {
  const uid = Cookies.get('uid')
  console.log(uid)
  if (uid) return uid
  else return false
}

