<template>
  <div class="box">
    <h1>This is Demo2 page</h1>

    <button @click="toDemo03Fun">push方式跳转到Demo03</button>
    <button @click="toDemo031Fun">push方式跳转到Demo031</button>
    <button @click="toDemo032Fun">replace方式跳转到Demo032</button>
    <br/>
    <button @click="backFun">后退</button>
    <button @click="forwardFun">前进</button>
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
      console.log('this.$route', this.$route);
      console.log('this.$route.params', this.$route.params);
    },

    methods: {
      toDemo03Fun(){
        this.$router.push('/demo03');
      },
      toDemo031Fun(){
        // 带查询参数，变成 /***?a=1
        this.$router.push({ path: '/demo03/demo031', query: { userId: '123' }})
      },
      toDemo032Fun(){
        // 命名的路由：
        // 参考文档：https://router.vuejs.org/zh/guide/essentials/navigation.html
        // replace相当于替换当前路由
        // name字段，也就是src/router/index.js:57里面，对应的Demo032；
        // id这个键名，需要和/demo03/demo032/:id对应；
        this.$router.replace({ name: 'Demo032', params: { id: '123' }});
      },
      backFun(){
        // this.$router.go(-1);
        this.$router.back();
      },
      forwardFun(){
        this.$router.forward();
      }
    },

    // activated 和 deactivated：被keep-alive包裹的组件，特有的两个生命周期；
    activated(){
      console.log('activated，组件激活时调用（包含初始化）');
    },
    deactivated(){
      console.log('deactivated，组件停用时调用');
    },
  }

</script>

<style lang="scss">

  .box {

  }

</style>