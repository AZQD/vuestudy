
<template>
  <div>
    <h3>学习重点：vue中使用vue-drag-resize对元素任意拖拽缩放</h3>

    <div class="dragBox">
      <Vue3DraggableResizable
        v-model:x="left"
        v-model:y="top"
        v-model:w="width"
        v-model:h="height"
        v-model:active="active"
        :draggable="true"
        :resizable="true"
      >
        <h3>Hello World!</h3>
        <p>{{ top }} x {{ left }} </p>
        <p>{{ width }} x {{ height }}</p>
      </Vue3DraggableResizable>
    </div>
  </div>
</template>

<script>
import Vue3DraggableResizable from 'vue3-draggable-resizable'
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'

export default {
  components: {
    Vue3DraggableResizable
  },

  data() {
    return {
      width: 200,
      height: 200,
      top: 100,
      left: 100,
      active: true
    }
  }
}
</script>

<style lang="scss" scoped>

.dragBox {
  position: relative;
  background-color: pink;
  height: 500px;
}
</style>
