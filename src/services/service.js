import axios from 'axios'

// 创建axios实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, // 请求的默认前缀 只要是发出去请求就会 默认带上这个前缀
  timeout: 10000, // 请求超时时间：10s
  headers: { 'Content-Type': 'application/json;charset=utf-8' }, // 设置默认请求头
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在请求里加入token认证信息
    // const token = getToken()//localStorage.getItem('token')获取的
    // if (token) {
    //     config.headers.Authorization = `Bearer ${token}`
    // }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 响应拦截器即异常处理
service.interceptors.response.use(
  (response) => {
    return response.data
  },
  (err) => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '错误请求'
          //   ElMessage({
          //     message: msg || '系统出错',
          //     type: 'error',
          //     duration: 5 * 1000,
          //   });
          break
        case 401:
          err.message = '未授权，请重新登录'
          // router.push('/login')
          // return Promise.reject(error)
          break
        case 403:
          err.message = '拒绝访问'
          break
        case 404:
          err.message = '请求错误,未找到该资源'
          break
        case 405:
          err.message = '请求方法未允许'
          break
        case 408:
          err.message = '请求超时'
          break
        case 500:
          err.message = '服务器端出错'
          break
        case 501:
          err.message = '网络未实现'
          break
        case 502:
          err.message = '网络错误'
          break
        case 503:
          err.message = '服务不可用'
          break
        case 504:
          err.message = '网络超时'
          break
        case 505:
          err.message = 'http版本不支持该请求'
          break
        default:
          err.message = `连接错误${err.response.status}`
      }
    }
    else {
      err.message = '连接到服务器失败'
    }
    console.error(err.message)
    return Promise.resolve(err.response)
  },
)

// 导出实例
export default service
