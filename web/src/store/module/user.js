import {
  login,
  logout,
  getUserInfo,
} from '@/api/user'
import { getUsername, setUser, clearLoginInfo, getUid } from '@/libs/utils'
export default {
  state: { username: getUsername(), avatorImgPath: '', uid: getUid() },
  mutations: {
    setAvator(state, avatorPath) {
      state.avatorImgPath = avatorPath
    },
    setUsername(state, username) {
      state.username = username
      setUser(username)
    }
  },
  getters: {
    usernameLen: state => state.username.length,
  },
  actions: {
    handleLogin({ commit }, { username, password }) {
      username = username.trim()
      return new Promise((resolve, reject) => {
        login({
          username,
          password
        }).then(res => {
          if (res.data.status === "success") {
            commit('setUsername', username)
            resolve(res.data.data)
          } else {
            reject(res.data.data)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogOut({ state, commit }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          clearLoginInfo()
          commit('setUsername', '')
          resolve(true)
        }).catch(err => {
          reject(err)
        })
        // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
        // commit('setToken', '')
        // commit('setAccess', [])
        // resolve()
      })
    },
    // 获取用户相关信息
    getUserInfo({ state, commit }) {
      return new Promise((resolve, reject) => {
        try {
          getUserInfo(state.token).then(res => {
            const data = res.data
            commit('setAvator', data.avator)
            commit('setUserName', data.name)
            commit('setUserId', data.user_id)
            commit('setAccess', data.access)
            commit('setHasGetInfo', true)
            resolve(data)
          }).catch(err => {
            reject(err)
          })
        } catch (error) {
          reject(error)
        }
      })
    },
  }
}
