<!--
 * @Descripttion: 
 * @Author: likeorange
 * @Date: 2023-04-12 19:37:31
 * @LastEditors: likeorange
 * @LastEditTime: 2023-04-24 23:30:14
-->
<template lang="">
  <div class="personal-info">
    <el-form :model="statemsg" >
      <el-form-item label="商品图片">
        <el-avatar shape="square" :src="statemsg.primary_pic_url" :size="100"></el-avatar>
        <el-upload class="upload-demo"  action="/api/upload/avatar" :limit="1" :on-success="handlePrimary" style='margin:0 30px'>
        <el-button size="small" type="primary">上传主图</el-button>
        </el-upload>

        <el-avatar shape="square" :src="statemsg.list_pic_url" :size="100"></el-avatar>
        <el-upload class="upload-demo"  action="/api/upload/avatar" :limit="1" :on-success="handleList" style='margin:0 30px'>
        <el-button size="small" type="primary">上传列表图</el-button>
        </el-upload>

      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="statemsg.name"></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="goods_brief">
        <el-input v-model="statemsg.goods_brief"></el-input>
      </el-form-item>

      <el-form-item label="分类" prop="category_id">
        <el-select v-model="statemsg.category_id" class="m-2" placeholder="Select">
        <el-option
        v-for="item in mainCatrgory"
        :key="item.id"
        :label="item.name"
        :value="item.id"/>
        </el-select>
      </el-form-item>

      <el-form-item label="零售价" prop="retail_price">
        <el-input v-model="statemsg.retail_price"></el-input>
      </el-form-item>
      <el-form-item label="商品数量" prop="goods_number">
        <el-input v-model="statemsg.goods_number"></el-input>
      </el-form-item>
      <el-form-item label="销售量" prop="sell_volume">
        <el-input v-model="statemsg.sell_volume"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { useRoute } from 'vue-router';
import { ref, onBeforeMount } from "vue";
import { downloadAvatar, category } from '../request/index.js'
export default {
  setup() {
    const route = useRoute()
    let statemsg = ref({})
    let mainCatrgory = ref([])
    async function handlePrimary(response) {
      console.log(response)
      statemsg.value.primary_pic_url = 'http://127.0.0.1:7001' + '/download/avatar/' + response.data
    }
    async function handleList(response) {
      console.log(response)
      statemsg.value.list_pic_url = 'http://127.0.0.1:7001' + '/download/avatar/' + response.data
    }
    function submitForm() {

    }
    onBeforeMount(async () => {
      const categoryRes = await category()
      mainCatrgory.value = categoryRes.data.data
      statemsg.value = history.state.params
    })
    return {
      statemsg,
      handlePrimary,
      handleList,
      mainCatrgory,
      submitForm
    }
  }
}
</script>
<style lang="">
  
</style>