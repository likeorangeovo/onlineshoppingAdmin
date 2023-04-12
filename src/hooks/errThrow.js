/*
 * @Descripttion: a hook to deal with throwing error
 * @Author: likeorange
 * @Date: 2023-03-29 19:43:17
 * @LastEditors: likeorange
 * @LastEditTime: 2023-04-12 20:44:04
 */

import { ElMessage } from 'element-plus'

export default function (params) {
  try {
    if (params.code == 0) {
      throw params.msg;
    }
    return function(){
      ElMessage({
        message: params.msg,
        type: 'success',
      })
    }
  } catch (error) {
    return ElMessage.error(params.msg)
  }
}