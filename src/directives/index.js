// 自定义指令

export const imagerror = {
  // 指令对象,会在当前的dom元素插入到节点之后执行
  // 只会执行一次
  inserted (dom, options) {
    // dom 表示当前指令作用的dom对象,此时就是图片
    // 当图片有地址 但是地址没有加载成功的时候会报错,会触发图片的一个事件onerror
    dom.src = dom.src || options.value

    dom.onerror = function () {
      // 当图片出现异常的时候 会将指令配置的默认图片设置为该图片的内容
      // dom可以注册error事件
      dom.src = options.value
    }
  },
  // 这个钩子函数会在指令作用的组件 更新数据完毕之后执行
  componentUpdated (dom, options) {
    dom.src = dom.src || options.value
  }
}
