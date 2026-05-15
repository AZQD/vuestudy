<template>
  <div class="vue-md-editor-demo">
    <h3>学习重点：Vue 3 中使用 v-md-editor 渲染 Markdown 表格，支持可视化编辑与首列固定</h3>

    <div class="desc">
      <p>本示例演示以下能力：</p>
      <ul>
        <li>使用 <code>@kangc/v-md-editor</code> 在 Vue 3 中编辑 Markdown</li>
        <li>Markdown 表格实时渲染预览</li>
        <li>切换到<strong>可视化表格编辑</strong>模式，直接点击单元格修改内容</li>
        <li>横向内容溢出时，使用 Element Plus <code>el-table</code> 的 <code>fixed="left"</code> 固定最左侧列</li>
      </ul>
    </div>

    <div class="controls">
      <el-radio-group v-model="mode">
        <el-radio-button label="markdown">Markdown 编辑</el-radio-button>
        <el-radio-button label="visual">可视化表格编辑</el-radio-button>
      </el-radio-group>
      <el-button type="primary" size="small" @click="resetContent">重置内容</el-button>
    </div>

    <!-- Markdown 编辑模式：v-md-editor 左侧编辑区 + 右侧预览区 -->
    <div v-show="mode === 'markdown'" class="mode-panel">
      <v-md-editor v-model="text" height="500px" />
    </div>

    <!-- 可视化表格编辑模式：Element Plus el-table，支持直接编辑单元格，首列固定 -->
    <div v-show="mode === 'visual'" class="mode-panel visual-mode">
      <el-alert
        type="info"
        :closable="false"
        show-icon
        title="提示"
        description="直接点击单元格即可编辑内容；横向滚动时「姓名」列保持固定。编辑后的内容会自动同步回 Markdown 源码。"
      />
      <div class="table-container">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          max-height="520"
          size="small"
        >
          <el-table-column
            v-for="(col, idx) in tableColumns"
            :key="col.prop"
            :prop="col.prop"
            :label="col.label"
            :fixed="idx === 0 ? 'left' : false"
            :width="getColumnWidth(idx, col.label)"
            :min-width="100"
          >
            <template #default="scope">
              <el-input
                v-model="scope.row[col.prop]"
                size="small"
                @blur="onCellBlur"
              />
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 同时展示 Markdown 预览，方便对照 -->
      <div class="preview-section">
        <h4>Markdown 预览</h4>
        <div class="preview-scroll-wrapper">
          <v-md-preview :text="text" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const defaultText = `## 项目成员信息表

以下表格包含多列数据，用于演示**横向溢出时首列固定**与**单元格直接编辑**的效果。

| 姓名 | 工号 | 部门 | 职位 | 入职日期 | 联系方式 | 邮箱 | 状态 | 办公地址 | 备注 |
|------|------|------|------|----------|----------|------|------|----------|------|
| 张三 | E10001 | 技术研发部 | 前端工程师 | 2020-03-15 | 13800138001 | zhangsan@example.com | 在职 | 北京海淀区中关村软件园A座 | 负责Vue生态建设 |
| 李四 | E10002 | 技术研发部 | 后端工程师 | 2019-07-22 | 13800138002 | lisi@example.com | 在职 | 北京海淀区中关村软件园A座 | 负责微服务架构 |
| 王五 | E10003 | 产品设计部 | UI设计师 | 2021-01-10 | 13800138003 | wangwu@example.com | 在职 | 北京朝阳区望京SOHO | 主导设计系统 |
| 赵六 | E10004 | 测试部 | 测试工程师 | 2018-11-05 | 13800138004 | zhaoliu@example.com | 离职 | 北京海淀区中关村软件园B座 | 已交接 |
| 孙七 | E10005 | 运维部 | DevOps工程师 | 2022-06-18 | 13800138005 | sunqi@example.com | 在职 | 北京海淀区中关村软件园A座 | 负责CI/CD流程 |
| 周八 | E10006 | 技术研发部 | 全栈工程师 | 2020-09-30 | 13800138006 | zhouba@example.com | 在职 | 北京海淀区中关村软件园A座 | 前后端均可胜任 |
| 吴九 | E10007 | 产品设计部 | 产品经理 | 2017-04-12 | 13800138007 | wujiu@example.com | 在职 | 北京朝阳区望京SOHO | 负责B端产品规划 |
| 郑十 | E10008 | 技术研发部 | 架构师 | 2016-08-25 | 13800138008 | zhengshi@example.com | 在职 | 北京海淀区中关村软件园A座 | 负责技术选型 |

> 操作说明：
> 1. 切换到「可视化表格编辑」模式，可直接点击单元格修改内容
> 2. 横向滚动表格，观察「姓名」列是否保持固定
> 3. 修改内容后，Markdown 源码会自动同步更新

## Markdown 表格语法说明

\`\`\`markdown
| 列1 | 列2 | 列3 |
|-----|-----|-----|
| A   | B   | C   |
\`\`\`

- 使用 \`|\` 分隔列
- 使用 \`|---|\` 定义表头分隔行
- 支持在单元格内使用加粗、斜体等行内样式
`

export default {
  name: 'VueMdEditor',
  data() {
    return {
      mode: 'markdown',
      text: defaultText,
      tableColumns: [],
      tableData: []
    }
  },
  watch: {
    mode(val) {
      if (val === 'visual') {
        this.parseMarkdownTable()
      }
    }
  },
  methods: {
    getColumnWidth(idx, label) {
      if (idx === 0) return 100
      if (label.includes('地址') || label.includes('备注')) return 220
      if (label.includes('邮箱')) return 200
      if (label.includes('日期')) return 110
      if (label.includes('联系方式')) return 130
      return 140
    },

    // 从 Markdown 文本中解析表格数据
    parseMarkdownTable() {
      const lines = this.text.split('\n')
      const columns = []
      const data = []
      let foundTable = false

      for (const rawLine of lines) {
        const line = rawLine.trim()
        if (!line.startsWith('|')) {
          if (foundTable) break
          continue
        }
        foundTable = true

        // 分割单元格，过滤掉首尾空字符串
        const cells = line
          .split('|')
          .map(c => c.trim())
          .filter(c => c !== '')

        if (cells.length === 0) continue

        // 判断是否为分隔行（全由 - : | 空格组成）
        const isSeparator = cells.every(c => /^[-:\s]+$/.test(c))
        if (isSeparator) continue

        if (columns.length === 0) {
          // 表头行
          cells.forEach((label, i) => {
            columns.push({ prop: `col${i}`, label })
          })
        } else {
          // 数据行
          const row = {}
          cells.forEach((cell, i) => {
            row[`col${i}`] = cell
          })
          // 补齐可能缺失的列
          for (let i = cells.length; i < columns.length; i++) {
            row[`col${i}`] = ''
          }
          data.push(row)
        }
      }

      this.tableColumns = columns
      this.tableData = data
    },

    // 根据 tableData 重新生成 Markdown 表格文本
    syncMarkdownFromTable() {
      if (this.tableColumns.length === 0) return

      const lines = this.text.split('\n')
      const newLines = []
      let i = 0
      let tableReplaced = false

      while (i < lines.length) {
        const line = lines[i]
        if (!tableReplaced && line.trim().startsWith('|')) {
          // 生成新表格
          const headerLine = '| ' + this.tableColumns.map(c => c.label).join(' | ') + ' |'
          const separatorLine = '| ' + this.tableColumns.map(() => '------').join(' | ') + ' |'
          const dataLines = this.tableData.map(row => {
            const cells = this.tableColumns.map(c => row[c.prop] || '')
            return '| ' + cells.join(' | ') + ' |'
          })
          newLines.push(headerLine, separatorLine, ...dataLines)
          tableReplaced = true

          // 跳过原表格的所有行
          while (i < lines.length && lines[i].trim().startsWith('|')) {
            i++
          }
        } else {
          newLines.push(line)
          i++
        }
      }

      this.text = newLines.join('\n')
    },

    onCellBlur() {
      this.syncMarkdownFromTable()
    },

    resetContent() {
      this.text = defaultText
      if (this.mode === 'visual') {
        this.parseMarkdownTable()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.vue-md-editor-demo {
  padding: 20px;
  text-align: left;
}

h3 {
  margin: 0 0 16px 0;
  text-align: center;
}

.desc {
  background: #f5f7fa;
  border-left: 4px solid #409eff;
  padding: 12px 16px;
  margin-bottom: 16px;
  border-radius: 0 4px 4px 0;

  p {
    margin: 0 0 8px 0;
    font-weight: 600;
  }

  ul {
    margin: 0;
    padding-left: 20px;
  }

  li {
    margin-bottom: 4px;
    line-height: 1.6;
  }

  code {
    background: rgba(64, 158, 255, 0.1);
    color: #409eff;
    padding: 2px 6px;
    border-radius: 3px;
    font-family: 'Courier New', monospace;
  }
}

.controls {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.mode-panel {
  margin-top: 8px;
}

.visual-mode {
  .el-alert {
    margin-bottom: 12px;
  }

  .table-container {
    border: 1px solid #ebeef5;
    border-radius: 4px;
    overflow: hidden;
  }

  .preview-section {
    margin-top: 20px;

    h4 {
      margin: 0 0 10px 0;
      font-size: 15px;
      color: #303133;
    }
  }
}

/* Markdown 预览区域：横向滚动 + 首列固定 */
.preview-scroll-wrapper {
  overflow-x: auto;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  padding: 16px;
  background: #fff;

  :deep(.vuepress-markdown-body) {
    table {
      display: table;
      width: 100%;
      min-width: 900px;
      margin: 0;
      border-collapse: separate;
      border-spacing: 0;
    }

    th,
    td {
      white-space: nowrap;
    }

    th:first-child,
    td:first-child {
      position: sticky;
      left: 0;
      z-index: 2;
      background: #fff;
      box-shadow: 2px 0 4px rgba(0, 0, 0, 0.08);
    }

    th:first-child {
      background: #f5f7fa;
      z-index: 3;
    }

    tr:nth-child(2n) td:first-child {
      background: #f6f8fa;
    }

    th {
      background: #f5f7fa;
      font-weight: 600;
    }

    td,
    th {
      border: 1px solid #dfe2e5;
    }
  }
}
</style>
