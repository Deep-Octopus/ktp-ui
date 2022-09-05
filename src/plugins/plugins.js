/**
 * 利用vue插件机制来增加vue和vue component的功能
 */
import {doGet,formPost,jsonPost} from '@/utils/api';

export default {
    install(Vue){
        //通过this.$doGet用
        Vue.prototype.$doGet = doGet;
        Vue.prototype.$formPost = formPost;
        Vue.prototype.$jsonPost = jsonPost;
    }
}