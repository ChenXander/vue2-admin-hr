// 用户信息
import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'

// 状态
const state = {
  token: getToken() // 设置token的共享状态
}
// 修改状态
const mutations = {
  setToken(state, token) {
    state.token = token // 将token给vuex
    setToken(token) // 同步给缓存
  },
  removeToken(state) {
    state.token = null // 删除vuex的token
    removeToken() // 先清除vuex,再清除缓存vuex和缓存数据的同步
  }
}
// 执行异步
const actions = {
  async login(context, data) {
    // 调用api的接口
    const result = await login(data) // 拿到token
    context.commit('setToken', result) // 设置token
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
