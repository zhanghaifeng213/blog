import {
  login,
  logout,
  info
} from '@/api/user'
import { getUsername, setUser, clearLoginInfo, getUid } from '@/libs/utils'
export default {
  state: { username: getUsername(), avatorImgPath: '', uid: getUid(), role: '' },
  mutations: {
    setAvatar(state, avatorPath) {
      state.avatorImgPath = process.env.API_ROOT + avatorPath.slice(1)
    },
    setRole(state, role) {
      state.role = role
    },
    setUsername(state, username) {
      state.username = username
      setUser(username)
    },
    setUid(state, uid) {
      state.uid = uid
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
          commit('setUid', '')
          commit('setRole', '')
          commit('setAvatar', '')
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
    handleUserInfo({ commit }, data) {
      let username = getUsername()
      return new Promise((resolve, reject) => {
        info(username).then((res) => {
          const data = res.data.data
          commit('setAvatar', data.avatar)
          commit('setRole', data.role)
          commit('setUid', data.uid)
          resolve(data)
        }).catch((err) => {
          reject(err)
        })
      })
    },
  }
}
