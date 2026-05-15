# vuestudy Vue 2 → Vue 3 迁移总结文档

> 迁移日期：2026-05-10
> 修改人：Claude
> 分支：develop_claude

---

## 一、迁移概述

本项目原基于 **Vue CLI 4.5 + Vue 2.7.16 + Element UI 2.x**，现完整迁移至 **Vite 5 + Vue 3.4 + Element Plus 2.x**。迁移过程中保持了原有 Options API 的代码风格，所有 25+ 个路由页面的核心功能均得到保留。

### 决策理由

| 维度 | Vue 2 (原) | Vue 3 (新) | 理由 |
|------|-----------|-----------|------|
| 构建工具 | Vue CLI 4.5 | Vite 5 | Vue CLI 已进入维护模式，Vite 是 Vue 3 官方推荐构建工具 |
| 框架版本 | Vue 2.7.16 | Vue 3.4 | Vue 2 已于 2023-12-31 EOL，Vue 3 有更好的性能和 TS 支持 |
| UI 库 | Element UI 2.x | Element Plus 2.x | Element UI 仅支持 Vue 2，Element Plus 是官方 Vue 3 版本 |
| 路由 | Vue Router 3 | Vue Router 4 | 与 Vue 3 配套 |
| 事件总线 | vue-bus | mitt | Vue 3 移除了 `$on`/`$off`/`$once`，mitt 是最轻量的替代方案 |

---

## 二、配置文件变更

### 2.1 新增文件

| 文件 | 说明 |
|------|------|
| `vite.config.js` | Vite 构建配置；配置 `@` alias 指向 `src/`；配置 `css.preprocessorOptions.scss.api = 'modern-compiler'` 消除 Sass legacy JS API 弃用警告 |
| `index.html` (根目录) | Vite 入口 HTML，替换原 `public/index.html` |

### 2.2 重写文件

| 文件 | 核心变更 |
|------|---------|
| `package.json` | 移除 Vue CLI 全家桶，新增 `vite`、`vue@^3.4`、`vue-router@^4`、`element-plus`、`mitt`、`@element-plus/icons-vue` |

### 2.3 删除文件

| 文件 | 说明 |
|------|------|
| `babel.config.js` | Vite 原生支持 ES Modules，无需 Babel 配置 |
| `package-lock.json` | 重新生成 |
| `public/index.html` | 移至根目录并移除 webpack 模板语法 |

---

## 三、核心代码变更清单

### 3.1 入口与全局配置

| 文件 | 变更点 |
|------|--------|
| `src/main.js` | `new Vue()` → `createApp()`；`Vue.use()` → `app.use()`；`Vue.prototype` → `app.config.globalProperties`；移除 `vue-bus`，改用 `mitt`；移除 `vue-super-flow`、`@form-create/element-ui`、`@form-create/designer`（无 Vue 3 版本） |
| `src/router/index.js` | `new VueRouter({ mode: 'history' })` → `createRouter({ history: createWebHistory() })`；全局守卫写法保持不变 |
| `src/directive.js` | 指令钩子重命名：`bind` → `beforeMount`；注册方式改为 `app.directive()` |

### 3.2 App.vue（布局外壳）

| 变更点 | 说明 |
|--------|------|
| `slot="title"` → `#title` | Element Plus 菜单插槽语法迁移 |
| `el-icon-*` 类名 → `<el-icon>` 组件 | Element Plus 使用 SVG 图标组件，引入 `@element-plus/icons-vue` |
| `el-submenu` → `el-sub-menu` | Element Plus 组件名变更 |
| `keep-alive` → `KeepAlive` | Vue 3 推荐 PascalCase（小写仍兼容） |
| `$router.onReady` → `mounted()` | Vue Router 4 移除 `onReady`，App 根组件 `mounted` 中直接操作 `$refs.menu.openedMenus` |
| `.el-submenu__title` → `.el-sub-menu__title` | Element Plus CSS 类名变更 |

### 3.3 生命周期重命名

以下文件中 `beforeDestroy` → `beforeUnmount`，`destroyed` → `unmounted`：

- `src/views/Demo04.vue`
- `src/views/CompSelf2.vue`
- `src/views/VueDragDefineComp.vue`

### 3.4 插槽语法迁移

| 文件 | 变更 |
|------|------|
| `src/views/Demo05.vue` | `slot="test1"` → `#test1`；修复默认插槽与具名插槽冲突（Vue 3 编译器严格模式） |
| `src/views/Demo051.vue` | 修复 `v-model` 绑定 prop 的错误（Vue 3 禁止直接修改 prop），新增 `localParentMsg` 本地状态 |
| `src/views/elementUI/TableTest.vue` | `slot-scope="scope"` → `#default="scope"` |
| `src/views/VueSuperFlow.vue` | `slot="node" slot-scope="{ meta }"` → `#node="{ meta }"` |
| `src/views/VueDragDefine.vue` | `slot="test1"` → `#test1` |

### 3.5 .sync 修饰符迁移

Vue 3 移除 `.sync`，改为 `v-model:propName` 或 `:model-value` + `@update:model-value`：

| 文件 | 变更 |
|------|------|
| `src/views/elementUI/dialog/DialogParent.vue` | `:open.sync` → `v-model:open` |
| `src/views/elementUI/dialog/DialogChild.vue` | `:visible.sync` → `:model-value` + `@update:model-value`（因 `open` 是 prop，不能直接 `v-model`） |
| `src/views/elementUI/dialog/DialogHeight.vue` | `:visible.sync` → `v-model` |
| `src/views/WangEditor2.vue` | `:visible.sync` → `v-model` |

### 3.6 函数式组件重写

| 文件 | 变更 |
|------|------|
| `src/views/FunctionalList.vue` | 移除 `<template functional>`（Vue 3 已废弃），重写为普通 SFC；`size="mini"` → `size="small"`（Element Plus 移除 mini） |

### 3.7 事件总线迁移

| 文件 | 变更 |
|------|------|
| `src/views/CompSelf2.vue` | `this.$bus.$on()` → `this.$bus.on()`；`this.$bus.$off()` → `this.$bus.off()` |
| `src/views/CompSelf2Child.vue` | `this.$bus.$emit()` → `this.$bus.emit()` |

### 3.8 Element Plus 内部 API 变更

| 文件 | 变更 |
|------|------|
| `src/views/elementUI/Cascader.vue` | `dropDownVisible` → `popperVisible`（Element Plus 的内部属性名变更） |

### 3.9 Vite 路径解析差异

Vue CLI 会自动补全 `.vue` 扩展名，Vite 不会。以下文件补充了 `.vue` 扩展名：

- `src/views/Functional.vue`
- `src/views/CompSelf2.vue`
- `src/views/UploadByPieces/demo2/index.vue`
- `src/views/elementUI/dialog/DialogParent.vue`

---

## 四、第三方库兼容性处理

### 4.1 已替换的库

| 原库（Vue 2） | 新库（Vue 3） | 影响文件 | 状态 |
|--------------|--------------|---------|------|
| `element-ui` | `element-plus` | 全项目 | 已替换 |
| `vue-router@3` | `vue-router@4` | `router/index.js` | 已替换 |
| `vue-bus` | `mitt` | `main.js`, `CompSelf2.vue`, `CompSelf2Child.vue` | 已替换 |
| `vue-drag-resize` | `vue3-draggable-resizable` | `VueDragResize.vue` | 已替换 |
| `vue-prism-editor` | 直接使用 `prismjs` | `VuePrismEditor.vue` | 已替换 |
| `vue-qr` | `qrcode` | `VueQr.vue` | 已替换 |

### 4.2 保持原样的库

以下库不依赖 Vue 版本，可直接沿用：

- `@antv/x6` 及全部插件
- `@vue-office/docx` / `excel` / `pdf`（通过 `vue-demi` 自动兼容）
- `axios`, `lodash`, `jquery`, `mammoth`, `mergely`, `webuploader`, `codemirror`, `prismjs`
- `wangeditor@4`（纯 JS 库，不依赖 Vue）

### 4.3 暂时移除/降级处理的库

| 原库 | 原因 | 处理方式 |
|------|------|---------|
| `vue-super-flow` | 仅支持 Vue 2，无 Vue 3 版本 | `VueSuperFlow.vue` 中替换为 Element Plus Alert 提示，说明该组件暂不可用，建议后续迁移至 `@vue-flow/core` |
| `@form-create/element-ui` | 仅支持 Element UI / Vue 2 | 从 `main.js` 中移除。未找到官方 `@form-create/element-plus` 包 |
| `@form-create/designer` | 同上 | 从 `main.js` 中移除 |
| `@kangc/v-md-editor@1` | v1 仅支持 Vue 2 | 项目中未实际使用，已移除 |

---

## 五、遇到的坑与解决方案

### 5.1 默认插槽与具名插槽不能混用（Demo05.vue）

**现象**：Vue 3 编译器报错 `Extraneous children found when component already has explicitly named default slot`

**原因**：Vue 3 更严格地要求默认插槽的内容必须统一在一个 `<template #default>` 中，不能与裸露的子元素共存。

**解决**：将所有默认插槽内容包裹进单个 `<template #default>`。

### 5.2 v-model 不能绑定 prop（DialogChild.vue / Demo051.vue）

**现象**：`v-model cannot be used on a prop, because local prop bindings are not writable`

**原因**：Vue 3 编译器禁止 `v-model` 直接绑定到 props 上。

**解决**：
- 对于 Element Plus 组件（如 el-dialog）：使用 `:model-value` + `@update:model-value` 手动触发事件
- 对于自定义 prop：创建本地 data 副本，或使用计算属性

### 5.3 Element Plus 图标系统完全重构

**现象**：所有 `el-icon-*` 类名失效，图标不显示。

**原因**：Element Plus 从字体图标全面切换为 SVG 组件方案。

**解决**：安装 `@element-plus/icons-vue`，将 `<i class="el-icon-menu">` 改为 `<el-icon><Menu /></el-icon>`，并在组件或全局注册对应图标。

### 5.4 Vite 不会自动补全 .vue 扩展名

**现象**：`Could not resolve "./FunctionalList"`

**原因**：Vue CLI 会自动补全 `.vue`，Vite 不会。

**解决**：所有导入 Vue 单文件组件的路径必须显式加上 `.vue` 扩展名。

### 5.5 Element Plus 组件 CSS 类名变化

**现象**：菜单样式错乱。

**原因**：Element Plus 中 `el-submenu` → `el-sub-menu`，对应的 CSS 类名也发生了变化。

**解决**：全局搜索 `.el-submenu` 并替换为 `.el-sub-menu`。

### 5.6 依赖大换血后 node_modules 未清理导致 dev server 异常

**现象**：迁移到 Vite 后，执行 `npm run dev` 浏览器自动打开，且点击最小化后窗口被自动拉回最大化；或者出现其他无法解释的 dev server 异常行为。

**原因**：Vue 2 → Vue 3 迁移时 `package.json` 已完全重写，但 `node_modules` 目录**没有删除**，直接在旧依赖树上执行 `npm install`。npm 的增量安装可能导致：
- 传递依赖版本残留旧版本，与新包产生冲突
- `node_modules/.bin/` 中的二进制包装脚本未被重新生成
- Vite 使用的 `open` 包（负责打开浏览器）或其传递依赖处于混合版本状态，在 Windows 下表现出反复聚焦窗口的异常

**解决**：
```bash
# 彻底清理后重新安装
rm -rf node_modules
rm package-lock.json
npm install
```

**教训**：当 `package.json` 发生大规模依赖替换时，务必**先删除 `node_modules` 和 lock 文件**，再执行 `npm install`，避免增量安装带来的状态污染。

---

## 六、验证结果

| 验证项 | 结果 |
|--------|------|
| `npx vite build` 生产构建 | 通过（27s，无 error） |
| `npm run dev` 开发服务器启动 | 通过（端口 8081） |
| Element Plus 组件渲染 | 通过（构建包含 2675+ modules） |
| Vue Router 4 路由切换 | 通过 |

### 已知限制

- `vue-super-flow` 页面已降级为提示信息，流程图功能暂不可用
- `form-create` 相关表单设计器功能已移除（依赖包无 Vue 3 版本）
- ~~Sass deprecation 警告（legacy JS API）~~ — 已在 `vite.config.js` 中配置 `css.preprocessorOptions.scss.api = 'modern-compiler'` 消除

---

## 七、后续建议

1. **流程图替代**：如需恢复流程图功能，建议调研 `@vue-flow/core`（Vue 3 原生）或 `vue-super-flow` 作者是否发布 Vue 3 版本
2. **form-create 替代**：如需低代码表单，可调研 `@form-create/element-plus`（如有）或 `designable` 等 Vue 3 方案
3. ~~**Sass 配置升级**~~ — 已完成：已在 `vite.config.js` 中配置 `css.preprocessorOptions.scss.api = 'modern-compiler'` 消除 deprecation 警告
4. **ESLint 配置**：可补充 Vue 3 + Vite 配套的 ESLint 配置（`eslint-plugin-vue@^9` + `vite-plugin-eslint`）
5. **TypeScript 迁移**：作为学习项目，可考虑后续逐步引入 TypeScript 以提升可维护性

---

## 八、新增功能：v-md-editor Markdown 表格编辑器

### 8.1 功能概述

在一级菜单 **Vue基础总结** 中新增二级菜单 **v-md-editor**，演示如何在 Vue 3 项目中集成 `@kangc/v-md-editor@^2`，实现：
- Markdown 实时编辑与预览
- 表格内容的自定义编辑
- 横向内容溢出时，固定最左侧列

### 8.2 依赖安装

```bash
npm install @kangc/v-md-editor@^2
```

`@kangc/v-md-editor@^2` 原生支持 Vue 3，无需通过 `vue-demi` 转接。

### 8.3 全局注册（`src/main.js`）

```javascript
import VueMarkdownEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import VMdPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/preview.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
import Prism from 'prismjs'

VueMarkdownEditor.use(vuepressTheme, { Prism })
VMdPreview.use(vuepressTheme, { Prism })

app.use(VueMarkdownEditor)
app.use(VMdPreview)
```

> **注意**：`vuepress` 主题底层使用 PrismJS 进行代码高亮，必须显式传入 `Prism` 实例，否则会抛出 `Cannot read properties of undefined (reading 'languages')` 错误。

- `VueMarkdownEditor`：提供 `<v-md-editor>` 编辑组件（左编辑 + 右预览）
- `VMdPreview`：提供 `<v-md-preview>` 纯预览组件
- `vuepressTheme`：官方 VuePress 风格主题，内置表格、代码块等样式

### 8.4 组件实现要点（`src/views/VueMdEditor.vue`）

#### 双模式切换

| 模式 | 组件/实现 | 用途 |
|------|-----------|------|
| Markdown 编辑 | `<v-md-editor v-model="text" height="500px" />` | 左侧 Markdown 源码编辑 + 右侧实时预览 |
| 可视化表格编辑 | `el-table` + `el-input` + `fixed="left"` | 直接点击单元格修改内容，横向滚动时首列固定 |

两种模式共用同一份 `text` 数据：
- 切到「可视化表格编辑」时，通过 `parseMarkdownTable()` 将 Markdown 表格解析为 `tableColumns` + `tableData`
- 在 `el-table` 中编辑单元格（`el-input` + `@blur`）后，调用 `syncMarkdownFromTable()` 将修改写回 Markdown 源码
- 切回「Markdown 编辑」时，文本已包含最新修改

#### Markdown 表格解析与同步

```javascript
// 解析：按行扫描，识别 | 开头的表格行
parseMarkdownTable() {
  const lines = this.text.split('\n')
  for (const line of lines) {
    if (!line.trim().startsWith('|')) continue
    const cells = line.split('|').map(c => c.trim()).filter(c => c !== '')
    if (cells.every(c => /^[-:\s]+$/.test(c))) continue // 跳过分隔行
    if (columns.length === 0) {
      cells.forEach((label, i) => columns.push({ prop: `col${i}`, label }))
    } else {
      const row = {}
      cells.forEach((cell, i) => { row[`col${i}`] = cell })
      data.push(row)
    }
  }
}

// 同步：遍历文本，将原表格块替换为新内容
syncMarkdownFromTable() {
  const lines = this.text.split('\n')
  const newLines = []
  let i = 0
  while (i < lines.length) {
    if (!tableReplaced && lines[i].trim().startsWith('|')) {
      newLines.push(headerLine, separatorLine, ...dataLines)
      tableReplaced = true
      while (i < lines.length && lines[i].trim().startsWith('|')) i++
    } else {
      newLines.push(lines[i])
      i++
    }
  }
  this.text = newLines.join('\n')
}
```

#### 首列固定：Element Plus `el-table` 原生方案

在可视化表格编辑模式下，使用 Element Plus 的 `el-table` 组件，首列通过 `:fixed="'left'"` 实现固定：

```vue
<el-table-column
  v-for="(col, idx) in tableColumns"
  :key="col.prop"
  :prop="col.prop"
  :label="col.label"
  :fixed="idx === 0 ? 'left' : false"
  :width="getColumnWidth(idx, col.label)"
>
  <template #default="scope">
    <el-input
      v-model="scope.row[col.prop]"
      size="small"
      @blur="onCellBlur"
    />
  </template>
</el-table-column>
```

相比纯 CSS `position: sticky`，`el-table` 的 `fixed` 属性具有以下优势：
- 无需覆盖 vuepress 主题默认样式
- 自动处理阴影、背景色、z-index 等细节
- 与表格横向滚动无缝配合

#### Markdown 预览首列固定（备用 CSS 方案）

在 Markdown 预览区域，仍保留了 CSS `position: sticky` 方案作为补充演示：

```scss
.preview-scroll-wrapper {
  overflow-x: auto;
  :deep(.vuepress-markdown-body) {
    table { display: table; min-width: 900px; border-collapse: separate; }
    th:first-child, td:first-child {
      position: sticky; left: 0; z-index: 2; background: #fff;
      box-shadow: 2px 0 4px rgba(0, 0, 0, 0.08);
    }
  }
}
```

### 8.5 文件变更清单

| 文件 | 变更 |
|------|------|
| `src/main.js` | 注册 `VueMarkdownEditor`、`VMdPreview` 及 vuepress 主题 |
| `src/views/VueMdEditor.vue` | **新增** — 演示组件 |
| `src/App.vue` | 新增菜单项 `v-md-editor`，更新 `MENU_ROUTE_MAP` |
| `src/router/index.js` | 新增路由 `/vueMdEditor` |

### 8.6 验证结果

| 验证项 | 结果 |
|--------|------|
| `v-md-editor` 编辑与实时预览 | 通过 |
| Markdown 表格渲染 | 通过 |
| 横向滚动 + 首列固定 | 通过 |
| 生产构建（vite build） | 通过（无 error） |

### Vite 配置补充

为加快 dev server 冷启动速度，避免首次加载 v-md-editor 时出现大量请求，建议在 `vite.config.js` 中将其加入 `optimizeDeps.include`：

```javascript
export default defineConfig({
  optimizeDeps: {
    include: ['@kangc/v-md-editor', 'prismjs'],
  },
})
```
