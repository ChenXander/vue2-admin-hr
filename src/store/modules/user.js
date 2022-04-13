// 用户信息
import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth'
import { login, getUserInfo, getUserDetailById } from '@/api/user'
import { resetRouter } from '@/router'

// 状态
const state = {
  token: getToken(), // 设置token的共享状态
  userInfo: {}
}
// 修改状态
const mutations = {
  setToken (state, token) {
    state.token = token // 将token给vuex
    setToken(token) // 同步给缓存
  },
  removeToken (state) {
    state.token = null // 删除vuex的token
    removeToken() // 先清除vuex,再清除缓存vuex和缓存数据的同步
  },
  // 设置用户信息
  setUserInfo (state, result) {
    state.userInfo = result
  },
  // 删除用户信息
  reomveUserInfo (state) {
    state.userInfo = {}
  }
}
// 执行异步
const actions = {
  async login (context, data) {
    // 调用api的接口
    const result = await login(data) // 拿到token
    context.commit('setToken', result) // 设置token
    // 拿到token说明登录成功,设置token时间戳
    setTimeStamp()
  },
  // 获取用户资料action
  async getUserInfo (context) {
    const result = await getUserInfo()
    // 获取用户详情
    const baseInfo = await getUserDetailById(result.userId) // 为了获取头像
    const baseResult = { ...result, ...baseInfo } // 将两个接口结果合并
    context.commit('setUserInfo', baseResult) // 将整个的个人信息设置到用户的vuex数据中
    return result // 用于权限管理
  },

  // 登出的action
  logout (context) {
    // 删除token
    context.commit('removeToken') // 不仅仅删除了vuex中的 还删除了缓存中的
    // 删除用户资料
    context.commit('removeUserInfo') // 删除用户信息
    // 重置路由
    resetRouter()
    // 去设置权限模块下路由为初始状态
    // Vuex子模块怎么调用子模块的action 都没加锁的情况下 可以随意调用
    // 不加命名空间的情况下的 所有的mutations和action都是挂在全局上的 所以可以直接调用
    // 但是加了命名空间的子模块 怎么调用另一个加了命名空间的子模块的mutations
    // 加了命名空间的context指的不是全局的context
    // mutations名称 载荷 payload 第三个参数  { root: true } 调用根级的mutations或者action
    context.commit('permission/setRoutes', [], { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
