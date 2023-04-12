/*
 * @Descripttion: 
 * @Author: likeorange
 * @Date: 2023-04-11 16:44:16
 * @LastEditors: likeorange
 * @LastEditTime: 2023-04-12 20:59:35
 */
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: "127.0.0.1", //打开显示本地地址
    open: false,// 是否自动启动浏览器
    port: 5173,//端口号
    proxy: { // 本地开发环境通过代理实现跨域
      // 正则表达式写法
      '/api': {
        secure: false,  
        target: 'http://127.0.0.1:7001', // 后端服务实际地址
        changeOrigin: true, //开启代理
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
