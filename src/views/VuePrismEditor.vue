<template>
  <div>
    <h3>学习重点：prismjs代码块显示</h3>
    <pre class="my-editor"><code class="language-javascript" v-html="highlightedCode"></code></pre>
  </div>
</template>

<script>
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike.js';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css';

export default {
  name: 'VuePrismEditor',
  data() {
    return {
      code: `
      console.log("Hello World"),
      console.log("Hello World"),
      console.log("Hello World"),
      console.log("Hello World"),
      console.log("Hello World"),
      console.log("Hello World"),
      console.log("Hello World"),
      console.log("Hello World"),
      console.log("Hello World"),
      console.log("Hello World"),
      console.log("Hello World"),
      console.log("Hello World"),
      console.log("Hello World"),
      console.log("Hello World"),
      console.log("Hello World"),
      console.log("Hello World"),
      console.log("Hello World"),
      console.log("Hello World"),
      -------------
            console.log("Hello World"),
            console.log("Hello World"),
            console.log("Hello World"),
            console.log("Hello World"),
            console.log("Hello World"),
            console.log("Hello World"),
            console.log("Hello World"),
            console.log("Hello World"),
            console.log("Hello World"),
            console.log("Hello World"),
            console.log("Hello World"),
            console.log("Hello World"),
            console.log("Hello World"),
            console.log("Hello World"),
            console.log("Hello World"),
            console.log("Hello World"),
            console.log("Hello World"),
            console.log("Hello World"),
            console.log("Hello World"),
            console.log("Hello World"),
            console.log("Hello World"),
            console.log("Hello World"),
            console.log("Hello World"),
            console.log("Hello World"),
            console.log("Hello World"),
            console.log("Hello World"),
            console.log("Hello World"),
            console.log("Hello World"),
            console.log("Hello World"),
            console.log("Hello World"),
            console.log("Hello World"),
            console.log("Hello World"),
            console.log("Hello World"),
            console.log("Hello World"),
            console.log("Hello World"),
            console.log("Hello World"),
            console.log("Hello World"),
            console.log("Hello World"),
            console.log("Hello World"),
            console.log("Hello World"),
            console.log("Hello World"),
            console.log("Hello World"),
            console.log("Hello World"),
            console.log("Hello World"),
            console.log("Hello World"),
            console.log("Hello World"),
            console.log("Hello World"),
            console.log("Hello World"),
            console.log("Hello World"),
            console.log("Hello World"),
            console.log("Hello World"),
            console.log("Hello World"),
            console.log("Hello World"),
            console.log("Hello World"),
            console.log("Hello World"),
            console.log("Hello World"),
            console.log("Hello World"),
            console.log("Hello World"),
            console.log("Hello World"),
            console.log("Hello World"),
            console.log("Hello World"),
            console.log("Hello World"),
            console.log("Hello World"),
            console.log("Hello World"),
            console.log("Hello World"),
      --
      `
    }
  },
  computed: {
    highlightedCode() {
      return highlight(this.code, languages.js);
    }
  }
}
</script>

<style lang="scss" scoped>
.my-editor {
  background: #2d2d2d;
  color: #ccc;
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px;
  height: 200px;
  overflow: auto;
  text-align: left;
}
</style>
