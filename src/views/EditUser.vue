<!--
 * @Descripttion: 
 * @Author: likeorange
 * @Date: 2023-04-12 19:37:05
 * @LastEditors: likeorange
 * @LastEditTime: 2023-04-13 16:20:06
-->
<template lang="">
  <div>
    <div>editUser</div>
    <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="id" label="用户ID" width="180" />
    <el-table-column prop="username" label="用户名称" width="180" />
    <el-table-column prop="email" label="邮箱" />
    <el-table-column prop="phone" label="联系方式" width="180" />
    <el-table-column prop="receiver" label="收货人" width="180" />
    <el-table-column prop="address" label="收件地址" />
    <el-table-column prop="" label="操作" width="100" >
      <template #default>
        <el-button link type="primary" size="small">Edit</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>
<script>
import { getUserInfo } from '../request/index.js'
import { ref, onBeforeMount} from "vue";
export default {
  setup() {
    let tableData = ref([])
    onBeforeMount(async ()=> {
      const res = await getUserInfo()
      tableData.value = res.data.data
    })
    return {
      tableData
    }
  }
}
</script>
<style>
  
</style>