<template>
  <div class="block">
    <h3>学习重点：Dialog高度自适应</h3>
    <el-dialog class="abow_dialog" title="提示" :visible.sync="open" width="60%">
      <div style="height: 1000px">这是一段信息</div>
    </el-dialog>
  </div>
</template>

<script>
  export default {

    name: 'DialogHeight',

    data () {
      return {
        open: true
      }
    },

    created () {

    },

    methods: {

    },
  }

</script>

<style lang="scss" scoped>

</style>