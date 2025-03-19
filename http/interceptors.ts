import { RequestConfig, ResponseData, HttpError } from './types';

// 请求拦截器
export const requestInterceptors = [
  (config: RequestConfig) => {
    // 添加token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
];

// 响应拦截器
export const responseInterceptors = [
  (response: ResponseData) => {
    // 处理响应数据
    if (response.code === 200) {
      return response.data;
    }
    throw new Error(response.message);
  },
];

// 错误拦截器
export const errorInterceptors = [
  (error: HttpError): HttpError => {
    // 处理错误
    if (error.status === 401) {
      // 未授权，跳转到登录页
      // router.replace('/login');
    }
    return error;
  },
]; 