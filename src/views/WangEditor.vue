<template>
  <div>
    <h3>学习重点：WangEditor富文本编辑器</h3>
    <div id="div1"></div>
  </div>
</template>

<script>
import E from 'wangeditor'
  export default {

    name: 'WangEditor',

    components: {},

    data () {
      return {}
    },

    created () {

    },

    mounted () {
      const editor = new E('#div1');

      // config写在create上面
      editor.config.height = 500; // 设置编辑区域高度为 500px（注意，先配置 height ，再执行 create()）
      editor.config.zIndex = 500; // 层级
      editor.config.placeholder = '自定义 placeholder 提示文字'; // placeholder
      editor.config.focus = false; // 取消自动 focus
      editor.config.onchange = function (html) {
        console.log('获取编辑区内容方式1：', html); // 监控变化
      }

      editor.create() // 初始化逻辑需要在mounted中执行；

      // console.log('获取编辑区内容方式2：', editor.txt.html()); // 获取html
      // console.log('获取编辑区内容方式3：', editor.txt.text()); // 获取text
      // editor.txt.clear(); // 清空编辑器内容
    },

    methods: {},
  }

</script>

<style lang="scss">

  .box {

  }

</style>