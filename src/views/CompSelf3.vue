<template>
  <div>
    过滤组件：
    <CompSelf3Child :group-list="listData" />
  </div>
</template>
<script>
import CompSelf3Child from './CompSelf3Child.vue';
const bus = this.$bus;

// 参考文档
// https://blog.csdn.net/qq_41261490/article/details/110931013
// https://blog.csdn.net/weixin_43862492/article/details/99204383
export default {
  components: {
    CompSelf3Child
  },
  data() {
    return {
      listData: {
        id: '1',
        index: 1,
        children: []
      }
    };
  },
  created() {
    bus.$on('addCondition', (index, id, type) => {
      // 添加条件或条件组
      this.addCondition(this.listData, index, id, type);
    });
    bus.$on('deleteCondition', (index, id, conditionId) => {
      // 删除条件
      this.deleteCondition(this.listData, index, id, conditionId);
    });
    bus.$on('deleteGroup', (index, id) => {
      // 删除条件组
      this.deleteGroup(this.listData, index, id);
    });
  },
  beforeDestroy() {
    // 注销监听事件
    bus.$off(['addCondition', 'deleteCondition', 'deleteGroup']);
  }
}
</script>
