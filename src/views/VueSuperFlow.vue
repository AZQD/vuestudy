<template>
  <div class="super-flow-base-demo">
    <h3>学习重点：vue中使用vue-super-flow显示流程图</h3>

<!--    DEMO参考地址：https://blog.csdn.net/cindy6666/article/details/124703192-->
<!--    Vue-super-flow使用说明：https://caohuatao.github.io/guide/#%E4%BB%8B%E7%BB%8D-->

    注意：因为坐标数值是通过接口返回，因此不适合模型管理平台中使用。这个插件适合显示固定的流程图，不适合显示动态的流程图；

    <el-alert
      title="vue-super-flow 暂不支持 Vue 3"
      type="warning"
      :closable="false"
      description="该组件（vue-super-flow v1.x）仅兼容 Vue 2，在 Vue 3 环境下无法运行。如需流程图功能，建议迁移至 @vue-flow/core 等 Vue 3 兼容库。"
      show-icon
    />

  </div>
</template>

<script>
export default {
  name: 'VueSuperFlow',
}
</script>

<style lang="scss" scoped>
.super-flow-base-demo {
  width: 100%;
  margin: 0 auto;
  padding: 20px;
}
</style>
