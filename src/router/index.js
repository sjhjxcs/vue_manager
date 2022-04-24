import Vue from 'vue'
import VueRouter from 'vue-router'


// VueRouter全局引入
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    // 这种引入方式是全局引入，一开始在最前面就已经import了
    component: ()=>import("../views/Main.vue"),
    redirect:'/home',
    // children:[
    //   {
    //     path: '/home',
    //     name: 'home',
    //     // 这种方式：按需引入，
    //     component: () => import('../views/home/Index.vue')
    //   },
    //   {
    //     path:'/user',
    //     name:'user',
    //     component:()=>import("../views/user/Index.vue")
    //   },
    //   {
    //     path:'/mall',
    //     name:'mall',
    //     component:()=>import("../views/mall/mall.vue")
    //   },
    //   {
    //     path:'/page1',
    //     name:'page1',
    //     component:()=>import("../views/page1/page1.vue")
    //   },
    //   {
    //     path:'/page2',
    //     name:'page2',
    //     component:()=>import("../views/page2/page2.vue")
    //   }
    // ],
  },
  {
    path:'/login',
    name:'login',
    component:()=>import("../views/Login/login.vue")
  }

]

const router = new VueRouter({
  routes
})

export default router
