// 组织架构请求

import request from '@/utils/request'

// 获取组织架构数据
export function getDepartments () {
  return request({
    url: '/company/department'
  })
}

// 根据id删除部门
export function delDepartments (id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
    /**
     * 接口是根据restful的规则设计的：
     * 删除 delete
     * 新增 post
     * 修改 put
     * 获取 get
     */
  })
}

// 新增部门接口
export function addDepartments (data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}
