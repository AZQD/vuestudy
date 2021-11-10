<template>
  <div class="box">
    <h3>学习重点：XSS</h3>

    <img class="img" src="x" onerror="console.log(2)"><br/>

    <div v-html="xssHtml"></div><br/>

    <div v-html="$xss(xssHtml)"></div>
  </div>
</template>
<script>

  export default {
    name: 'Xss',
    components: {},

    data () {
      return {
        xssHtml: `<a onclick='alert("xss攻击")'>超链接</a>`
      }
    },

    created () {

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
