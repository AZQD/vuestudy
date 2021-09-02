<template>
  <div class="box">

    <h3>学习重点：组件自调用2</h3>
    <hr>
    <CompSelf2Child :contentList="contentList" />


  </div>
</template>

<script>
import CompSelf2Child from './CompSelf2Child'

  export default {

    components: {
      CompSelf2Child
    },
    data() {
      return {
        contentList: [
          {
            id: '001',
            title: '一级标题001',
            inner: [
              {
                id: '00101',
                title: '二级标题00101',
                inner: [
                  { id: '00101a', title: '三级标题00101a' },
                  { id: '00101b', title: '三级标题00101b' }
                ]
              }
            ]
          }
        ]
      }
    },

    created () {
    },

    methods: {
    },
  }

</script>

<style lang="scss">

  .box {
    text-align: left;
  }

</style>
