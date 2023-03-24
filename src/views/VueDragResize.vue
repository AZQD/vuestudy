
<template>
  <div>
    <h3>学习重点：vue中使用vue-drag-resize对元素任意拖拽缩放</h3>

    <div class="dragBox">
      <VueDragResize :isActive="true" v-on:resizing="resize" v-on:dragging="resize" :parentW="20">
        <h3>Hello World!</h3>
        <p>{{ top }} х {{ left }} </p>
        <p>{{ width }} х {{ height }}</p>
      </VueDragResize>
    </div>
  </div>
</template>

<script>

// 参考文档：
// github地址：https://github.com/kirillmurashov/vue-drag-resize
// DEMO示例：https://kirillmurashov.com/vue-drag-resize/

import VueDragResize from 'vue-drag-resize'

export default {
  components: {
    VueDragResize
  },

  data() {
    return {
      width: 0,
      height: 0,
      top: 100,
      left: 100
    }
  },

  methods: {
    resize(newRect) {
      this.width = newRect.width;
      this.height = newRect.height;
      this.top = newRect.top;
      this.left = newRect.left;
    }
  }
}
</script>

<style lang="scss">

.dragBox {
  position: relative;
  background-color: pink;
}

</style>
