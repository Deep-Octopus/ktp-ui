import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";

// import {Button,ButtonGroup,Image} from "element-ui";
//   全部引入
import ElementUI from 'element-ui';
import Vuex from 'vuex';
import 'element-ui/lib/theme-chalk/index.css';
import '../public/iconfont.css'
import router from "@/router/router";
import store from './store'
import './directives/directive.js'
import plugins from "@/plugins/plugins";
import cookies from 'vue-cookies'
import {getGroups, getSessionStorage} from "@/store/auth";
import request from "@/utils/request";

Vue.use(request)
Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(plugins)
Vue.use(Vuex)

Vue.prototype.$cookies=cookies;
//关闭生产警告
Vue.config.productionTip = false
//关闭警告
Vue.config.silent = true
// Vue.component(Button.name,Button);
// Vue.component(Image.name,Image);
// Vue.component(ButtonGroup.name,ButtonGroup);

new Vue({
    render: h => h(App),
    router:router,
    beforeCreate() {
        Vue.prototype.$bus = this //安装全局事件总线，$bus就是当前应用的vm
    },
    store,
    created() {
        this.$store.state.user.userInfo = getSessionStorage("userInfo")||{}
        this.$store.state.user.isTeacher = getSessionStorage("isTeacher")||false
        this.$store.state.user.teachLesson = getGroups("teachLesson")||[]
        this.$store.state.user.studyLesson = getGroups("studyLesson")||[]
        this.$store.state.user.isLogin = getSessionStorage("isLogin")||false
    }
}).$mount('#app')

