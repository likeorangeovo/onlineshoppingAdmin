<!--
 * @Descripttion: 
 * @Author: likeorange
 * @Date: 2023-04-12 19:35:50
 * @LastEditors: likeorange
 * @LastEditTime: 2023-04-24 23:19:54
-->
<template>
  <div class="Backstage">
    <el-container>
      <el-aside width="200px">
        <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo" default-active="2"
          text-color="#fff" :router="true">
          <el-menu-item index="0">
            <span>Mall</span>
          </el-menu-item>
          <el-menu-item index="/backstage/editUser">
            <span>用户管理</span>
          </el-menu-item>
          <el-menu-item index="/backstage/goods">
            <span>商品管理</span>
          </el-menu-item>
          <el-menu-item index="/backstage/orders">
            <span>订单管理</span>
          </el-menu-item>
          <el-menu-item index="/backstage/statistics">
            <!-- <el-icon>
              <setting />
            </el-icon> -->
            <span>数据统计</span>
          </el-menu-item>
        </el-menu>

      </el-aside>
      <el-container>
        <el-header>
          <el-menu default-active="0" class="el-menu-demo" mode="horizontal" :ellipsis="false">
            <el-menu-item index="0">后台管理系统</el-menu-item>
            <div class="flex-grow" />
            <el-sub-menu index="2">
              <template #title>当前用户</template>
              <el-menu-item index="2-1">退出系统</el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script >
export default {
  setup() {
    return {
    }
  }
}
</script>
<style scoped>
.Backstage {
  height: 100%;
}

.el-container {
  height: 100%;
}

.el-aside {
  height: 100%;
}

.el-menu {
  height: 100%;
}

.flex-grow {
  flex-grow: 1;
}

.el-header {
  padding: 0;
}
</style>