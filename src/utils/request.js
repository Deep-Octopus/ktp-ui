import axios from "axios";
import {getToken} from "@/store/auth";
import router from "@/router/router";


//全局配置
// 创建axios实例
const service = axios.create({
    // api的base_url
    baseURL: 'http://localhost:8083',
    // 请求头部
    headers: {'Content-Type': 'application/json'},
    // 请求超时时间
    timeout: 15000
})

// 请求拦截器
service.interceptors.request.use(config => {
    let token = getToken();
    console.log("进来了",getToken())
    if (token) {
        config.headers.token = token;
    }
    console.log("config",config)
    return config
}, error => {
    console.error("请求拦截错误",error) // for debug
    // Promise.reject(error)
})
// 响应拦截器
service.interceptors.response.use(
    response => {
        console.log("response",response)
        if (response.data.status==400){
            router.replace({
                path: '/login',
                query: {redirect: router.currentRoute.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
        return response;
    },
    error => {
        console.log("返回错误",error)
    }
)



export default service


