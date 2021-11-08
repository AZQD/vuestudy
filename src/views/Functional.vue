<template>
  <div>
    <h3>学习重点：函数式组件</h3>
    <FunctionalList title="hello" :items="[11, 22]" />
  </div>
</template>

<script>
import FunctionalList from './FunctionalList'
  export default {

    name: 'Functional',

    components: {
      FunctionalList
    },

    data () {
      return {}
    },

    created () {

    },

    methods: {},
  }

</script>

<style lang="scss">

  .box {

  }

</style>
