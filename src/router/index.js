import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

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
    components: {
      default: () => import('../views/Demo01.vue'),
      demo01AddComp: () => import('../views/Demo01.vue')
    },
  },

  // 学习重点：获取参数；this.$router多种跳转方式；
  {
    path: '/demo02/:type',
    name: 'Demo02',
    meta: {
      keepAlive: true
    },
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
  // 学习重点：百度智能云 智能文档分析平台 - 合同审查
  {
    path: '/contractReview',
    name: 'ContractReview',
    component: () => import('../views/contractReview.vue')
  },
  // 学习重点：多种文件(docx、excel、pdf)预览
  {
    path: '/vueOfficeDocx',
    name: 'VueOfficeDocx',
    component: () => import('../views/VueOfficeDocx.vue')
  },
  {
    path: '/vueOfficeExcel',
    name: 'VueOfficeExcel',
    component: () => import('../views/VueOfficeExcel.vue')
  },
  // 学习重点：Vue项目中使用mammoth库来转换Word文档(.docx)为HTML
  {
    path: '/vueMammoth',
    name: 'VueMammoth',
    component: () => import('../views/VueMammoth.vue')
  },
  // 学习重点：Vue项目中生成二维码
  {
    path: '/vueQr',
    name: 'VueQr',
    component: () => import('../views/VueQr.vue')
  },

  // 学习重点：Vue3中使用v-md-editor渲染markdown表格（支持编辑、首列固定）
  {
    path: '/vueMdEditor',
    name: 'VueMdEditor',
    component: () => import('../views/VueMdEditor.vue')
  },

  // 学习重点：iframe父子页面通信
  {
    path: '/iframeComm',
    name: 'IframeComm',
    component: () => import('../views/IframeComm.vue')
  },
  {
    path: '/iframeCommChild',
    name: 'IframeCommChild',
    component: () => import('../views/IframeCommChild.vue')
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

  // 学习重点：table相关
  {
    path: '/tableTest',
    name: 'TableTest',
    component: () => import('../views/elementUI/TableTest.vue')
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
  // 学习重点：vue中自定义组件对元素任意拖拽缩放
  {
    path: '/vueDragDefine',
    name: 'VueDragDefine',
    component: () => import('../views/VueDragDefine.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
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
