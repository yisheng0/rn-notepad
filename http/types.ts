// 请求方法类型
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

// 请求配置接口
export interface RequestConfig extends RequestInit {
  params?: Record<string, any>;
  data?: any;
  timeout?: number;
  headers?: Record<string, string>;
}

// 响应数据接口
export interface ResponseData<T = any> {
  code: number;
  data: T;
  message: string;
}

// 错误接口
export interface HttpError extends Error {
  code?: number;
  status?: number;
  data?: any;
} 