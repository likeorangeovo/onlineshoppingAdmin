<template lang="">
  <div>
    <e-charts class="chart" :option="option" />
    <e-charts class="chart" :option="userOption" />
    <e-charts class="chart" :option="goodOption" />
  </div>
</template>
<script>
import { ref, computed, onBeforeMount } from 'vue'
import { getOrder, getUserInfo, getGoods } from '../request/index.js'
export default {
  setup() {
    let dates = ref([])
    let sales = ref([])
    let option = ref({})
    let userOption = ref({})
    let userInfoDatas = ref([])
    let goodOption = ref({})
    let goodDatas = ref([])
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
      }

      //商品销量统计图
      const goodRes = await getGoods()
      const goods = [...goodRes.data.data]
      goods.forEach(good => {
        const name = good.name
        const sell = good.sell_volume
        goodDatas.value.push({ name, sell });
      })
      goodOption.value = {
        title: {
          text: '商品销售量统计图'
        },
        tooltip: {},
        legend: {
          data: ['商品销售量']
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: goodDatas.value.map(item => item.name)
        },
        yAxis: {
          type: 'value'
        },
        dataZoom: [
        {
          show: true,
          start: 94,
          end: 100
        },
        {
          type: 'inside',
          start: 94,
          end: 100
        },
        {
          show: true,
          yAxisIndex: 0,
          filterMode: 'empty',
          width: 30,
          height: '80%',
          showDataShadow: false,
          left: '93%'
        }
      ],
        series: [{
          name: '商品销售量',
          type: 'bar',
          data: goodDatas.value.map(item => item.sell)
        }]
      }

    })

    return {
      dates,
      sales,
      option,
      userOption,
      userInfoDatas,
      goodOption,
      goodDatas
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