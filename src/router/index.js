import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/demo01',
    name: 'Demo01',
    // components：可匹配多路由，router-view组件根据name属性渲染对应组件
    components: {
      default: () => import('../views/Demo01.vue'),
      demo01AddComp: () => import('../views/Demo01.vue')
    },
  },
  {
    path: '/demo02/:type', // type为动态参数
    name: 'Demo02',
    component: () => import('../views/Demo02.vue')
  },
]

const router = new VueRouter({
  // mode: 'hash',//hash模式下，浏览器地址不规整,带有#
  mode: 'history',//history模式下，浏览器地址规整，但需要后台支持
  routes
})

export default router
