import { HTTP_CONFIG } from './config';
import { HttpMethod, RequestConfig, ResponseData, HttpError } from './types';
import { requestInterceptors, responseInterceptors, errorInterceptors } from './interceptors';

// 创建请求URL
const createUrl = (url: string, params?: Record<string, any>) => {
  const baseUrl = HTTP_CONFIG.BASE_URL;
  const queryString = params
    ? '?' + Object.entries(params)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&')
    : '';
  return `${baseUrl}${url}${queryString}`;
};

// 超时处理
const timeoutPromise = (timeout: number): Promise<never> => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      const error = new Error(HTTP_CONFIG.ERROR_MESSAGES.TIMEOUT_ERROR) as HttpError;
      error.name = 'TimeoutError';
      reject(error);
    }, timeout);
  });
};

// 执行请求
const executeRequest = async <T>(
  method: HttpMethod,
  url: string,
  config: RequestConfig = {}
): Promise<T> => {
  const {
    params,
    data,
    timeout = HTTP_CONFIG.TIMEOUT,
    headers = {},
    ...restConfig
  } = config;

  // 应用请求拦截器
  let finalConfig = { ...config };
  for (const interceptor of requestInterceptors) {
    finalConfig = interceptor(finalConfig);
  }

  try {
    const response = await Promise.race([
      fetch(createUrl(url, params), {
        method,
        headers: {
          ...HTTP_CONFIG.HEADERS,
          ...headers,
          ...finalConfig.headers,
        },
        body: data ? JSON.stringify(data) : undefined,
        ...restConfig,
      }),
      timeoutPromise(timeout),
    ]) as Response;

    if (!response.ok) {
      throw new Error(HTTP_CONFIG.ERROR_MESSAGES.SERVER_ERROR);
    }

    const responseData = await response.json() as ResponseData<T>;

    // 应用响应拦截器
    let finalResponse = responseData;
    for (const interceptor of responseInterceptors) {
      finalResponse = interceptor(finalResponse);
    }

    return finalResponse as T;
  } catch (error) {
    // 应用错误拦截器
    let finalError = error as HttpError;
    for (const interceptor of errorInterceptors) {
      finalError = interceptor(finalError);
    }
    throw finalError;
  }
};

// HTTP 请求类
export class Http {
  static get<T = any>(url: string, config?: RequestConfig) {
    return executeRequest<T>('GET', url, config);
  }

  static post<T = any>(url: string, data?: any, config?: RequestConfig) {
    return executeRequest<T>('POST', url, { ...config, data });
  }

  static put<T = any>(url: string, data?: any, config?: RequestConfig) {
    return executeRequest<T>('PUT', url, { ...config, data });
  }

  static delete<T = any>(url: string, config?: RequestConfig) {
    return executeRequest<T>('DELETE', url, config);
  }

  static patch<T = any>(url: string, data?: any, config?: RequestConfig) {
    return executeRequest<T>('PATCH', url, { ...config, data });
  }
} 