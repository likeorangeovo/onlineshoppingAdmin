/*
 * @Descripttion: packaging for axios
 * @Author: likeorange
 * @Date: 2023-03-29 11:42:55
 * @LastEditors: likeorange
 * @LastEditTime: 2023-04-12 20:42:04
 */

import axios from 'axios'
import { ElMessage } from 'element-plus'

const axiosUser = axios.create({
	baseURL: '/api',
	timeout: 30000,
	withCredentials: true
})

// 响应拦截器
axiosUser.interceptors.response.use(
	// 请求成功
	(res) => {
		if (res.status === 200) {
			if (res.data.code != '0' && res.data.msg) {
				ElMessage({
					message: res.data.msg,
					type: 'success',
				})
			}
			else if (res.data.code == '0' && res.data.msg) {
				ElMessage({
					message: res.data.msg,
					type: 'warning',
				})
			}
			return Promise.resolve(res)
		} else {
			return Promise.reject(res)
		}
	},
	// 请求失败
	(error) => {
		const { response } = error;
		if (response) {
			errorHandle(response.status, response.data.msg);
			return Promise.reject(response);
		} else {
			ElMessage.error('网络异常')
			// 处理断网的情况
		}
	}
)

// 请求失败后的错误统一处理
const errorHandle = (status, other) => {
	switch (status) {
		case 403:
			ElMessage.error('登录过期，请重新登录');
			setTimeout(() => {
				// toLogin();
			}, 1000);
			break;
		case 404:
			ElMessage.error('网络请求不存在');
			break;
		case 500:
			ElMessage.error('服务器端错误');
			break;
		default:
			ElMessage.error(other);
	}
}


export default axiosUser