/*
 * @Descripttion: 
 * @Author: likeorange
 * @Date: 2023-04-11 16:44:16
 * @LastEditors: likeorange
 * @LastEditTime: 2023-04-12 20:22:41
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';
import locale from 'element-plus/lib/locale/lang/zh-cn'

import ECharts from 'vue-echarts'
import "echarts";   

const app = createApp(App)

app.component('ECharts',ECharts)  
app.use(ElementPlus,{locale})
app.use(router)
app.mount('#app')
