<template>
  <div class="iframe-child-page">
    <h4>我是 iframe 子页面</h4>

    <div class="ctrl-group">
      <el-input
        v-model="msgToParent"
        placeholder="输入要发送给父页面的消息"
        size="small"
        @keyup.enter="sendToParent"
      />
      <el-button type="primary" size="small" @click="sendToParent"
        >向父页面发送 postMessage</el-button
      >
    </div>

    <div class="log-box">
      <p class="log-title">消息记录（来自父页面）：</p>
      <ul>
        <li v-for="(item, idx) in parentMsgs" :key="idx" class="log-item">
          <el-tag size="small" type="success">收到</el-tag>
          <span>{{ JSON.stringify(item) }}</span>
        </li>
        <li v-if="parentMsgs.length === 0" class="log-empty">
          暂无消息，点击父页面按钮发送
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IframeCommChild',
  data() {
    return {
      msgToParent: '',
      parentMsgs: [],
    }
  },
  mounted() {
    window.addEventListener('message', this.handleMessage)
  },
  beforeUnmount() {
    window.removeEventListener('message', this.handleMessage)
  },
  methods: {
    handleMessage(event) {
      // 生产环境务必校验 event.origin
      // if (event.origin !== 'https://trusted-parent.com') return
      this.parentMsgs.push(event.data)
    },
    sendToParent() {
      const payload = {
        from: 'child',
        time: new Date().toLocaleTimeString(),
        content: this.msgToParent || 'Hello from child!',
      }
      // 向父页面发送消息
      window.parent.postMessage(payload, '*')
      this.msgToParent = ''
    },
  },
}
</script>

<style lang="scss" scoped>
.iframe-child-page {
  padding: 16px;
  font-size: 14px;
  text-align: left;
}

h4 {
  margin: 0 0 12px 0;
  color: #409eff;
}

.ctrl-group {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;

  .el-input {
    flex: 1;
  }
}

.log-box {
  border: 1px solid #ebeef5;
  border-radius: 4px;
  padding: 10px;
  min-height: 100px;

  .log-title {
    margin: 0 0 8px 0;
    font-weight: 600;
    font-size: 13px;
    color: #606266;
  }

  ul {
    margin: 0;
    padding-left: 0;
    list-style: none;
  }

  .log-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 0;
    font-size: 13px;
    border-bottom: 1px dashed #ebeef5;

    &:last-child {
      border-bottom: none;
    }
  }

  .log-empty {
    color: #909399;
    font-size: 13px;
    text-align: center;
    padding: 12px 0;
  }
}
</style>
