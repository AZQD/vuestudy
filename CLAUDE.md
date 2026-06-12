# CLAUDE.md

本文档为 Claude Code（claude.ai/code）提供本仓库的代码开发指引。

## 项目概述

本项目（`vuestudy`）是一个基于 **Vite 5 + Vue 3.4 + Element Plus 2.x** 的个人学习项目，用于集中演示 Vue 生态中的各类技术点、Element Plus 组件用法以及第三方库的集成方式。`src/views/` 下的每个文件通常对应一个独立的技术演示页面，并配有专属路由。

项目已从 Vue CLI 4.5 + Vue 2.7 + Element UI 完整迁移至 Vue 3 技术栈，迁移文档见 `VUE3_MIGRATION_GUIDE.md`。

## 常用开发命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动 Vite 开发服务器 |
| `npm run build` | 生产环境构建（带代码压缩） |
| `npm run lint` | 运行 ESLint 检查并自动修复 |

项目同时存在 `package-lock.json` 和 `yarn.lock`，但优先使用 **npm**。

## 架构说明

### 应用外壳（`src/App.vue`）

根组件提供固定布局：左侧 Element Plus 侧边栏菜单（`el-menu`，启用 `router` 属性并与 `$route.path` 联动），右侧为主内容区。`<router-view>` 被包裹在 `<KeepAlive include="Demo01,Demo02">` 中，**仅 `name` 为 `Demo01` 或 `Demo02` 的组件会被缓存**。若需让新组件享受 keep-alive，必须将其 `name` 加入该 `include` 列表。

### 路由（`src/router/index.js`）

- 采用 **History 模式**（`createWebHistory()`），生产环境需要服务端配置 fallback 支持。
- 包含 25+ 条路由，几乎全部使用懒加载（`() => import(...)`）。
- 通过覆写 `router.push` 来屏蔽 `NavigationDuplicated` 错误。
- 示例覆盖了全局守卫（`beforeEach`、`afterEach`）、路由独享守卫（`beforeEnter`）以及命名视图（`components` 多 key 形式）。

### 插件注册（`src/main.js`）

采用集中式注册：Element Plus（完整引入）、mitt（事件总线）、form-create、vue-super-flow 以及自定义 XSS 辅助函数均在此注册。其中 `$xss` 通过 `app.config.globalProperties.$xss` 挂载到全局。新增第三方 Vue 插件时，应遵循此文件的现有模式。

### 自定义指令（`src/directive.js`）

以 Vue 插件形式注册自定义指令。现有的 `v-el-select-loadmore` 展示了典型模式：为下拉框滚动容器绑定 scroll 监听，当滚动到底部时触发传入的回调函数。

### 视图目录结构

`src/views/` 存放演示页面。根目录下的 `.vue` 文件多为 Vue 基础概念演示（生命周期、插槽、函数式组件等）；子目录按主题分组：
- `src/views/elementUI/` —— Element Plus 组件实验（级联选择器、对话框、表格、下拉加载等）
- `src/views/UploadByPieces/demo1/` 与 `demo2/` —— 分片上传的不同实现方案

### 状态管理

`src/store/index.js` 为 Vuex 的空壳脚手架，未定义任何 state、mutation、action 或模块。大部分演示组件采用局部状态而非 Vuex。

## 工具链配置

- **ESLint**（`.eslintrc.js`）：继承 `plugin:vue/essential` 与 `eslint:recommended`。项目已迁移至 Vue 3，解析器待更新为 `vue-eslint-parser`。
- **Vite**（`vite.config.js`）：使用 `@vitejs/plugin-vue` 处理 `.vue` 文件，配置 `@` alias 指向 `src/`；`css.preprocessorOptions.scss.api = 'modern-compiler'` 消除 Sass legacy JS API 弃用警告。
- **SCSS**：组件内可直接使用 `lang="scss"`，已安装 `sass`（Dart Sass）。
