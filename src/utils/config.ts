import { AxiosResponse, AxiosRequestConfig } from 'axios'
import api from '@/assets/api'
const axiosConfig: AxiosRequestConfig = {
    baseURL: api,
    // 超时设置s
    timeout: 5000
}
export default axiosConfig