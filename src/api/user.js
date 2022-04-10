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

export function logout () {}
