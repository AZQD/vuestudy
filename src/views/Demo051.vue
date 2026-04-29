<template>
  <div class="Demo051">
    <p>This is Demo051 page</p>

    <!--没有指定名称的插槽会被渲染-->
    <slot :parentMsg="parentMsg"></slot>

    <slot name="test1"></slot>
    <slot name="test2">222ssfsds</slot>
    <slot name="test3"></slot>

    <slot name="test4" color="red" :child-msg="msg"></slot>
    <input type="text" v-model="msg">

    <slot name="test5" color="red" :child-msg="msg"></slot>
    <input type="text" v-model="parentMsg">

  </div>
</template>

<script>

  export default {

    name: 'Demo051',

    props:{
      parentMsg: String
    },

    data () {
      return {
        msg: 'childMsg'
      }
    },
  }

</script>

<style lang="scss" scoped>

  .box {

  }

</style>
