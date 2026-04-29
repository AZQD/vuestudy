<template>
  <div class="box">
    <h3>学习重点：XSS</h3>
    <p style="color: red;">安全提示：本页面仅用于演示 XSS 攻击原理及防御方案，请勿在生产环境中直接复制使用。</p>

<!--    <img class="img" src="x" onerror="alert('xss攻击')"><br/>-->

    <h4>未过滤的 v-html（存在 XSS 风险）：</h4>
    <div v-html="xssHtml"></div><br/>
    <h4>使用 $xss 过滤后的 v-html（安全）：</h4>
    <div v-html="$xss(xssHtml)"></div>

<!--    <a href="/functional" target="_blank">百度一下</a>-->
  </div>
</template>
<script>
import xss from 'xss'
import dompurify from 'dompurify'

  export default {
    name: 'Xss',
    data () {
      return {
        xssHtml: `<a onclick='alert("xss攻击");console.log(document.cookie)'>超链接</a>`,
        xssHtml2: `<svg onload=confirm(0)></svg>><>`
      }
    },

    created () {
      console.log(this.$nextTick.toString());
      console.log(0, this.xssHtml2);
      console.log(1, xss(this.xssHtml2));
      console.log(2, dompurify.sanitize(this.xssHtml2));
    },

  }

</script>

<style lang="scss" scoped>
.box{
  .img{
    width: 200px;
    height: 100px;
    display: block;
    margin: 0 auto;
  }
}
</style>
