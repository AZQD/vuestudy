<template>
  <div class="box">

    <h3>学习重点：组件自调用2</h3>
    <hr>
    <CompSelf2Child :listData="listData" :level='0' />


  </div>
</template>

<script>
// 组件子调用参考：https://blog.csdn.net/qq_41261490/article/details/110931013
// EventBus参考：https://blog.csdn.net/weixin_43862492/article/details/99204383

import CompSelf2Child from './CompSelf2Child'

  export default {

    components: {
      CompSelf2Child
    },
    data() {
      return {
        listData: [
          {
            id: '1',
            value: 'something',
            children: [
              {
                id: '101',
                value: 'something',
                children: [
                  { id: '10101', value: 'something', },
                  { id: '10102', value: 'something', }
                ]
              }
            ]
          }
        ]
      }
    },

    created () {
      // 注册监听事件
      this.$bus.$on('showNewListData', (level, index) => {
        console.log(`点击了：第${level}层-第${index}条数据`);
        console.log('最近数组为：', this.listData);
      });
    },

    methods: {
    },

    beforeDestroy() {
      // 注销监听事件
      this.$bus.$off(['showNewListData']);
    }
  }

</script>

<style lang="scss">

  .box {
    text-align: left;
  }

</style>
