<template>
  <div class="smart-audit-page">
    <div class="mobile-container">
      <!-- 状态栏 -->
      <div class="status-bar">
        <div class="status-left">
          <img class="signal-icon" src="/img/smart-audit/bdc9a2af3840483db94ec90a4d145d93_mergeImage.png" />
          <img class="wifi-icon" src="/img/smart-audit/3b28e6b1f4a940baa0d40a2c2c4b2212_mergeImage.png" />
          <span class="carrier">中国移动</span>
        </div>
        <span class="time">9:41 AM</span>
        <div class="status-right">
          <span class="battery-text">100%</span>
          <img class="battery-icon" src="/img/smart-audit/b6456d832fbd43f3a8c0f68d938d7cd9_mergeImage.png" />
        </div>
      </div>

      <!-- 标题栏 -->
      <div class="header-bar">
        <div class="header-content">
          <img class="back-icon" src="/img/smart-audit/SketchPngbd2624418b664284769a46ba8c2ae7afe90df0ab6ad1420928da03f644411712.png" />
          <span class="header-title">智能审核</span>
          <img class="refresh-icon" src="/img/smart-audit/30f362399dc643acaa0ab03dbe67a30b_mergeImage.png" />
        </div>
        <div class="header-divider"></div>
        <div class="refresh-btn">
          <img src="/img/smart-audit/0cd2d4d6f7b74d578be9761ea1d02b52_mergeImage.png" />
        </div>
      </div>

      <!-- 主内容区 -->
      <div class="main-content">
        <!-- 审核状态 -->
        <div class="audit-status">
          <div class="status-icon"></div>
          <div class="status-text">
            <p class="status-title">正在审核中…</p>
            <p class="status-desc">可点击下方按钮查看审核结果</p>
          </div>
        </div>

        <!-- 进度步骤 -->
        <div class="progress-steps">
          <div class="step-item">
            <img class="step-dot" src="/img/smart-audit/SketchPng1a726e353fc66ebd958d2ccf3f0d5682750bd1b14b8b3a13e7e8d3dd0c00b894.png" />
            <span class="step-name">材料提取</span>
          </div>
          <img class="step-line" src="/img/smart-audit/SketchPng344cff8dd98b8b64b10357d149edddf109be310d2cec239affbd8f909c9ff5b0.png" />
          <div class="step-item">
            <img class="step-dot" src="/img/smart-audit/SketchPng1a726e353fc66ebd958d2ccf3f0d5682750bd1b14b8b3a13e7e8d3dd0c00b894.png" />
            <span class="step-name">内容解析</span>
          </div>
          <img class="step-line" src="/img/smart-audit/SketchPng344cff8dd98b8b64b10357d149edddf109be310d2cec239affbd8f909c9ff5b0.png" />
          <div class="step-item">
            <img class="step-dot active" src="/img/smart-audit/SketchPng42c1e0adedcfa18a714aedcad397fd0ae75986f3ed1c6145f62a8fcd1ac92ed9.png" />
            <span class="step-name active">智能审核</span>
          </div>
        </div>

        <!-- 审核卡片：廉政明白函 -->
        <div class="audit-card">
          <h4 class="card-title">廉政明白函</h4>

          <!-- 表头 -->
          <div class="table-header">
            <span class="col-field">审核要点</span>
            <span class="col-material">材料内容</span>
            <span class="col-system">信贷系统</span>
            <span class="col-result">审核结果</span>
          </div>

          <!-- 表格行 -->
          <div v-for="(item, idx) in auditList" :key="idx" class="table-row">
            <div class="row-main">
              <span class="col-field">{{ item.field }}</span>
              <span class="col-material">{{ item.material }}</span>
              <span class="col-system">{{ item.system }}</span>
              <div class="col-result">
                <span :class="['result-tag', item.consistent ? 'tag-green' : 'tag-red']">
                  {{ item.consistent ? '一致' : '不一致' }}
                </span>
              </div>
            </div>
            <div v-if="idx < auditList.length - 1" class="row-divider"></div>
          </div>
        </div>

        <!-- 底部卡片：资金用途承诺函 -->
        <div class="bottom-card">
          <h4 class="card-title">资金用途承诺函</h4>
          <div class="bottom-placeholder"></div>
        </div>
      </div>
    </div>

    <!-- 说明文档 -->
    <div class="doc-section">
      <h4>页面说明</h4>
      <p>本页面模拟移动端信贷审核结果展示场景，核心设计要点：</p>
      <ul>
        <li><strong>移动端适配：</strong>采用 750px 宽度容器居中，还原手机 App 视觉效果。</li>
        <li><strong>审核进度条：</strong>材料提取 → 内容解析 → 智能审核，当前步骤高亮。</li>
        <li><strong>四栏对比表格：</strong>审核要点 | 材料提取内容 | 信贷系统数据 | 审核结果。</li>
        <li><strong>状态标签：</strong>绿色「一致」、红色「不一致」直观展示比对结果。</li>
        <li><strong>数据来源：</strong>实际项目中上述数据通常由 OCR + NLP 后端接口返回。</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SmartAudit',
  data() {
    return {
      auditList: [
        { field: '机构', material: '**银行股份有限公司焦作分行', system: '焦作分行', consistent: true },
        { field: '产品名称', material: '产品名称', system: '流动资金贷款', consistent: false },
        { field: '合同编号', material: '12045508', system: '12045508', consistent: true },
        { field: '用途', material: '购买小米产品', system: '河南城乡天成贸易有限公司', consistent: true },
        { field: '公司帐户', material: '123456789123456789', system: '123456789123456789', consistent: true },
        { field: '法定代表人\n负责人', material: '某某某', system: '某某某', consistent: true },
        { field: '签订日期', material: '2026/08/14', system: '需为今日及以前', consistent: true },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.smart-audit-page {
  padding: 20px;
  text-align: left;
  overflow-y: auto;
  height: 100%;
}

/* 移动端容器 */
.mobile-container {
  width: 375px;
  margin: 0 auto;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Helvetica Neue', sans-serif;
}

/* 状态栏 */
.status-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 12px;
  background: #fff;
  font-size: 12px;
  color: #030303;

  .status-left {
    display: flex;
    align-items: center;
    gap: 3px;

    .signal-icon { width: 20px; height: 6px; }
    .wifi-icon { width: 13px; height: 6px; }
    .carrier { margin-left: 4px; }
  }

  .time { position: absolute; left: 50%; transform: translateX(-50%); }

  .status-right {
    display: flex;
    align-items: center;
    gap: 3px;

    .battery-icon { width: 26px; height: 11px; }
  }
}

/* 标题栏 */
.header-bar {
  background: #fff;
  position: relative;
  padding-top: 12px;

  .header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    margin-bottom: 11px;

    .back-icon { width: 22px; height: 22px; cursor: pointer; }
    .header-title { font-size: 18px; font-weight: 500; color: #000; }
    .refresh-icon { width: 22px; height: 22px; cursor: pointer; }
  }

  .header-divider {
    height: 1px;
    background: #e8e8e8;
  }

  .refresh-btn {
    position: absolute;
    right: 12px;
    top: 9px;
    width: 84px;
    height: 30px;
    background: url('/img/smart-audit/SketchPng68bdcf0617ff3e08c2f7652fc88edae74e3904af5d611e0f4969aac83f64cace.png') no-repeat;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 10px;

    img { width: 22px; height: 22px; }
  }
}

/* 主内容区 */
.main-content {
  background: url('/img/smart-audit/5605c7c1004c454bba614296ec80cff9_mergeImage.png') no-repeat;
  background-size: cover;
  padding: 20px 12px 55px;
}

/* 审核状态 */
.audit-status {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;

  .status-icon {
    width: 78px;
    height: 78px;
    background: url('/img/smart-audit/2dfa3a68e0fe43e88731728436d4ca1b_mergeImage.png') no-repeat center;
    background-size: contain;
    border-radius: 8px;
  }

  .status-text {
    text-align: center;
    margin-top: 4px;

    .status-title {
      font-size: 18px;
      font-weight: 500;
      color: #292c30;
      margin: 0;
      line-height: 25px;
    }

    .status-desc {
      font-size: 14px;
      color: #72829f;
      margin: 6px 0 0;
      line-height: 20px;
    }
  }
}

/* 进度步骤 */
.progress-steps {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 20px;

  .step-item {
    display: flex;
    align-items: center;
    gap: 6px;

    .step-dot { width: 14px; height: 14px; }
    .step-name {
      font-size: 15px;
      font-weight: 500;
      color: #292c30;
      white-space: nowrap;

      &.active { color: #409eff; }
    }
  }

  .step-line { width: 20px; height: 1px; }
}

/* 审核卡片 */
.audit-card {
  background: #fff;
  border-radius: 12px;
  padding: 10px 10px 15px;
  box-shadow: 0 0 12px rgba(214, 231, 252, 0.15);

  .card-title {
    font-size: 15px;
    font-weight: 500;
    color: #292c30;
    margin: 0 0 8px 3px;
  }
}

/* 表格 */
.table-header {
  display: flex;
  align-items: center;
  background: rgba(205, 218, 245, 0.15);
  border-radius: 8px 8px 0 0;
  padding: 9px 7px 10px;
  font-size: 12px;
  color: #72829f;

  .col-field { width: 60px; flex-shrink: 0; }
  .col-material { flex: 1; text-align: center; }
  .col-system { flex: 1; text-align: center; }
  .col-result { width: 60px; flex-shrink: 0; text-align: center; }
}

.table-row {
  .row-main {
    display: flex;
    align-items: center;
    padding: 10px 7px;
    font-size: 12px;
    color: #292c30;

    .col-field {
      width: 60px;
      flex-shrink: 0;
      white-space: pre-line;
      line-height: 1.4;
    }

    .col-material {
      flex: 1;
      text-align: center;
      padding: 0 4px;
      word-break: break-all;
      line-height: 1.4;
    }

    .col-system {
      flex: 1;
      text-align: center;
      padding: 0 4px;
      word-break: break-all;
      line-height: 1.4;
    }

    .col-result {
      width: 60px;
      flex-shrink: 0;
      display: flex;
      justify-content: center;
    }
  }

  .row-divider {
    height: 1px;
    background: #e8e8e8;
    margin: 0 4px;
  }
}

/* 结果标签 */
.result-tag {
  display: inline-block;
  border-radius: 12px;
  padding: 2px 10px;
  font-size: 12px;
  white-space: nowrap;

  &.tag-green {
    background: rgba(3, 205, 80, 0.07);
    border: 1px solid rgba(3, 205, 80, 0.21);
    color: #51ac77;
  }

  &.tag-red {
    background: rgba(255, 94, 94, 0.07);
    border: 1px solid rgba(255, 94, 94, 0.21);
    color: #ff5e5e;
  }
}

/* 底部卡片 */
.bottom-card {
  background: #fff;
  border-radius: 16px;
  padding: 10px 10px 15px;
  margin-top: 12px;
  box-shadow: 0 0 12px rgba(214, 231, 252, 0.15);

  .card-title {
    font-size: 15px;
    font-weight: 500;
    color: #292c30;
    margin: 0 0 8px 3px;
  }

  .bottom-placeholder {
    height: 60px;
    background: rgba(205, 218, 245, 0.15);
    border-radius: 8px 8px 0 0;
  }
}

/* 说明文档 */
.doc-section {
  max-width: 600px;
  margin: 24px auto 0;
  padding: 16px;
  background: #f5f7fa;
  border-radius: 8px;
  font-size: 13px;
  line-height: 1.8;
  color: #303133;

  h4 {
    margin: 0 0 8px 0;
    font-size: 15px;
    color: #409eff;
  }

  p { margin: 0 0 8px 0; }

  ul {
    margin: 0;
    padding-left: 18px;

    li { margin-bottom: 6px; }
  }
}
</style>
