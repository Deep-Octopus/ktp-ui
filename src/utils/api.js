import request from '@/utils/request'
export function doPost(url,data,query) {
    return request({
        url: url,  // 接口地址
        method: 'POST', // 请求方式
        data: data, // 需要发送的数据
        params: query // url地址拼接的数据
    })
}
export function doGet(url,data,query) {
    return request({
        url: url,  // 接口地址
        method: 'GET', // 请求方式
        data: data, // 需要发送的数据
        params: query // url地址拼接的数据
    })
}