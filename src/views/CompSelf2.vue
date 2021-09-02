<template>
  <div class="box">

    <h3>学习重点：组件自调用2</h3>
    <hr>
    <CompSelf2Child :contentList="contentList" :level='1' />


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
            data: 'something',
            inner: [
              {
                id: '00101',
                data: 'something',
                inner: [
                  { id: '00101a', data: 'something', },
                  { id: '00101b', data: 'something', }
                ]
              },
              {
                id: '00102',
                data: 'something',
                inner: [
                  { id: '00101a', data: 'something', },
                  { id: '00101b', data: 'something', }
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
