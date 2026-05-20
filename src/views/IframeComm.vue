
<template>
  <div class="iframe-comm-demo">
    <h3>学习重点：iframe 父子页面通信</h3>

    <div class="section">
      <p class="intro">
        iframe 是嵌入外部页面的常用手段，但父子页面运行在不同上下文（window）中，无法直接访问彼此的 DOM 或变量。
        <strong>postMessage</strong> 是 HTML5 提供的跨文档通信标准 API，支持同域和跨域场景。
      </p>
    </div>

    <div class="section">
      <h4>一、核心 API 说明</h4>
      <div class="code-block">
        <p><strong>1. 父页面 → 子页面</strong></p>
        <pre><code>// 父页面中，获取 iframe 的 contentWindow，调用 postMessage
iframeElement.contentWindow.postMessage(data, targetOrigin);</code></pre>
      </div>
      <div class="code-block">
        <p><strong>2. 子页面 → 父页面</strong></p>
        <pre><code>// 子页面中，通过 window.parent 向父页面发送消息
window.parent.postMessage(data, targetOrigin);</code></pre>
      </div>
      <div class="code-block">
        <p><strong>3. 接收消息（父子均适用）</strong></p>
        <pre><code>window.addEventListener('message', (event) => {
  // 生产环境务必校验 event.origin，防止恶意页面注入
  if (event.origin !== 'https://trusted-domain.com') return;

  console.log('收到消息：', event.data);
});</code></pre>
      </div>
    </div>

    <div class="section">
      <h4>二、交互演示</h4>
      <p class="tip">
        下方 iframe 加载了本项目的子页面（同域），你可以在两个区域之间发送消息：
      </p>

      <div class="parent-ctrl">
        <el-input
          v-model="msgToChild"
          placeholder="输入要发送给 iframe 子页面的消息"
          size="small"
          @keyup.enter="sendToChild"
        />
        <el-button type="primary" size="small" @click="sendToChild">
          向子页面发送 postMessage
        </el-button>
      </div>

      <div class="iframe-wrapper">
        <iframe ref="childIframe" :src="childUrl" frameborder="0"></iframe>
      </div>

      <div class="log-box">
        <p class="log-title">父页面收到的消息（来自子页面）：</p>
        <ul>
          <li v-for="(item, idx) in childMsgs" :key="idx" class="log-item">
            <el-tag size="small" type="success">收到</el-tag>
            <span>{{ JSON.stringify(item) }}</span>
          </li>
          <li v-if="childMsgs.length === 0" class="log-empty">
            暂无消息，点击上方按钮或在 iframe 内发送
          </li>
        </ul>
      </div>
    </div>

    <div class="section">
      <h4>三、关键注意点</h4>
      <ul class="notice-list">
        <li>
          <strong>targetOrigin：</strong>建议始终指定具体域名（如 <code>'http://localhost:8080'</code>），而非 <code>'*'</code>，防止中间人攻击。
        </li>
        <li>
          <strong>event.origin 校验：</strong>接收端收到消息后，第一件事就是校验来源域名，过滤不可信域名的消息。
        </li>
        <li>
          <strong>JSON 序列化：</strong><code>postMessage</code> 传输的数据会被结构化克隆，支持对象、数组等，但函数和 DOM 节点不可传递。
        </li>
        <li>
          <strong>同域 shortcut：</strong>若父子页面完全同域，也可以直接通过 <code>iframe.contentWindow.someVar</code> 互相访问，但不推荐，耦合度过高。
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IframeComm',
  data() {
    return {
      msgToChild: '',
      childMsgs: [],
    }
  },
  computed: {
    childUrl() {
      // 子页面使用当前 origin + 路由路径，保证同域
      return window.location.origin + '/iframeCommChild'
    },
  },
  mounted() {
    window.addEventListener('message', this.handleMessage)
  },
  beforeUnmount() {
    window.removeEventListener('message', this.handleMessage)
  },
  methods: {
    handleMessage(event) {
      // 过滤来自当前 iframe 子页面的消息
      const iframeOrigin = new URL(this.childUrl).origin
      if (event.origin !== iframeOrigin) return

      this.childMsgs.push(event.data)
    },
    sendToChild() {
      const iframe = this.$refs.childIframe
      if (!iframe || !iframe.contentWindow) return

      const payload = {
        from: 'parent',
        time: new Date().toLocaleTimeString(),
        content: this.msgToChild || 'Hello from parent!',
      }

      // 向子页面发送消息，targetOrigin 使用具体域名更安全
      iframe.contentWindow.postMessage(payload, window.location.origin)
      this.msgToChild = ''
    },
  },
}
</script>

<style lang="scss" scoped>
.iframe-comm-demo {
  padding: 20px;
  text-align: left;
}

h3 {
  margin: 0 0 16px 0;
  text-align: center;
}

.section {
  margin-bottom: 24px;
}

.intro {
  background: #f5f7fa;
  border-left: 4px solid #409eff;
  padding: 12px 16px;
  border-radius: 0 4px 4px 0;
  margin: 0;
  line-height: 1.8;
}

h4 {
  margin: 0 0 12px 0;
  font-size: 16px;
  color: #303133;
}

.code-block {
  background: #f8f9fa;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  padding: 12px 16px;
  margin-bottom: 12px;

  p {
    margin: 0 0 8px 0;
    font-weight: 600;
    font-size: 14px;
  }

  pre {
    margin: 0;
    padding: 10px;
    background: #282c34;
    color: #abb2bf;
    border-radius: 4px;
    font-size: 13px;
    line-height: 1.6;
    overflow-x: auto;
  }

  code {
    font-family: 'Courier New', monospace;
  }
}

.tip {
  color: #606266;
  margin: 0 0 12px 0;
}

.parent-ctrl {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;

  .el-input {
    flex: 1;
    max-width: 400px;
  }
}

.iframe-wrapper {
  border: 2px solid #409eff;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 12px;

  iframe {
    width: 100%;
    height: 280px;
    display: block;
  }
}

.log-box {
  border: 1px solid #ebeef5;
  border-radius: 4px;
  padding: 12px;
  background: #fff;

  .log-title {
    margin: 0 0 8px 0;
    font-weight: 600;
    font-size: 14px;
    color: #303133;
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
    padding: 6px 0;
    font-size: 13px;
    border-bottom: 1px dashed #ebeef5;

    &:last-child {
      border-bottom: none;
    }

    span {
      color: #606266;
    }
  }

  .log-empty {
    color: #909399;
    font-size: 13px;
    text-align: center;
    padding: 16px 0;
  }
}

.notice-list {
  margin: 0;
  padding-left: 20px;

  li {
    margin-bottom: 10px;
    line-height: 1.7;
    color: #303133;
  }

  code {
    background: rgba(64, 158, 255, 0.1);
    color: #409eff;
    padding: 2px 6px;
    border-radius: 3px;
    font-family: 'Courier New', monospace;
  }
}
</style>
