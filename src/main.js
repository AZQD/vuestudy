import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import xss from 'xss'
import mitt from 'mitt'

import ElementPlus from 'element-plus'
import { ElMessage } from 'element-plus'
import 'element-plus/dist/index.css'
import '@/styles/element-overrides.scss'

import VueMarkdownEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import VMdPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/preview.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
import Prism from 'prismjs'

import directive from './directive'

VueMarkdownEditor.use(vuepressTheme, { Prism })
VMdPreview.use(vuepressTheme, { Prism })

const app = createApp(App)

app.config.globalProperties.$xss = xss
app.config.globalProperties.$bus = mitt()
app.config.globalProperties.$message = ElMessage

app.use(ElementPlus)
app.use(router)
app.use(directive)
app.use(VueMarkdownEditor)
app.use(VMdPreview)

app.mount('#app')
