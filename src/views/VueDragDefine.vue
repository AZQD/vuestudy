<template>
  <div>


    <h3>学习重点：vue中自定义可拖拽悬浮组件</h3>
<!--    参考文档：https://www.cnblogs.com/deng-jie/p/16408876.html vue2的写法-->

    <VueDragDefineComp>
      <template slot="test1">
        <div class="content" @click="clickFun">
          <img class="icon" src="../assets/logo.png" alt=""/>
          <span class="text">悬浮按钮</span>
        </div>
      </template>
    </VueDragDefineComp>
  </div>
</template>

<script>
import VueDragDefineComp from './VueDragDefineComp.vue'

export default {
  components: {
    VueDragDefineComp
  },
  data() {
    return {};
  },
  created() {
  },
  methods: {
    clickFun() {
      console.log('clickFun2');
    },
  }
};
</script>
<style scoped lang="scss">
.content {
  position: relative;
  padding: 0.8em;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;

  .icon {
    width: 50px;
    height: 50px;
    background: #716af2;
    box-shadow: 0px 0px 10px 2px #a299ff;
    border-radius: 50%;
  }

  .text {
    color: #919294;
    font-size: 12px;
  }
}
</style>
