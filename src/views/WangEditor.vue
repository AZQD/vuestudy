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
      editor.config.height = 500; // 设置编辑区域高度为 500px（注意，先配置 height ，再执行 create()）
      editor.create() // 初始化逻辑需要在mounted中执行；
    },

    methods: {},
  }

</script>

<style lang="scss">

  .box {

  }

</style>