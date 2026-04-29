<template>
  <div class="box">
    <button @click="testFun">组件自调用</button>
    <CompSelf v-if="show" :depth="depth + 1"></CompSelf>
  </div>
</template>

<script>
  export default {
    name: 'CompSelf',
    props: {
      depth: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        show: false
      }
    },
    methods: {
      testFun(){
        // 限制递归深度，防止栈溢出
        if (this.depth >= 3) {
          alert('已达到最大递归深度（3层），禁止继续嵌套');
          return;
        }
        this.show = true
      }
    },
  }

</script>

<style lang="scss" scoped>

  .box {

  }

</style>
