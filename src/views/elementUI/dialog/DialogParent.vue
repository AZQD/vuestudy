<template>
  <div class="block">
    <h3>学习重点：Dialog组件抽离</h3>
    <el-button type="primary" @click="clickFun">打开Dialog子组件</el-button>
    <DialogChild :open.sync="open" />
  </div>
</template>

<script>
// 参考文档：https://www.cnblogs.com/yeqrblog/p/9141701.html
import DialogChild from "@/views/elementUI/dialog/DialogChild";
  export default {

    name: 'DialogParent',

    components: {
      DialogChild
    },

    data () {
      return {
        open: false
      }
    },

    created () {

    },

    methods: {
      clickFun(){
        this.open = true;
      }
    },
  }

</script>

<style lang="scss" scoped>
</style>