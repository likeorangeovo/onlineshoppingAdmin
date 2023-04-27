<template lang="">
  <div>
    <e-charts class="chart" :option="option" />
  </div>
</template>
<script>
import { ref, computed, onBeforeMount } from 'vue'
import { getOrder } from '../request/index.js'
export default {
  setup() {
    let dates = ref([])
    let sales = ref([])
    let option = ref({})
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
      console.log(sortedSales)
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
    })

    return {
      dates,
      sales,
      option
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