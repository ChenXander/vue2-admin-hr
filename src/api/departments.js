// 组织架构请求

import request from '@/utils/request'

// 获取组织架构数据
export function getDepartments () {
  return request({
    url: '/company/department'
  })
}
