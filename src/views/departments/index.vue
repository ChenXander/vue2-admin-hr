<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 组织架构头部 -->
      <el-card class="tree-card">
        <tree-tools :tree-node="company" :is-root="true" />

        <!-- 树形组件 这里的props是element树形组件的属性-->
        <el-tree
          :data="departs"
          :props="defaultProps"
          :default-expand-all="true"
        >
          <!-- 传入内容 插槽内容 会循环多次 有多少节点 就循环多少次 -->
          <!-- 作用域插槽 slot-scope="obj" 接收传递给插槽的数据 data 每个节点的数据对象-->
          <tree-tools
            slot-scope="{ data }"
            :tree-node="data"
            @delDepts="getDepartments"
          />
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
// 子组件
import treeTools from '@/views/departments/components/tree-tools.vue'

// api请求
import { getDepartments } from '@/api/departments'

// 工具函数
import { transListToTreeData } from '@/utils'

export default {
  components: { treeTools },
  data () {
    return {
      company: {}, // 公司数据
      departs: [], // 组织架构数据
      defaultProps: {
        label: 'name' // 表示从这个属性显示内容
      }
    }
  },
  created () {
    this.getDepartments() // 获取组织架构数据
  },
  methods: {
    async getDepartments () {
      const result = await getDepartments()
      // this.company = { name: result.companyName, manager: '负责人' }
      this.company = { name: 'HR科技股份有限公司', manager: '负责人' }
      this.departs = transListToTreeData(result.depts, '') // 需要将其转化成树形结构
      console.log(result)
    }
  }
}
</script>

<style lang="scss" scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
