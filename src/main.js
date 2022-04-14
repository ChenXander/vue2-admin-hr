import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import Component from '@/components' // 全局通用组件
/**
 * elementUI
 */
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
/**
 * 样式
 */
import '@/styles/index.scss' // global css
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

/**
 * 自定义指令
 */
import * as directives from '@/directives'
/**
 * 引入工具类
 */
import * as filters from '@/filters'
import checkPermission from '@/mixin/checkPermission'
/**
 * 图标
 */
import '@/icons' // icon
import '@/permission' // permission control

import i18n from '@/lang'

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI, {
  // element本身支持i18n的处理
  // 此时 i18n就会根据当前的locale属性去寻找对应的显示内容
  i18n: (key, value) => i18n.t(key) // t方法 会去对应的语言包里寻找对应的内容
  // 改变locale的值 就可以改变对应的当前语言
})
Vue.use(Component) // 注册自己的插件

// 全局混入
Vue.mixin(checkPermission)

// 遍历所有的导出的指令对象 完成自定义全局注册
Object.keys(directives).forEach((key) => {
  Vue.directive(key, directives[key]) // 注册自定义指令
})
// 注册全局的过滤器
Object.keys(filters).forEach((key) => {
  // 注册过滤器
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: (h) => h(App)
})
