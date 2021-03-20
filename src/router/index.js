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


  // 学习重点：router-link、router-view、获取参数
  {
    path: '/demo01',
    name: 'Demo01',
    // components：可匹配多路由，router-view组件根据name属性渲染对应组件
    components: {
      default: () => import('../views/Demo01.vue'),
      demo01AddComp: () => import('../views/Demo01.vue')
    },
  },


  // 学习重点：获取参数
  {
    path: '/demo02/:type', // type为动态参数
    name: 'Demo02',
    component: () => import('../views/Demo02.vue')
  },


  // 学习重点：有子路由children的场景
  {
    path: '/demo03',
    name: 'Demo03',
    component: () => import('../views/Demo03.vue'),
    children: [
      {
        path: '/demo03/demo031',
        name: 'Demo031',
        component: () => import('../views/Demo031.vue'),
      },
      {
        path: '/demo03/demo032',
        name: 'Demo032',
        component: () => import('../views/Demo032.vue'),
      }
    ]
  },
]

const router = new VueRouter({
  // mode: 'hash',//hash模式下，浏览器地址不规整,带有#
  mode: 'history',//history模式下，浏览器地址规整，但需要后台支持
  routes
})

export default router
