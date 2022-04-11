// 公司设置的api接口

import request from '@/utils/request'

// 获取公司角色列表
export function getRoleList (params) {
  return request({
    url: '/sys/role',
    params
  })
}

// 获取公司信息
export function getCompanyInfo (companyId) {
  return request({
    url: `/company/${companyId}`
  })
}
