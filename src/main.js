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

const app = createApp(App)

app.use(router)
app.use(ElementPlus,{locale})

app.mount('#app')
