import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false // 阻止显示生产模式的消息。

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
