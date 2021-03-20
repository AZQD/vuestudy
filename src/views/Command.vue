<template>
  <div class="commandBox">
    <p class="text">hello Command.vue</p>
  </div>
</template>
<script>

  export default {
    // name属性作用：
    // 1.配置<keep-alive>标签的exclude或者include属性做组件筛选
    // 2.DOM做递归组件
    // 3.当你用vue-tools
    name: 'Command',
    components: {
    }
  }

</script>

<style lang="scss">
  .commandBox {
    .text {
      color: pink;
    }
  }
</style>