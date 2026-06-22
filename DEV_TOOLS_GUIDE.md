# 开发工具使用指南

本文档记录本项目中常用的本地开发工具配置与 Claude Code 相关技巧，便于在新环境或后续会话中快速上手。

## 一、GitHub CLI（gh）

### 1.1 安装

Windows 推荐使用 winget 安装：

```bash
winget install --id GitHub.cli --accept-package-agreements --accept-source-agreements
```

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

## 三、隐私安全建议

1. **不要提交 token**：任何配置文件、脚本、文档中都不应写入真实的 GitHub Token、密码或完整 userID。
2. **凭据管理器优先**：使用 `gh auth login` 比手动保存 token 更安全。
3. **定期检查 token**：在 GitHub 个人设置中查看已授权的 token，及时撤销不再使用的。
4. **脱敏展示**：在文档或日志中展示路径时，对用户目录名进行脱敏（如 `C:\Users\8****9\`）。

---

## 四、常见问题

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
