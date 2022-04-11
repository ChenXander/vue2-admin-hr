import Cookies from 'js-cookie'

const TokenKey = 'CHEN_TOKEN' // 设定一个独一无二的key
const timeKey = 'hrsaas-timestamp-key' // token的时间戳

// 获取token
export function getToken () {
  return Cookies.get(TokenKey)
}
// 设置token
export function setToken (token) {
  return Cookies.set(TokenKey, token)
}
// 移除token
export function removeToken () {
  return Cookies.remove(TokenKey)
}
// 获取时间戳
export function getTimeStamp () {
  return Cookies.get(timeKey)
}
// 设置时间戳
export function setTimeStamp () {
  Cookies.set(timeKey, Date.now())
}
