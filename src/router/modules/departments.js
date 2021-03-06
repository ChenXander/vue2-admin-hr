// 导出组织架构的路由规则

import Layout from '@/layout'
//  {  path: '', component: '' }
// 每个子模块 其实 都是外层是layout  组件位于layout的二级路由里面
export default {
  path: '/departments', // 路径
  component: Layout, // 组件
  name: 'departments',
  // 配置二级路的路由表
  children: [
    {
      path: '', // 这里当二级路由的path什么都不写的时候 表示该路由为当前二级路由的默认路由
      component: () => import('@/views/departments'),
      name: 'departments', // 给路由规则加一个name
      // 路由元信息,其实就是存储数据的对象,可以在这里放置一些信息
      meta: {
        title: '组织架构',
        icon: 'tree'
      }
    }
  ]
}

// 当访问地址是 /departments的时候 layout组件会显示,此时二级路由的默认组件也会显示
