<template>
  <div class="box"><!--最外层必须有标签-->
    <h3>学习重点：router-link、router-view、获取参数</h3>
    <p class="text">累加器</p>
    <button v-on:click="sub">-</button>
    <input v-model="number" type="text" />
    <button @click="add">+</button>
  </div>
</template>
<script>

  // name,components,methods为对象，所以需要加冒号，如：name:
  // data、created为函数，所以不需要加冒号，如：data(){}

  export default {
    name: 'Demo01',
    components: {
    },

    beforeRouteEnter (to, from, next) {
      console.log('组件内的守卫：beforeRouteEnter：不可以访问组件实例', this);
      next(vm => {
        // 通过 `vm` 访问组件实例
        console.log('组件内的守卫：beforeRouteEnter：可以访问组件实例', vm);
      });
      // 在渲染该组件的对应路由被 confirm 前调用
      // 不！能！获取组件实例 `this`
      // 因为当守卫执行前，组件实例还没被创建
    },
    beforeRouteUpdate (to, from, next) {
      console.log('组件内的守卫：beforeRouteUpdate', this);
      next();
      // 在当前路由改变，但是该组件被复用时调用
      // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
      // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
      // 可以访问组件实例 `this`
    },
    beforeRouteLeave (to, from, next) {
      console.log('组件内的守卫：beforeRouteLeave', this);
      next();
      // 导航离开该组件的对应路由时调用
      // 可以访问组件实例 `this`
    },

    data(){
      return {
        number: 1
      }
    },

    created(){
      // console.log('this.$router', this.$router);
      console.log('this.$route', this.$route);
      console.log('this.$route.query', this.$route.query);
    },
    methods: {
      sub(){
        console.log('sub');
        this.number --
      },
      add(){
        console.log('add');
        this.number ++
      }
    },
  }

</script>

<style lang="scss">
  .box {
    .text {
      color: pink;
    }
  }
</style>