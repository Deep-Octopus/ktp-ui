
import VueRouter from 'vue-router';


const router = new VueRouter({
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            name: 'home',
            meta: {
                requiresAuth: false
            },
            component: () => import("../pages/Home")
        },
        {
            path: '/login',
            name: 'login',
            meta: {
                requiresAuth: false
            },
            component: () => import("../pages/Login")
        },
        {
            path: '/register',
            name: 'register',
            meta: {
                requiresAuth: false
            },
            component: () => import("@/pages/Register")
        },
        {
            path: '/main',
            name: 'main',
            meta: {
                requiresAuth: true
            },
            component: () => import("@/pages/MainPage")
        },
        {
            // path: '/classDetail/:lesson',
            path: '/classDetail',
            name: 'classDetail',
            meta: {
                requiresAuth: true
            },
            component: () => import("@/pages/ClassDetail")
        },
        {
            path: '/forgot',
            name: 'forgot',
            meta: {
                requiresAuth: true
            },
            component: () => import("@/pages/Forgot")
        },
        {
            path:'/homework',
            name:'homework',
            meta: {
                requiresAuth: true
            },
            component:() => import("@/pages/Homework")
        }

    ]
})

//路由守卫
router.beforeEach((to, from, next) => {
    //放行login
    // if (to.path === '/login') return next()
    if(['/login','/register','/home'].includes(to.path)) return next()
    //没有token，全部劫持
    if(!localStorage.getItem("token")) return next('/login')
    //否则放行
    next()
})


export default router;