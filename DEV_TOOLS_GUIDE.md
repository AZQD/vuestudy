# 开发工具使用指南

本文档记录本项目中常用的本地开发工具配置与 Claude Code 相关技巧，便于在新环境或后续会话中快速上手。

## 一、GitHub CLI（`gh`）

> 官方名称是 **GitHub CLI**，`gh` 是它在终端中的命令名，类似 `git` 之于 Git。

### 1.1 安装

Windows 推荐使用 winget 安装：

```bash
winget install --id GitHub.cli --accept-package-agreements --accept-source-agreements
```

> 注意：这是安装 **GitHub CLI 命令行工具**，不是安装 GitHub MCP server。两者名字相似，但完全独立。

安装完成后，新终端可能还找不到 `gh` 命令，因为 shell 的 PATH 尚未刷新。此时可直接使用完整路径：

```bash
"/c/Program Files/GitHub CLI/gh.exe" --version
```

### 1.2 登录

```bash
gh auth login
```

按提示选择：
- **GitHub.com**
- **HTTPS**
- 浏览器登录或粘贴 Personal Access Token

### 1.3 登录状态存储位置

`gh auth login` 的认证信息分为两部分存储：

| 信息 | 存储位置 | 说明 |
|------|---------|------|
| 访问 Token | Windows 凭据管理器 | 条目名为 `gh:github.com`，由操作系统安全存储 |
| CLI 本地缓存 | `C:\Users\8****9\AppData\Local\GitHub CLI\` | 配置缓存，不含明文密码 |

> 注意：`gh auth status` 中显示的 Token 会被脱敏为 `gho_************************************`，不会完整输出。

### 1.4 常用查询命令

```bash
# 查看登录状态
gh auth status

# 查看分配给我的开放 PR
gh pr list --assignee @me --state open

# 查看我创建的开放 PR
gh pr list --author @me --state open

# 列出当前账号下的仓库
gh repo list --limit 100
```

### 1.5 是否需要重新登录？

`gh` 的 Token 长期有效，**通常不需要重新登录**，直到：
- 执行 `gh auth logout`
- 在 GitHub 网页上撤销了对应 token
- token 过期（Classic PAT 默认不过期，Fine-grained PAT 可设置过期时间）

---

## 二、Claude Code MCP Server

### 2.1 什么是 MCP？

MCP（Model Context Protocol）是 Claude Code 的扩展机制，允许 Claude 调用外部服务（如 GitHub、数据库、搜索等）。

### 2.2 配置位置

MCP server 配置保存在 Claude Code 的用户级配置文件中：

```
C:\Users\8****9\.claude.json
```

项目级配置位于该文件的 `projects["D:/code/vuestudy"].mcpServers` 节点下。

### 2.3 已配置的 MCP Server 简介

当前项目配置了以下 MCP server：

| 名称 | 类型 | 命令/地址 | 状态 | 用途 |
|------|------|----------|------|------|
| `github` | HTTP | `https://api.githubcopilot.com/mcp/` | ❌ 已弃用 | GitHub Copilot 官方 MCP，因 OAuth 不兼容无法使用 |
| `github-stdio` | stdio | `npx -y @modelcontextprotocol/server-github` | ✅ 已连接 | 查询 GitHub 仓库、PR、提交等 |
| `figma-context` | stdio | `npx -y @tmegit/figma-developer-mcp` | ✅ 已连接 | 读取 Figma 设计稿，生成前端代码 |
| `figma-dev` | sse | `http://127.0.0.1:3845/sse` | ❌ 已移除 | 旧配置，无服务监听 |

**当前实际可用的两个 MCP server：**

- **`github-stdio`**：替代 `gh` 命令，用自然语言查询 GitHub
- **`figma-context`**：连接 Figma，读取设计稿信息

下面 2.7 节和第六章会分别详细介绍它们的配置方法。

#### `github`（HTTP 类型）配置示例

```json
{
  "projects": {
    "D:/code/vuestudy": {
      "mcpServers": {
        "github": {
          "type": "http",
          "url": "https://api.githubcopilot.com/mcp/"
        }
      }
    }
  }
}
```

该配置因 GitHub OAuth 服务器不支持动态客户端注册，导致 `claude mcp login` 无法完成认证，目前已弃用。

### 2.4 常用 MCP 命令

```bash
# 列出当前已配置的所有 MCP servers
claude mcp list

# 添加一个 HTTP 类型的 MCP server
claude mcp add --transport http <server-name> <server-url>

# 示例：添加 GitHub Copilot MCP server
claude mcp add --transport http github https://api.githubcopilot.com/mcp/

# 移除指定 MCP server
claude mcp remove <server-name>

# 查看 MCP 相关帮助
claude mcp --help
```

### 2.5 如何使用已配置的 MCP Server？

配置完成后，Claude Code 会在需要时自动尝试通过 MCP server 获取信息。例如你可以直接对 Claude 说：

- "显示分配给我的所有未关闭的 PR"
- "分析 AZQD/TypeScript 仓库的代码结构"
- "列出我 GitHub 账号下的所有仓库"

如果 MCP 调用失败，Claude 会回退到 `gh` CLI 或建议你手动处理。

### 2.6 MCP 与 gh 登录的区别

| 对比项 | `gh` CLI | GitHub MCP Server |
|--------|----------|-------------------|
| 认证方式 | 通过 `gh auth login` 获取 token | 依赖 GitHub / GitHub Copilot 的会话状态 |
| 存储位置 | Windows 凭据管理器 + 本地缓存 | `.claude.json` 项目配置 |
| 有效期 | 长期有效 | 取决于具体 MCP 服务的要求 |
| 使用场景 | 命令行操作仓库、PR、Issue | Claude Code 内直接调用 GitHub 能力 |

> 重要：`gh` 登录成功 **不等于** MCP server 自动可用。MCP server 是否需要重新认证，取决于该服务自身的机制。如果调用失败，可能需要检查浏览器中 GitHub / GitHub Copilot 是否仍处于登录状态。

### 2.7 社区版 GitHub MCP server（推荐）

如果 GitHub Copilot 提供的 HTTP MCP server 因 OAuth 问题无法连接，可以使用社区版 MCP server：`@modelcontextprotocol/server-github`。

#### 为什么推荐社区版？

| 对比项 | GitHub Copilot MCP（HTTP） | 社区版 GitHub MCP（stdio） |
|--------|---------------------------|---------------------------|
| 认证方式 | OAuth（需动态客户端注册） | Personal Access Token |
| 与 Claude Code 兼容性 | ❌ 不兼容当前 OAuth 机制 | ✅ 兼容 |
| 是否需要 Copilot 订阅 | 可能需要 | 不需要 |
| 配置复杂度 | 高 | 中 |

#### 配置步骤

**第 1 步：创建 GitHub PAT**

1. 打开 https://github.com/settings/tokens
2. 点击 **Generate new token (classic)**
3. 填写名称，如 `claude-mcp-github`
4. 建议有效期选 **30 天**
5. 勾选以下权限：
   - `repo`（访问仓库）
   - `read:org`（读取组织）
   - `read:user`（读取用户信息）
   - `gist`（读取/创建 gist）
   - `workflow`（可选，读取工作流）
6. 生成并复制 token（以 `ghp_` 开头）

**第 2 步：添加 MCP server**

```bash
claude mcp remove github

claude mcp add github-stdio \
  --env GITHUB_PERSONAL_ACCESS_TOKEN=ghp_你的token \
  -- npx -y @modelcontextprotocol/server-github
```

**第 3 步：验证连接**

```bash
claude mcp list
```

如果显示 `github-stdio: ... - ✔ Connected`，说明配置成功。

#### 安全提醒

- PAT 会保存在 `C:\Users\8****9\.claude.json` 中，注意保护好该文件
- 不要截图或发送 token 给他人
- token 过期后及时更新
- 在公共电脑上不建议保存 token
- **不要执行 `claude mcp get <server-name>`**：该命令会以明文形式输出 token，容易在截图或对话中泄露

### 2.8 MCP 应用示例

配置好 `github-stdio` 后，你可以直接对 Claude 说：

- "列出我的 GitHub 仓库"
- "查看 AZQD/vuestudy 仓库的 README 内容"
- "我有哪些开放的 PR？"
- "分析 AZQD/TypeScript 仓库最近提交了哪些文件"

Claude 会自动调用 `github-stdio` 提供的工具（如 `list_repositories`、`get_file_contents`、`list_pull_requests` 等），获取结构化数据后回复你。

### 2.9 本项目两个可用 MCP server 对比

| 对比项 | `github-stdio` | `figma-context` |
|--------|---------------|-----------------|
| 连接的服务 | GitHub | Figma |
| 用途 | 查询代码仓库、PR、Issue、提交 | 读取设计稿、生成前端代码 |
| 认证方式 | GitHub PAT | Figma Personal Access Token |
| 传输协议 | stdio | stdio |
| 是否需要手动启动 | 否 | 否 |
| 典型用法 | "列出我的 GitHub 仓库" | "读取这个 Figma 文件并生成 Vue 组件" |

### 2.10 如何选择用哪个 MCP server？

- **和代码相关的问题** → 用 `github-stdio`
- **和设计稿相关的问题** → 用 `figma-context`
- **两者可以共存**，Claude 会根据你的问题自动选择合适的工具

---

## 三、GitHub CLI 与 GitHub MCP server 的关系（初学者必读）

### 3.1 一句话区分

| | GitHub CLI（`gh`） | GitHub MCP server |
|--|-------------------|-------------------|
| 官方名称 | GitHub CLI | Model Context Protocol server for GitHub |
| 命令/工具名 | `gh` | 没有独立命令，通过 `claude mcp` 管理 |
| 安装方式 | `winget install GitHub.cli` | `claude mcp add --transport http github <url>` |
| 谁在用 | 你直接在终端使用 | Claude Code 内部调用 |
| 当前状态 | ✅ 已登录，可用 | ✅ `github-stdio` 已连接，可用 |

### 3.2 真实执行流程

#### 当你对 Claude 说"查我的 GitHub 仓库"

**方式一：通过 GitHub CLI（当前实际使用的方式）**

```
你说 -> Claude -> 调用 Bash -> 在你的电脑上执行 gh repo list
                              -> 读取你已登录的 token
                              -> 返回仓库列表
                              -> Claude 整理后回复你
```

关键点：
- 命令运行在你的电脑上
- 用的是你通过 `gh auth login` 登录后的身份
- 没有使用 MCP

**方式二：通过 GitHub MCP server（当前连接失败，未使用）**

```
你说 -> Claude -> 调用 github MCP 工具（如 list_repositories）
                              -> MCP server 去请求 GitHub API
                              -> 返回结构化数据
                              -> Claude 整理后回复你
```

关键点：
- 由 Claude 自动选择并调用合适的 MCP 工具
- 不需要我写 `gh` 命令
- 返回的是结构化数据，便于多步骤操作

### 3.3 真实应用场景对比

| 场景 | 用 GitHub CLI | 用 GitHub MCP server |
|------|--------------|----------------------|
| 查仓库列表 | `gh repo list` | Claude 调用 `list_repositories` |
| 查开放 PR | `gh pr list --author @me --state open` | Claude 调用 `list_pull_requests` |
| 查 PR 改了哪些文件 | 先 `gh pr view 123`，再 `gh pr diff 123` | Claude 连续调用多个工具自动完成 |
| 复杂多步任务 | 需要手写多条命令，容易出错 | Claude 自动规划并调用工具链 |

### 3.4 常见混淆点

**Q：我用 `claude mcp add github https://api.github.com/mcp` 后就能查仓库了，这不是安装了 GitHub CLI 吗？**

A：**不是。** 这条命令安装的是 GitHub MCP server。能查仓库通常有两种可能：
1. 当时 MCP 是可用的，Claude 通过 MCP 查询
2. 你的电脑上本来就有 `gh`，或者之前已安装过 GitHub CLI

在本项目中，GitHub CLI 是通过 `winget install GitHub.cli` 单独安装的，和 `claude mcp add` 没有关系。

**Q：为什么 Claude 能用 `gh` 查我的仓库？**

A：因为 Claude Code 可以执行你电脑上的 Bash 命令。你已完成 `gh auth login`，所以 `gh` 在你的电脑上有权限。Claude 只是触发了这条命令，实际运行和认证都在你的本地完成。

### 3.5 实战对比：查询我的 GitHub 仓库列表

下面以「列出 AZQD 账号下的仓库」为例，演示两种方式的真实输出对比。

#### 方式一：GitHub CLI（`gh`）

```bash
gh repo list --limit 100
```

返回示例（终端表格，共 17 个）：

| 名称 | 描述 | 可见性 | 最近更新 |
|------|------|--------|----------|
| vuestudy | vuestudy项目学习总结 | public | 2026-07-08 |
| TypeScript | This is my TypeScript project . | public | 2026-06-12 |
| Profile | 个人相关 | private | 2026-04-29 |
| WebStorm | 常用知识总结 | public | 2025-10-30 |
| command | 开发常用命令行&快捷键 | public | 2025-01-17 |
| NPM | NPM包管理 | public | 2025-02-17 |
| neighbour | neighbour | private | 2021-04-12 |
| JOB_ZX | — | public | 2024-03-01 |
| WeChat | 微信小程序 | public | 2024-04-23 |
| ReactStudy | React学习总结 | public | 2021-03-02 |
| miniprogram-init | 小程序项目初始化CLI | public | 2021-03-29 |
| server | 启动本地服务 localhost:3000 | public | 2026-01-06 |
| webpackPluginDefined | weppack 自定义插件 | public | 2021-03-04 |
| microBlog | Do Better ! | public | 2018-08-24 |
| NodeStudy | Node.js学习总结 | public | 2019-11-20 |
| summary | 采坑总结、随笔 | public | 2020-10-10 |
| MyLearning | Github入门 | public | 2020-09-23 |

> 注：`gh repo list` 默认过滤或分页策略与 API 搜索略有差异，因此显示数量可能少于 API 搜索总数。

#### 方式二：`github-stdio` MCP server

对 Claude 说：

> "用 github-stdio 查询我的 GitHub 仓库列表"

Claude 会调用 `search_repositories`，参数为 `{"query": "user:AZQD", "per_page": 10}`，返回结构化 JSON：

```json
{
  "total_count": 24,
  "incomplete_results": false,
  "items": [
    { "name": "vuestudy", "description": "vuestudy项目学习总结", "private": false },
    { "name": "WeChat", "description": "微信小程序", "private": false },
    { "name": "ReactStudy", "description": "React学习总结", "private": false },
    { "name": "miniprogram-init", "description": "小程序项目初始化CLI", "private": false },
    { "name": "NPM", "description": "NPM包管理", "private": false },
    { "name": "NodeStudy", "description": "Node.js学习总结", "private": false },
    { "name": "kxhtml", "description": null, "private": false },
    { "name": "JOB_ZX", "description": null, "private": false },
    { "name": "summary", "description": "采坑总结、随笔", "private": false },
    { "name": "neighbour", "description": "neighbour", "private": true },
    { "name": "microBlog", "description": "Do Better !", "private": false },
    { "name": "WebStorm", "description": "常用知识总结", "private": false },
    { "name": "Interview", "description": "面试宝典", "private": false },
    { "name": "JOB_LAAN", "description": null, "private": false },
    { "name": "gitTest", "description": "Git命令应用", "private": false },
    { "name": "MyLearning", "description": "Github入门", "private": false },
    { "name": "server", "description": "启动本地服务 localhost:3000", "private": false },
    { "name": "webpackPluginDefined", "description": "weppack 自定义插件", "private": false },
    { "name": "Part-time-job", "description": "项目开发应用实战", "private": false },
    { "name": "TypeScript", "description": "This is my TypeScript project .", "private": false },
    { "name": "Profile", "description": "个人相关", "private": true },
    { "name": "command", "description": "开发常用命令行&快捷键", "private": false },
    { "name": "YOUPIN_NEW", "description": null, "private": false },
    { "name": "redux-app", "description": "redux学习总结", "private": false }
  ]
}
```

#### 结果对比

| 对比项 | `gh repo list` | `github-stdio` |
|--------|----------------|----------------|
| 调用命令/工具 | `gh repo list --limit 100` | `search_repositories`（MCP 工具） |
| 返回总数 | 17 个 | 24 个 |
| 数据格式 | 终端表格 | JSON |
| 是否需要写命令 | 是 | 否（自然语言即可） |
| 是否可直接用于后续操作 | 需要手动复制/解析 | Claude 可直接读取字段继续操作 |

> 说明：两者底层访问的都是 GitHub API，数据一致；数量差异主要来自 `gh repo list` 的默认过滤/分页行为与 `search_repositories` 不同。如果你需要完整列表，可在 `gh` 中增大 `--limit`，或在 MCP 调用中提高 `per_page`。

### 3.6 实战对比：查询仓库的最近提交/推送信息

再以「查看 AZQD/vuestudy 最近改动」为例，对比 `gh` 与 `github-stdio` 的差异。

#### 方式一：GitHub CLI（`gh`）

```bash
gh api repos/AZQD/vuestudy/events --jq '[.[] | select(.type=="PushEvent")] | .[:5]'
```

返回的是**推送事件（PushEvent）**，关注的是"谁在什么时候把哪个 HEAD 推到了哪个分支"：

| 推送时间 | 推送者 | 分支 | HEAD Commit |
|----------|--------|------|-------------|
| 2026-07-08 08:38:40 | AZQD | `develop_claude` | `547aeb5` |
| 2026-07-08 03:20:21 | AZQD | `develop_claude` | `e2aad76` |
| 2026-07-08 03:19:05 | AZQD | `develop_claude` | `900f330` |
| 2026-06-22 09:32:14 | AZQD | `develop_claude` | `3176fc0` |
| 2026-06-12 01:43:43 | AZQD | `develop_claude` | `d741c34` |

> 注：`events` 接口的 `payload` 中不包含详细 commit 消息，只有 `before`/`head`/`ref` 等推送元信息。如需 commit 详情，需再用 `gh api repos/AZQD/vuestudy/commits/{sha}` 二次查询。

#### 方式二：`github-stdio` MCP server

对 Claude 说：

> "用 github-stdio 查一下 vuestudy 最近 5 次提交"

Claude 会调用 `list_commits`，参数为 `{"owner": "AZQD", "repo": "vuestudy", "sha": "develop_claude", "perPage": 5}`，返回的是**提交历史**：

| Commit | 提交时间 | 提交说明 |
|--------|----------|----------|
| `547aeb5` | 2026-07-08 08:38:34 | 更新 DEV_TOOLS_GUIDE：补充 gh 与 github-stdio 实战对比 |
| `e2aad76` | 2026-07-08 03:18:59 | 补充 DEV_TOOLS_GUIDE.md：厘清 GitHub CLI 与 MCP server 的区别 |
| `3176fc0` | 2026-06-22 09:31:52 | 新增开发工具指南：gh CLI 与 Claude Code MCP Server 使用说明 |
| `d741c34` | 2026-06-12 01:43:37 | 补充记忆规则：保留注释、记录即持久化 |
| `5ad88d9` | 2026-06-12 01:38:53 | 优化 CLAUDE.md：拆分提示词模板并同步 Vue 3 技术栈描述 |

#### 结果对比

| 对比项 | `gh api .../events` | `github-stdio` `list_commits` |
|--------|---------------------|-------------------------------|
| 查询对象 | 推送事件（PushEvent） | 提交记录（Commit） |
| 返回重点 | 谁、何时、推到哪个分支 | commit 消息、作者、SHA、parent |
| 是否需写命令 | 是 | 否 |
| 是否包含 commit 详情 | 否，需二次查询 | 是 |
| 适用场景 | 审计推送行为 | 查看代码变更内容 |

---

## 四、隐私安全建议

1. **不要提交 token**：任何配置文件、脚本、文档中都不应写入真实的 GitHub Token、密码或完整 userID。
2. **凭据管理器优先**：使用 `gh auth login` 比手动保存 token 更安全。
3. **定期检查 token**：在 GitHub 个人设置中查看已授权的 token，及时撤销不再使用的。
4. **脱敏展示**：在文档或日志中展示路径时，对用户目录名进行脱敏（如 `C:\Users\8****9\`）。

---

## 五、常见问题

### Q1：安装 gh 后当前终端找不到命令？

这是 PATH 未刷新导致的。重启终端或直接使用完整路径：

```bash
"/c/Program Files/GitHub CLI/gh.exe" auth status
```

### Q2：为什么 MCP 配置好了但 Claude 无法调用？

可能原因：
- MCP server 依赖的 GitHub / GitHub Copilot 会话已过期
- 当前网络无法访问该 MCP URL
- Claude Code 版本不支持该 MCP server 的协议

排查步骤：先确认 `gh auth status` 正常，再确认浏览器中 GitHub 已登录，最后查看 Claude Code 是否有 MCP 相关报错。

---

## 六、Figma-Context-MCP 配置指南（从零开始）

如果你希望 Claude Code 能读取 Figma 设计稿内容（如颜色、布局、文本、组件等），可以使用开源社区项目 **`Figma-Context-MCP`**（npm 包名 `@tmegit/figma-developer-mcp`）。

### 6.1 它是什么？

`Figma-Context-MCP` 是一个**本地 stdio 类型的 MCP server**，它通过 Figma REST API 读取设计稿，并把 Figma 内部格式转换成 CSS 对齐的属性（如 `backgroundColor`、`flexDirection`、`fontSize`），方便 Claude 生成前端代码。

特点：

- 完全免费，无需 Figma 插件
- 需要 Figma Personal Access Token
- 返回数据高度精简，保留 UI 关键信息
- 适合"根据设计稿生成页面代码"的场景

### 6.2 与之前 `figma-dev` 配置的区别

| 对比项 | 旧的 `figma-dev` | `Figma-Context-MCP` |
|--------|-----------------|---------------------|
| 传输协议 | SSE（需本地服务监听端口 3845） | stdio（无需端口） |
| 是否需要单独启动服务 | 是 | 否，Claude Code 自动启动进程 |
| 是否需要 Figma 插件 | 未知（当时无服务运行） | 否 |
| 认证方式 | 未知 | Figma Personal Access Token |
| 当前状态 | 已移除 | 推荐从零配置 |

### 6.3 配置步骤

#### 第 1 步：创建 Figma Access Token

1. 登录 Figma 网页版：https://www.figma.com/
2. 点击头像 → **Settings**
3. 左侧选择 **Personal access tokens**
4. 点击 **Create new token**
5. 填写名称，如 `claude-figma-mcp`
6. 复制生成的 token（以一串随机字符形式出现）

#### 第 2 步：添加 MCP server

Windows 下直接使用 `npx` 启动（推荐）：

```bash
claude mcp add figma-context -- npx -y @tmegit/figma-developer-mcp --figma-api-key=你的FigmaToken --stdio
```

> 注意：在 Windows 上实测 `cmd /c npx ...` 的写法会导致 MCP 连接失败，建议用上面的 `npx` 直接启动方式。

或者直接修改 `C:\Users\8****9\.claude.json`：

```json
{
  "projects": {
    "D:/code/vuestudy": {
      "mcpServers": {
        "figma-context": {
          "type": "stdio",
          "command": "npx",
          "args": [
            "-y",
            "@tmegit/figma-developer-mcp",
            "--figma-api-key=你的FigmaToken",
            "--stdio"
          ]
        }
      }
    }
  }
}
```

#### 第 3 步：验证连接

```bash
claude mcp list
```

看到 `figma-context: ... - ✔ Connected` 即成功。

### 6.4 如何使用

配置好后，直接对 Claude 说：

```text
帮我读取这个 Figma 文件：https://www.figma.com/file/xxxxx/xxxx
```

或：

```text
根据这个 Figma 设计稿生成 Vue 组件代码
```

Claude 会自动调用 `figma-context` 提供的工具读取文件节点、样式、文本等信息。

### 6.5 常见问题

**Q：提示 "无法连接到 figma-context" 怎么办？**

1. 确认 token 已正确替换，不是占位符
2. 确认网络能访问 `api.figma.com`
3. 确认 `npx` 能正常下载包（首次启动会自动下载）
4. 运行 `claude mcp list` 查看具体错误信息

**Q：这个 MCP server 能修改 Figma 文件吗？**

目前主要是**读取**设计稿信息，不修改原文件。

---

## 七、gh 与 github-stdio 安装使用速查

如果你是第一次配置，可以直接按下面的流程操作，不需要回头翻前面的章节。

### 7.1 GitHub CLI（`gh`）从安装到使用

#### 第 1 步：安装

Windows 用 winget：

```bash
winget install --id GitHub.cli --accept-package-agreements --accept-source-agreements
```

安装后如果当前终端找不到 `gh`，可直接用完整路径：

```bash
"/c/Program Files/GitHub CLI/gh.exe" --version
```

#### 第 2 步：登录

```bash
gh auth login
```

按提示选择：

1. **GitHub.com**
2. **HTTPS**
3. 浏览器登录（推荐）或粘贴 Personal Access Token

#### 第 3 步：验证

```bash
gh auth status
```

看到 `Logged in to github.com as AZQD` 即表示成功。

#### 第 4 步：常用查询

```bash
# 列出我的仓库
gh repo list --limit 100

# 查看分配给我的开放 PR
gh pr list --assignee @me --state open

# 查看仓库事件（如推送）
gh api repos/AZQD/vuestudy/events

# 查看最近提交
gh api repos/AZQD/vuestudy/commits --method GET -f sha=develop_claude -f per_page=5
```

---

### 7.2 `github-stdio` 从安装到使用

#### 第 1 步：创建 GitHub PAT

1. 打开 https://github.com/settings/tokens
2. 点击 **Generate new token (classic)**
3. 名称填 `claude-mcp-github`
4. 有效期建议 **30 天**
5. 勾选权限：
   - `repo`
   - `read:org`
   - `read:user`
   - `gist`
   - `workflow`（可选）
6. 复制 token（以 `ghp_` 开头）

#### 第 2 步：添加 MCP server

```bash
claude mcp add github-stdio \
  --env GITHUB_PERSONAL_ACCESS_TOKEN=ghp_你的token \
  -- npx -y @modelcontextprotocol/server-github
```

#### 第 3 步：验证

```bash
claude mcp list
```

显示 `github-stdio: ... - ✔ Connected` 即成功。

#### 第 4 步：使用

配置好后，直接对 Claude 说：

```text
列出我的 GitHub 仓库
```

或：

```text
查一下 AZQD/vuestudy 最近 5 次提交
```

Claude 会自动调用 `github-stdio` 的对应工具（如 `search_repositories`、`list_commits`），不需要你手写命令。

---

### 7.3 两者核心差异一句话总结

| | `gh` | `github-stdio` |
|--|------|----------------|
| **本质** | 独立命令行工具 | Claude Code 的扩展能力 |
| **安装对象** | 你的操作系统 | Claude Code 内部配置 |
| **认证方式** | `gh auth login` | GitHub PAT |
| **使用方式** | 在终端敲命令 | 用自然语言对 Claude 说 |
| **最佳场景** | 精确单步操作、脚本化 | 多步骤自动化、对话式查询 |

---

## 八、Figma-Context-MCP 安装使用速查

如果你只想快速让 Claude Code 读取 Figma 设计稿，按下面四步操作即可。

### 8.1 第 1 步：创建 Figma Access Token

1. 打开 https://www.figma.com/ 并登录
2. 点击头像 → **Settings**
3. 左侧选择 **Personal access tokens**
4. 点击 **Create new token**
5. 名称填 `claude-figma-mcp`
6. 复制生成的 token

### 8.2 第 2 步：添加 MCP server

```bash
claude mcp add figma-context -- npx -y @tmegit/figma-developer-mcp --figma-api-key=你的FigmaToken --stdio
```

> 注意：Windows 下不要用 `cmd /c npx ...`，实测会连接失败。

### 8.3 第 3 步：验证

```bash
claude mcp list
```

显示 `figma-context: ... - ✔ Connected` 即成功。

### 8.4 第 4 步：使用

对 Claude 说：

```text
读取这个 Figma 文件：https://www.figma.com/file/xxxxx/xxxx
```

或：

```text
根据这个 Figma 设计稿生成 Vue 组件代码
```

Claude 会自动调用 `figma-context` 读取设计稿信息。

### 8.5 安全提醒

- token 保存在 `C:\Users\8****9\.claude.json` 中
- `claude mcp list` 会明文显示 token，不要截图发给别人
- token 泄露后及时在 Figma Settings 中撤销并重新生成

---

*本文档随工具版本变化可能需要更新。*
