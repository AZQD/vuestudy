<template>
  <div class="box">
    Demo02
  </div>
</template>
<script>
  export default {

    name: 'Demo02',

    components: {},

    data () {
      return {}
    },

    created () {
      // console.log('this.$router', this.$router);
      // console.log('this.$route', this.$route);
      console.log('this.$route.params', this.$route.params);
    },

    methods: {},
  }

</script>

<style lang="scss">

  .box {

  }

</style>