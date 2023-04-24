/*
 * @Descripttion: used for network request processing
 * @Author: likeorange
 * @Date: 2023-03-29 11:48:45
 * @LastEditors: likeorange
 * @LastEditTime: 2023-04-24 16:47:21
 */
import axiosUser from "./request";

export const login =  (params) => axiosUser({
  url:'/login',
  data:params,
  method:'post',
  headers:{
    'content-type':'application/json'
  }
})

export const getUserInfo =  (params) => axiosUser({
  url:'/adminusers',
  query:params,
  method:'get',
  headers:{
    'content-type':'application/json'
  }
})

export const getGoods =  (params) => axiosUser({
  url:'/admingoods',
  query:params,
  method:'get',
  headers:{
    'content-type':'application/json'
  }
})

export const uploadAvatar =  (params) => axiosUser({
  url:'/upload/avatar',
  data:params,
  method:'post',
  headers:{
    'content-type':'application/json'
  }
})

export const downloadAvatar =  (params) => axiosUser({
  url:'/download/avatar',
  params:params,
  method:'get',
  responseType: 'blob',
})

export const category =  () => axiosUser({
  url:'/category',
  method:'get',
  headers:{
    'content-type':'application/json'
  }
}) 