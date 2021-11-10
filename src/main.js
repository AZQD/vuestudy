import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import xss from 'xss'
// Vue.prototype.$xss = xss
Object.defineProperty(Vue.prototype, '$xss', {
  value: xss
})

import ElementUI from 'element-ui' //element-ui的全部组件
import 'element-ui/lib/theme-chalk/index.css'//element-ui的css
Vue.use(ElementUI) //使用elementUI

import VueBus from 'vue-bus';
Vue.use(VueBus);

Vue.config.productionTip = false // 阻止显示生产模式的消息。

new Vue({
  router,
  store, // 将共享数据挂载到Vue实例中
  render: h => h(App)
}).$mount('#app')
