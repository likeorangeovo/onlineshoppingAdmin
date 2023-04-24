<!--
 * @Descripttion: 
 * @Author: likeorange
 * @Date: 2023-04-12 19:37:20
 * @LastEditors: likeorange
 * @LastEditTime: 2023-04-20 23:04:40
-->
<template lang="">
  <div>
    <div>editgoods</div>
    <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="id" label="商品ID" width="180" />
    <el-table-column prop="primary_pic_url" label="商品主图" width="180" >
        <template #default="scope">
        <el-image style="width: 80px; height: 100px" :src="scope.row.primary_pic_url"/>
      </template>
      </el-table-column>
    <el-table-column prop="list_pic_url" label="商品列表图" width="180" >
    <template #default="scope">
        <el-image style="width: 80px; height: 100px" :src="scope.row.list_pic_url"/>
      </template>
      </el-table-column>
    <el-table-column prop="name" label="商品名称" width="180" />
    <el-table-column prop="retail_price" label="零售价" />
    <el-table-column prop="goods_number" label="库存" width="180" />
    <el-table-column prop="sell_volume" label="销售量" width="180" />
    <el-table-column prop="" label="操作" width="100" >
      <template #default="scope">
        <el-button link type="primary" size="small" @click='editGood(scope.row)'>Edit</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>
<script>
import { getGoods } from '../request/index.js'
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    let tableData = ref([])
    const router = useRouter()
    onBeforeMount(async () => {
      const res = await getGoods()
      tableData.value = res.data.data
    })
    function editGood(item) {
      const params = JSON.parse(JSON.stringify(item))
      router.push({
        name: 'EditGoods',
        state: {
          params
        }
      })
    }
    return {
      editGood,
      tableData
    }
  }
}
</script>
<style lang="">
  
</style>