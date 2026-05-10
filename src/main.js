import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import xss from 'xss'
import mitt from 'mitt'

import ElementPlus from 'element-plus'
import { ElMessage } from 'element-plus'
import 'element-plus/dist/index.css'
import '@/styles/element-overrides.scss'

import directive from './directive'

const app = createApp(App)

app.config.globalProperties.$xss = xss
app.config.globalProperties.$bus = mitt()
app.config.globalProperties.$message = ElMessage

app.use(ElementPlus)
app.use(router)
app.use(directive)

app.mount('#app')
