<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 组织架构头部 -->
      <el-card class="tree-card">
        <!-- 行列布局 -->
        <el-row
          type="flex"
          justify="space-between"
          align="middle"
          style="height: 40px"
        >
          <!-- 左侧 -->
          <el-col>
            <span>HR科技股份有限公司</span>
          </el-col>

          <el-col :span="4">
            <!-- 右侧 -->
            <el-row type="flex" justify="end">
              <el-col>负责人</el-col>
              <el-col>
                <!-- 下拉菜单 element -->
                <el-dropdown>
                  <span>操作<i class="el-icon-arrow-down" /></span>
                  <!-- 下拉菜单 -->
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>添加子部门</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
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
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
