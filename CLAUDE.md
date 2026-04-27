# CLAUDE.md

本文档为 Claude Code（claude.ai/code）提供本仓库的代码开发指引。

## 项目概述

本项目（`vuestudy`）是一个基于 Vue CLI 4.5 的 Vue 2 个人学习项目，用于集中演示 Vue 生态中的各类技术点、ElementUI 组件用法以及第三方库的集成方式。`src/views/` 下的每个文件通常对应一个独立的技术演示页面，并配有专属路由。

## 常用开发命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器（等同于 `vue-cli-service serve`） |
| `npm run build` | 生产环境构建（带代码压缩） |
| `npm run lint` | 运行 ESLint 检查并自动修复 |

项目同时存在 `package-lock.json` 和 `yarn.lock`，但优先使用 **npm**。

## 架构说明

### 应用外壳（`src/App.vue`）

根组件提供固定布局：左侧 ElementUI 侧边栏菜单（`el-menu`，启用 `router` 属性并与 `$route.path` 联动），右侧为主内容区。`<router-view>` 被包裹在 `<keep-alive include="Demo01,Demo02">` 中，**仅 `name` 为 `Demo01` 或 `Demo02` 的组件会被缓存**。若需让新组件享受 keep-alive，必须将其 `name` 加入该 `include` 列表。

### 路由（`src/router/index.js`）

- 采用 **History 模式**（`mode: 'history'`），生产环境需要服务端配置 fallback 支持。
- 包含 25+ 条路由，几乎全部使用懒加载（`() => import(...)`）。
- 通过覆写 `VueRouter.prototype.push` 来屏蔽 `NavigationDuplicated` 错误。
- 示例覆盖了全局守卫（`beforeEach`、`afterEach`）、路由独享守卫（`beforeEnter`）以及命名视图（`components` 多 key 形式）。

### 插件注册（`src/main.js`）

采用集中式注册：ElementUI（完整引入）、VueBus、form-create、vue-super-flow 以及自定义 XSS 辅助函数均在此注册。其中 `$xss` 通过 `Object.defineProperty(Vue.prototype, '$xss', ...)` 挂载到全局。新增第三方 Vue 插件时，应遵循此文件的现有模式。此外，该文件还包含 PWA Service Worker 的注册逻辑。

### 自定义指令（`src/directive.js`）

以 Vue 插件形式注册自定义指令。现有的 `v-el-select-loadmore` 展示了典型模式：为下拉框滚动容器绑定 scroll 监听，当滚动到底部时触发传入的回调函数。

### 视图目录结构

`src/views/` 存放演示页面。根目录下的 `.vue` 文件多为 Vue 基础概念演示（生命周期、插槽、函数式组件等）；子目录按主题分组：
- `src/views/elementUI/` —— ElementUI 组件实验（级联选择器、对话框、表格、下拉加载等）
- `src/views/UploadByPieces/demo1/` 与 `demo2/` —— 分片上传的不同实现方案

### 状态管理

`src/store/index.js` 为 Vuex 的空壳脚手架，未定义任何 state、mutation、action 或模块。大部分演示组件采用局部状态而非 Vuex。

## 工具链配置

- **ESLint**（`.eslintrc.js`）：继承 `plugin:vue/essential` 与 `eslint:recommended`，解析器为 `babel-eslint`。
- **Babel**（`babel.config.js`）：标准 `@vue/cli-plugin-babel/preset`。
- **SCSS**：组件内可直接使用 `lang="scss"`，已安装 `node-sass` 与 `sass-loader`。

---

## 完整版提示词

```
## 角色与目标
你是一个资深的前端架构师，擅长 Vue 3 技术栈。你需要帮助我深入分析当前的 Vue 3 项目。

## 分析范围
请全面扫描当前项目目录（从根目录开始），重点关注以下内容：

### 1. 项目结构
- 整体目录结构是否清晰合理？
- 功能模块划分是否恰当？
- 是否存在不合理的文件组织？

### 2. 技术栈与配置
- 识别项目使用的构建工具（Vite/Webpack 等）
- 检查 package.json 中的依赖版本是否合理
- 是否存在重复或过时的依赖包
- 配置文件（vite.config、tsconfig 等）是否有优化空间

### 3. 代码质量
- 组件设计和拆分是否合理？（关注 .vue 文件）
- 是否存在代码重复或可复用的逻辑
- 状态管理方案使用是否恰当（Pinia/Vuex）
- TypeScript 类型定义是否完整

### 4. 性能问题
- 路由配置是否可以优化懒加载？
- 组件是否存在不必要的重渲染？
- 是否存在大量未优化的静态资源？

### 5. 规范性
- 代码风格是否统一？
- 命名规范是否清晰？
- 是否存在常见的不良模式或反模式？

## 输出要求
请按以下格式输出分析结果：

1. **快速诊断**：用3-5句话概括项目整体状况
2. **问题清单**：按优先级（高/中/低）列出发现的问题
3. **具体建议**：针对每个问题给出改进方案，附上示例代码
4. **整体评分**：给项目打分（1-10分），并说明理由
```
