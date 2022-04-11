<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 组织架构头部 -->
      <el-card class="tree-card">
        <tree-tools :tree-node="company" :is-root="true" @addDepts="addDepts" />

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
            @addDepts="addDepts"
          />
        </el-tree>
      </el-card>
    </div>
    <add-dept :show-dialog="showDialog" :tree-node="node" />
  </div>
</template>

<script>
// 子组件
import treeTools from '@/views/departments/components/tree-tools.vue'
import AddDept from '@/views/departments/components/add-dept.vue'

// api请求
import { getDepartments } from '@/api/departments'

// 工具函数
import { transListToTreeData } from '@/utils'

export default {
  components: { treeTools, AddDept },
  data () {
    return {
      company: {}, // 公司数据
      departs: [], // 组织架构数据
      defaultProps: {
        label: 'name' // 表示从这个属性显示内容
      },
      showDialog: false,
      node: null // 记录当前点击的node
    }
  },
  created () {
    this.getDepartments() // 获取组织架构数据
  },
  methods: {
    async getDepartments () {
      const result = await getDepartments()
      // this.company = { name: result.companyName, manager: '负责人' }
      this.company = { name: result.companyName, manager: '负责人', id: '' }
      this.departs = transListToTreeData(result.depts, '') // 需要将其转化成树形结构
      console.log(result)
    },
    // 添加子部门
    addDepts (node) {
      this.showDialog = true // 显示弹层
      // 因为node是当前的点击的部门， 此时这个部门应该记录下来,
      this.node = node
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
