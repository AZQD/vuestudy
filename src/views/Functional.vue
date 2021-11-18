<template>
  <div>
<!--    <h3>学习重点：函数式组件</h3>-->
    <FunctionalList title="函数式组件" :listData="listData" :editorFun="editorFun" :deleteFun="deleteFun" />
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
      return {
        listData: [
          {
            modelId: 'modelId1',
            modelName: '模型A',
          },
          {
            modelId: 'modelId2',
            modelName: '模型B',
          },
          {
            modelId: 'modelId3',
            modelName: '模型C',
          }
        ]
      }
    },

    created () {

    },

    methods: {
      editorFun(row, index) {
        console.log('编辑：', row, index);
        alert(row.modelName);
      },
      deleteFun(row, index) {
        console.log('删除：', row, index);
        this.listData.splice(index, 1);
      }
    },
  }

</script>

<style lang="scss">

  .box {

  }

</style>
