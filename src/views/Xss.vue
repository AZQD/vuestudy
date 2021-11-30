<template>
  <div class="box">
    <h3>学习重点：XSS</h3>

<!--    <img class="img" src="x" onerror="alert('xss攻击')"><br/>-->

    <div v-html="xssHtml"></div><br/>
    <div v-html="$xss(xssHtml)"></div>

<!--    <a href="/functional" target="_blank">百度一下</a>-->
  </div>
</template>
<script>
import xss from 'xss'
import dompurify from 'dompurify'

  export default {
    name: 'Xss',
    components: {},

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

    methods: {
    },
  }

</script>

<style lang="scss">
.box{
  .img{
    width: 200px;
    height: 100px;
    display: block;
    margin: 0 auto;
  }
}
</style>
