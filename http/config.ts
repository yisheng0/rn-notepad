// HTTP 请求配置
export const HTTP_CONFIG = {
  // 基础URL
  BASE_URL: 'http://localhost:3000/api', // 开发环境
  // BASE_URL: 'https://api.example.com', // 生产环境

  // 请求超时时间（毫秒）
  TIMEOUT: 10000,

  // 请求头
  HEADERS: {
    'Content-Type': 'application/json',
  },

  // 错误提示
  ERROR_MESSAGES: {
    NETWORK_ERROR: '网络连接失败，请检查网络设置',
    TIMEOUT_ERROR: '请求超时，请稍后重试',
    SERVER_ERROR: '服务器错误，请稍后重试',
    UNAUTHORIZED: '未授权，请重新登录',
  },
}; 