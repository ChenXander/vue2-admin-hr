// 用户请求api
import request from '@/utils/request'

// 登录接口
export function login (data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

// 获取用户的基本资料
export function getUserInfo () {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}
// 根据用户id获取用户基本信息
export function getUserDetailById (id) {
  return request({
    url: `/sys/user/${id}`
  })
}

export function logout () {}
