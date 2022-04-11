// 快捷访问

const getters = {
  sidebar: (state) => state.app.sidebar,
  device: (state) => state.app.device,
  token: (state) => state.user.token, // 在根级的getters上开放子模块的属性
  name: (state) => state.user.userInfo.username, // 用户名称的映射
  userId: (state) => state.user.userInfo.userId, // 建立用户id的映射
  staffPhoto: (state) => state.user.userInfo.staffPhoto, // 建立用户头像的映射
  companyId: (state) => state.user.userInfo.companyId // 建立对于user模块的companyId的快捷访问
}
export default getters
