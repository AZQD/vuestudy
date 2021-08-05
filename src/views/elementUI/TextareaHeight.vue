<template>
  <div class="block">
    <h3>学习重点：Textarea高度自适应</h3>
    <el-input
        type="textarea"
        autosize
        placeholder="请输入内容"
        v-model="textarea1">
    </el-input>
    <div style="margin: 20px 0;"></div>
    <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4}"
        placeholder="请输入内容"
        v-model="textarea2">
    </el-input>
  </div>
</template>

<script>
  export default {

    name: 'TextareaHeight',

    data () {
      return {
        textarea1: '',
        textarea2: ''
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