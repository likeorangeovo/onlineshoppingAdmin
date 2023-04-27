<template lang="">
  <div>
    <e-charts class="chart" :option="option" />
    <e-charts class="chart" :option="userOption" />
  </div>
</template>
<script>
import { ref, computed, onBeforeMount } from 'vue'
import { getOrder, getUserInfo } from '../request/index.js'
export default {
  setup() {
    let dates = ref([])
    let sales = ref([])
    let option = ref({})
    let userOption = ref({})
    let userInfoDatas = ref([])
    onBeforeMount(async () => {
      const res = await getOrder()
      const orders = [...res.data.data]
      // 将订单按日期分组，并计算每天的销售额
      const salesByDay = orders.reduce((acc, cur) => {
        const date = cur.time.split('T')[0];
        acc[date] = (acc[date] || 0) + cur.total_price;
        return acc;
      }, {});
      // 将销售数据按日期排序
      const sortedSales = Object.entries(salesByDay).sort((a, b) => a[0].localeCompare(b[0]));
      dates.value = sortedSales.map(sale => sale[0]);
      sales.value = sortedSales.map(sale => sale[1]);
      option.value = {
        title: {
          text: '订单销量柱状图'
        },
        tooltip: {},
        legend: {
          data: ['订单总金额']
        },
        xAxis: {
          data: dates.value
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          name: '订单总金额',
          type: 'bar',
          data: sales.value
        }]
      }

      //用户注册统计图
      const userInfoRes = await getUserInfo()
      const users = [...userInfoRes.data.data]
      users.forEach(user => {
        const date = user.create_time.slice(0, 10);
        const item = userInfoDatas.value.find(item => item.date === date);
        if (item) {
          item.count++;
        } else {
          userInfoDatas.value.push({ date, count: 1 });
        }
      })
      userOption.value = {
        title: {
          text: '用户注册量统计图'
        },
        tooltip: {},
        legend: {
          data: ['用户注册量']
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: userInfoDatas.value.map(item => item.date)
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          name: '用户注册量',
          type: 'line',
          data: userInfoDatas.value.map(item => item.count)
        }]
      };
    })

    return {
      dates,
      sales,
      option,
      userOption,
      userInfoDatas
    }
  }
}
</script>
<style scoped>
.chart {
  height: 400px;
  width: 100%;
}
</style>