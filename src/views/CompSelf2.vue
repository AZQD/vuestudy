<template>
  <div class="box">

    <h3>学习重点：组件自调用2</h3>
    <hr>
    <CompSelf2Child :listData="listData" :level='0' />


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
        listData: [
          {
            id: '001',
            data: 'something',
            children: [
              {
                id: '00101',
                data: 'something',
                children: [
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
