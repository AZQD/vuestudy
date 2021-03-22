<template>
  <div class="box">

    <h1>This is Demo05 page</h1>
    <hr>

    <Demo051 :parentMsg="msg">
      <h2>我是h2</h2>

      <!--没有指定名称的插槽，也就是子组件有<slot></slot>才会被渲染-->
      <div>div：{{msg}}</div>

      <template v-slot:default="slotProps">
        slotProps：{{slotProps}}
      </template>

      <template slot="test1">
        <h1>test1 {{msg}}</h1>
      </template>

      <template v-slot:test2>
        <h1>test2</h1>
      </template>

      <template #test3>
        <h1>test3</h1>
      </template>

      <template #test4="childScope">
        <h1>test4 {{childScope.color}} {{childScope.childMsg}}</h1>
      </template>

      <!--#test5 等价于 v-slot:test5-->
      <template #test5="{color}">
        <h1>test5 {{color}}</h1>
      </template>


      <h3>
        总结：
        v-slot用法简记：
        :后面是插槽名称
        =后面是组件内部绑定作用域值得映射

        参考文档：https://www.jianshu.com/p/2e73b8519bc2
      </h3>


    </Demo051>

  </div>
</template>

<script>
  import Demo051 from './Demo051.vue'

  export default {

    name: 'Demo05',

    components: {
      Demo051
    },

    data () {
      return {
        msg: 'parentMsg'
      }
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