import { setToken, getToken, removeToken } from '@/utils/auth'
import { loginApi,getProfileApi } from '@/api/user'
const state = {
  token: getToken(),
  userInfo: {}
}

const mutations = {
  // 设置token
  setToken(state, token) {
    console.log("token",token.token);
    state.token = token.token
    setToken(token.token)
  },
  // 删除token
  removeToken(state) {
    state.token = null
    removeToken()
  },
  // 设置user
  setUser(state, user) {
    state.userInfo = user
  }
}

const actions = {
  // 登录方法
  async login(context, payload) {
    delete payload.isAgree
    const token = await loginApi(payload)
    console.log("token",token);
    console.log("pay",payload);
    context.commit('setToken', token)
  },
  // 获取用户信息
  async getUserInfo({ commit }) {
    const res = await getProfileApi()
    console.log('res=>', res)
    commit('setUser', res)
    return res
  },
  // 退出登录
  logout(context) {
    // 清除token
    context.commit('removeToken')
    // 清除用户信息
    context.commit('setUser', {})
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
