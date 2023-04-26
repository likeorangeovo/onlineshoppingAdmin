<!--
 * @Descripttion: 
 * @Author: likeorange
 * @Date: 2023-04-12 19:37:39
 * @LastEditors: likeorange
 * @LastEditTime: 2023-04-26 20:27:11
-->
<template>
  <div>
    order
  </div>
  <el-tabs v-model="activeName">
    <el-tab-pane  label="全部" name="allorders">
      <el-table :data="orderInfo" style="width: 100%">
        <el-table-column prop="order_id" label="订单ID" width="180" />
        <el-table-column prop="user_id" label="用户ID" width="180" />
        <el-table-column prop="image" label="商品图" width="180">
          <template #default="scope">
            <el-image style="width: 80px; height: 100px" :src="scope.row.image" />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="商品名称" width="180" />
        <el-table-column prop="quantity" label="商品数量" />
        <el-table-column prop="total_price" label="总价" width="180" />
        <el-table-column prop="" label="操作" width="100">
          <template #default="scope">
            <el-button type="primary" size="small">{{ scope.row.msg }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>

    <el-tab-pane label="未付款" name="unpaid">
      <el-table :data="unpaid" style="width: 100%">
        <el-table-column prop="order_id" label="订单ID" width="180" />
        <el-table-column prop="user_id" label="用户ID" width="180" />
        <el-table-column prop="image" label="商品图" width="180">
          <template #default="scope">
            <el-image style="width: 80px; height: 100px" :src="scope.row.image" />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="商品名称" width="180" />
        <el-table-column prop="quantity" label="商品数量" />
        <el-table-column prop="total_price" label="总价" width="180" />
        <el-table-column prop="" label="操作" width="100">
          <template #default="scope">
            <el-button type="primary" size="small">{{ scope.row.msg }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>

    <el-tab-pane label="未发货" name="unshipped">
      <el-table :data="unshipped" style="width: 100%">
        <el-table-column prop="order_id" label="订单ID" width="180" />
        <el-table-column prop="user_id" label="用户ID" width="180" />
        <el-table-column prop="image" label="商品图" width="180">
          <template #default="scope">
            <el-image style="width: 80px; height: 100px" :src="scope.row.image" />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="商品名称" width="180" />
        <el-table-column prop="quantity" label="商品数量" />
        <el-table-column prop="total_price" label="总价" width="180" />
        <el-table-column prop="" label="操作" width="100">
          <template #default="scope">
            <el-button type="primary" size="small" @click='change(scope.row.status,scope.row.order_id)'>{{ scope.row.msg }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>

    <el-tab-pane label="已发货" name="shipped">
      <el-table :data="shipped" style="width: 100%">
        <el-table-column prop="order_id" label="订单ID" width="180" />
        <el-table-column prop="user_id" label="用户ID" width="180" />
        <el-table-column prop="image" label="商品图" width="180">
          <template #default="scope">
            <el-image style="width: 80px; height: 100px" :src="scope.row.image" />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="商品名称" width="180" />
        <el-table-column prop="quantity" label="商品数量" />
        <el-table-column prop="total_price" label="总价" width="180" />
        <el-table-column prop="" label="操作" width="100">
          <template #default="scope">
            <el-button type="primary" size="small">{{ scope.row.msg }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>

    <el-tab-pane label="已完成" name="completed">
      <el-table :data="completed" style="width: 100%">
        <el-table-column prop="order_id" label="订单ID" width="180" />
        <el-table-column prop="user_id" label="用户ID" width="180" />
        <el-table-column prop="image" label="商品图" width="180">
          <template #default="scope">
            <el-image style="width: 80px; height: 100px" :src="scope.row.image" />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="商品名称" width="180" />
        <el-table-column prop="quantity" label="商品数量" />
        <el-table-column prop="total_price" label="总价" width="180" />
        <el-table-column prop="" label="操作" width="100">
          <template #default="scope">
            <el-button type="primary" size="small">{{ scope.row.msg }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { getOrder,changeOrder } from '../request/index.js'
import { ref, onBeforeMount,computed } from "vue";
export default {
  setup() {
    const activeName = ref('allorders')
    let orderInfo = ref([])
    let unpaid = computed(()=>{
      let res = []
      for (let item of orderInfo.value) {
        if (item.status == 0) {
          item.msg = '待付款'
          res.push(item)
        }
      }
      return res
    })
    let unshipped = computed(()=>{
      let res = []
      for (let item of orderInfo.value) {
        if (item.status == 1) {
          item.msg = '发货'
          res.push(item)
        }
      }
      return res
    })
    let shipped = computed(()=>{
      let res = []
      for (let item of orderInfo.value) {
        if (item.status == 2) {
          item.msg = '待收货'
          res.push(item)
        }
      }
      return res
    })
    let completed = computed(()=>{
      let res = []
      for (let item of orderInfo.value) {
        if (item.status == 3) {
          item.msg = '已完成'
          res.push(item)
        }
      }
      return res
    })
    async function change(status,id) {
      await changeOrder({status:status+1,id:id})
      for(let item of orderInfo.value){
        if(item.order_id == id ){
          item.status += 1;
          break;
        }
      }
    }
    onBeforeMount(async () => {
      /*0未付款，1已付款未发货，2已发货未确认收到，3确认到货订单完成*/
      const res = await getOrder()
      orderInfo.value = res.data.data
      console.log(orderInfo.value)
    })
    return {
      activeName,
      orderInfo,
      unpaid,
      unshipped,
      shipped,
      completed,
      change
    }
  }
}
</script>
<style scoped></style>