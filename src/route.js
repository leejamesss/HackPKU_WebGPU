import HelloWorld from '@/components/HelloWorld.vue'
import About from '@/components/About.vue'
import Upload from '@/components/Upload.vue' // 引入上传组件
//引入vue-router
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


const routes = [
    {
        path: '/',
        name: 'HelloWorld',
        component: HelloWorld
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '/upload', // 添加上传文件的路由
        name: 'Upload',
        component: Upload
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router

