import store from '@/store'

// 定义混入对象
export default {
  // 混入对象是组件的选项对象
  methods: {
    // 检查权限 要么有 没有没有 key就是要检查的点
    checkPermission (key) {
      // 去用户的信息里面找 points中有没有key 如果有key 则认为有权限 如果没有key则认为不能点击
      const { userInfo } = store.state.user
      if (userInfo.roles.points && userInfo.roles.points.length) {
        return userInfo.roles.points.some((item) => item === key)
      }
      // 如果没进去 说明没权限
      return false
    }
  }
}
