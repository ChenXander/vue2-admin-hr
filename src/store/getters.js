// 快捷访问

const getters = {
  sidebar: (state) => state.app.sidebar,
  device: (state) => state.app.device,
  token: (state) => state.user.token, // 在根级的getters上 开放子模块的属性
  name: (state) => state.user.userInfo.username // 用户名称的快捷访问
}
export default getters
