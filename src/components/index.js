// 所有的公共的组件的全局注册
import PageTools from './PageTools'
import UploadExcel from './UploadExcel'
import ImageUpload from './ImageUpload'
import Print from 'vue-print-nb'
import ScreenFull from './ScreenFull'
import ThemePicker from './ThemePicker'
import LangSelect from './Lang'
import TagsView from './TagsView'

export default {
  install (Vue) {
    //  注册全局的通用栏组件对象
    Vue.component('PageTools', PageTools)
    // 注册导入excel组件
    Vue.component('UploadExcel', UploadExcel)
    // 注册导入上传组件
    Vue.component('ImageUpload', ImageUpload)
    // 打印插件
    Vue.use(Print)
    // 全屏切换
    Vue.component('ScreenFull', ScreenFull)
    // 主题
    Vue.component('ThemePicker', ThemePicker)
    // 语言
    Vue.component('LangSelect', LangSelect)
    // 多页签组件
    Vue.component('TagsView', TagsView)
  }
}
