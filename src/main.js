import Vue from 'vue'
import App from './App.vue'
import router from './router'
import xss from 'xss'
import formCreate from '@form-create/element-ui'
import FcDesigner from '@form-create/designer'
// Vue.prototype.$xss = xss
Object.defineProperty(Vue.prototype, '$xss', {
  value: xss
})

import ElementUI from 'element-ui' //element-ui的全部组件
import 'element-ui/lib/theme-chalk/index.css'//element-ui的css
import '@/styles/element-overrides.scss' // ElementUI 全局样式覆写
Vue.use(ElementUI) //使用elementUI

import VueBus from 'vue-bus';
Vue.use(VueBus);





Vue.config.productionTip = false // 阻止显示生产模式的消息。

Vue.use(formCreate)
Vue.use(FcDesigner)

import directive from './directive' // 使用自定义指令
Vue.use(directive)

import SuperFlow from 'vue-super-flow'
import 'vue-super-flow/lib/index.css'

Vue.use(SuperFlow)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
