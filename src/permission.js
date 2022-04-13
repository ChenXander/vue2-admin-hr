// 权限拦截在路由跳转，导航守卫

import router from '@/router' // 引入路由实例
import store from '@/store' // 引入vuex store实例
import NProgress from 'nprogress' // 引入一份进度条插件
import 'nprogress/nprogress.css' // 引入进度条样式

const whiteList = ['/login', '/404'] // 定义白名单  所有不受权限控制的页面
// 路由的前置守卫
router.beforeEach(async (to, from, next) => {
  NProgress.start() // 开启进度条
  // 首先判断有无token
  if (store.getters.token) {
    // 如果有token 继续判断是不是去登录页
    if (to.path === '/login') {
      next('/') // 跳到主页
    } else {
      if (!store.getters.userId) {
        // 获取用户资料是异步的
        const { roles } = await store.dispatch('user/getUserInfo')
        // 筛选用户的可用路由
        // routes就是筛选得到的动态路由
        const routes = await store.dispatch(
          'permission/filterRoutes',
          roles.menus
        )
        // 动态路由 添加到 路由表中 默认的路由表 只有静态路由 没有动态路由
        // addRoutes  必须 用 next(地址) 不能用next()
        router.addRoutes([
          ...routes,
          { path: '*', redirect: '/404', hidden: true }
        ]) // 添加动态路由到路由表
        // 添加完动态路由之后
        next(to.path)
      } else {
        next() // 直接放行
      }
    }
  } else {
    // 如果没有token
    if (whiteList.indexOf(to.path) > -1) {
      // 如果找到了 表示在在名单里面
      next()
    } else {
      next('/login') // 跳到登录页
    }
  }
  NProgress.done() // 手动强制关闭一次,为了解决手动切换地址时进度条的不关闭的问题
})

// 后置守卫
router.afterEach(() => {
  NProgress.done() // 关闭进度条
})
