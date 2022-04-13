<template>
  <!-- 权限管理 -->
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 靠右的按钮 -->
      <page-tools>
        <template v-slot:after>
          <el-button type="primary" size="small">添加权限</el-button>
        </template>
      </page-tools>
      <!-- 表格 -->
      <el-card>
        <el-table border>
          <el-table-column align="center" label="名称" />
          <el-table-column align="center" label="标识" />
          <el-table-column align="center" label="描述" />
          <el-table-column align="center" label="操作">
            <template>
              <el-button type="text">添加</el-button>
              <el-button type="text">编辑</el-button>
              <el-button type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
</style>
