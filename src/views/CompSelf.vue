<template>
  <div class="box">

    <button @click="testFun">组件自调用</button>
    <CompSelf v-if="show"></CompSelf>

  </div>
</template>

<script>

  export default {

    name: 'CompSelf',

    components: {
    },

    data () {
      return {
        show: false
      }
    },

    created () {
    },

    methods: {
      testFun(){
        this.show = true
      }
    },
  }

</script>

<style lang="scss">

  .box {

  }

</style>
