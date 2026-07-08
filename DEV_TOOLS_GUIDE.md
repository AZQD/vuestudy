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

当前项目已配置一个 GitHub MCP Server：

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

| 字段 | 说明 |
|------|------|
| `name`（`github`） | 自定义名称，方便在 Claude Code 中识别 |
| `type`（`http`） | MCP server 的传输协议，当前为 HTTP |
| `url` | MCP server 的接入地址，这里是 GitHub Copilot 提供的 MCP 服务 |

**功能说明：**

该 MCP server 让 Claude Code 能够直接调用 GitHub 相关能力，例如：
- 查询仓库列表、PR、Issue
- 获取仓库文件内容
- 在授权范围内执行仓库操作

实际可用能力取决于 MCP server 暴露的接口和当前账号的权限。

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

---

## 三、GitHub CLI 与 GitHub MCP server 的关系（初学者必读）

### 3.1 一句话区分

| | GitHub CLI（`gh`） | GitHub MCP server |
|--|-------------------|-------------------|
| 官方名称 | GitHub CLI | Model Context Protocol server for GitHub |
| 命令/工具名 | `gh` | 没有独立命令，通过 `claude mcp` 管理 |
| 安装方式 | `winget install GitHub.cli` | `claude mcp add --transport http github <url>` |
| 谁在用 | 你直接在终端使用 | Claude Code 内部调用 |
| 当前状态 | ✅ 已登录，可用 | ❌ 当前连接失败 |

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

*本文档随工具版本变化可能需要更新。*
