import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

// 报错：NavigationDuplicated: Avoided redundant navigation to current location: “/“
// 原因：路由重复导致
//解决方案：
// 获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: (to, from, next) => {
      console.log('路由独享的守卫');
      console.log('to', to);
      console.log('from', from);
      console.log('next', next);
      next();
    }
  },

  // 学习重点：router-link、router-view、获取参数
  {
    path: '/demo01',
    name: 'Demo01',
    // components：可匹配多路由，router-view组件根据name属性渲染对应组件
    components: {
      default: () => import('../views/Demo01.vue'), // 路由懒加载：动态import
      demo01AddComp: () => import('../views/Demo01.vue')
    },
  },


  // 学习重点：获取参数；this.$router多种跳转方式；
  {
    path: '/demo02/:type', // type为动态参数
    name: 'Demo02',
    meta: {
      keepAlive: true
    },
    component: () => import('../views/Demo02.vue')
  },


  // 学习重点：有子路由children的场景
  // 参考：https://zhuanlan.zhihu.com/p/95074683
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
        path: '/demo03/demo032/:id',
        name: 'Demo032',
        component: () => import('../views/Demo032.vue'),
      }
    ]
  },

  // 学习重点：vue组件生命周期、触发事件、动态更新class样式
  {
    path: '/demo04',
    name: 'Demo04',
    component: () => import('../views/Demo04.vue')
  },

  // 学习重点：插槽
  {
    path: '/demo05',
    name: 'Demo05',
    component: () => import('../views/Demo05.vue')
  },

  // 学习重点：组件自调用
  {
    path: '/compSelf',
    name: 'CompSelf',
    component: () => import('../views/CompSelf.vue')
  },

  // 学习重点：组件自调用2
  {
    path: '/compSelf2',
    name: 'CompSelf2',
    component: () => import('../views/CompSelf2.vue')
  },

  // 学习重点：函数式组件
  {
    path: '/functional',
    name: 'Functional',
    component: () => import('../views/Functional.vue')
  },

  // 学习重点：函数式组件
  {
    path: '/xss',
    name: 'Xss',
    component: () => import('../views/Xss.vue')
  },

  // 学习重点：级联选择器
  {
    path: '/cascader',
    name: 'Cascader',
    component: () => import('../views/elementUI/Cascader.vue')
  },

  // 学习重点：Dialog组件抽离
  {
    path: '/dialogParent',
    name: 'DialogParent',
    component: () => import('../views/elementUI/dialog/DialogParent.vue')
  },

  // 学习重点：Dialog高度自适应
  {
    path: '/dialogHeight',
    name: 'DialogHeight',
    component: () => import('../views/elementUI/dialog/DialogHeight.vue')
  },

  // 学习重点：Textarea高度自适应
  {
    path: '/textareaHeight',
    name: 'TextareaHeight',
    component: () => import('../views/elementUI/TextareaHeight.vue')
  },

  // 学习重点：el-select数据过多，分页加载的解决方案
  {
    path: '/selectLoadMore',
    name: 'SelectLoadMore',
    component: () => import('../views/elementUI/SelectLoadMore.vue')
  },

  // 学习重点：el-uplad分片上传
  {
    path: '/uploadByPieces/demo1',
    name: 'UploadByPiecesDemo1',
    component: () => import('../views/UploadByPieces/demo1/index.vue')
  },
  {
    path: '/uploadByPieces/demo2',
    name: 'UploadByPiecesDemo2',
    component: () => import('../views/UploadByPieces/demo2/index.vue')
  },

  // 学习重点：vue-prism-editor代码块显示
  {
    path: '/vuePrismEditor',
    name: 'VuePrismEditor',
    component: () => import('../views/VuePrismEditor.vue')
  },

  // 学习重点：vue中使用mergely.js进行字符串对比
  {
    path: '/mergely',
    name: 'Mergely',
    component: () => import('../views/Mergely.vue')
  },
  // 学习重点：vue中使用vue-super-flow显示流程图
  {
    path: '/vueSuperFlow',
    name: 'VueSuperFlow',
    component: () => import('../views/VueSuperFlow.vue')
  },

  // 学习重点：vue中使用@antv/x6显示流程图_BPMN
  {
    path: '/antvX6Bpmn',
    name: 'AntvX6Bpmn',
    component: () => import('../views/AntvX6Bpmn.vue')
  },
  // 学习重点：vue中使用@antv/x6显示流程图_设计
  {
    path: '/antvX6FlowDesign',
    name: 'AntvX6FlowDesign',
    component: () => import('../views/AntvX6FlowDesign.vue')
  },

  // 学习重点：WangEditor富文本编辑器
  {
    path: '/wangEditor',
    name: 'WangEditor',
    component: () => import('../views/WangEditor.vue')
  },

  // 学习重点：dialog中的WangEditor富文本
  {
    path: '/wangEditor2',
    name: 'WangEditor2',
    component: () => import('../views/WangEditor2.vue')
  },

  // 学习重点：vue中使用vue-drag-resize对元素任意拖拽缩放
  {
    path: '/vueDragResize',
    name: 'VueDragResize',
    component: () => import('../views/VueDragResize.vue')
  },
]

const router = new VueRouter({
  // mode: 'hash',//hash模式下，浏览器地址不规整,带有#
  mode: 'history',//history模式下，浏览器地址规整，但需要后台支持
  routes
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  console.log('全局前置守卫');
  console.log('to', to);
  console.log('from', from);
  console.log('next', next);
  next();
});

// 全局后置钩子
router.afterEach((to, from) => {
  console.log('全局后置钩子');
  console.log('to', to);
  console.log('from', from);
});

export default router
