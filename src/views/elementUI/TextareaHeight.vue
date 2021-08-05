<template>
  <div class="block">
    <h3>学习重点：Textarea高度自适应</h3>

    <!--固定高度-->
    <el-input
        type="textarea"
        rows="2"
        placeholder="请输入内容（固定高度）"
        v-model="textarea1">
    </el-input>

    <div style="margin: 20px 0;"></div>

    <!--高度自适应，有范围-->
    <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 6}"
        placeholder="请输入内容（高度自适应，有范围）"
        v-model="textarea2">
    </el-input>

    <div style="margin: 20px 0;"></div>

    <!--高度自适应，没有范围-->
    <el-input
        type="textarea"
        autosize
        placeholder="请输入内容（高度自适应，没有范围）"
        v-model="textarea3">
    </el-input>

  </div>
</template>

<script>
  //方式1：使用autosize；方式2：使用rows;
  export default {

    name: 'TextareaHeight',

    data () {
      return {
        textarea1: '',
        textarea2: '',
        textarea3: '',
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