import axios from 'axios'

// create an axios instance
const service = axios.create()

// request interceptor
service.interceptors.request.use()

// response interceptor
service.interceptors.response.use()

export default service
