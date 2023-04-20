/*
 * @Descripttion: used for network request processing
 * @Author: likeorange
 * @Date: 2023-03-29 11:48:45
 * @LastEditors: likeorange
 * @LastEditTime: 2023-04-06 14:21:48
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