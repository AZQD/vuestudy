<template>
  <el-dialog title="dialog子组件详情" :visible.sync="open" width="800" :close-on-click-modal="false" destroy-on-close :before-close="beforeCloseFun">
    content
  </el-dialog>
</template>

<script>
  export default {
    props: {
      open: {
        type: Boolean,
        default: false
      }
    },

    name: 'DialogChild',

    components: {},

    data () {
      return {

      }
    },

    created () {
    },

    methods: {
      beforeCloseFun(){
        this.$emit('update:open', false);
      }
    },
  }

</script>

<style lang="scss" scoped>
</style>