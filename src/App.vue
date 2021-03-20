<template>
  <div id="app">
    <div id="nav">

      <!--跳转到制定路由，比a标签好用，有多个属性可以定义-->
      <!--参考文档：https://router.vuejs.org/zh/api/#router-link-->

      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |

      <router-link :to="{ path: '/demo01', query: { a: '1' }}">Demo01</router-link> |
      <!--<router-link replace active-class="active" tag="span" :to="{ path: '/demo01', query: { a: '1' }}">Demo01</router-link>-->

      <router-link :to = "'/demo02/'+type">Demo02</router-link> |
      <!--命名的路由：-->
      <!--// name字段，也就是src/router/index.js:38里面，对应的Demo02；-->
      <!--// type这个键名，需要和/demo02/:type对应；-->
      <!--<router-link :to="{ name: 'Demo02', params: { type: 123 }}">Demo02</router-link>-->

      <router-link to="/demo03">Demo03</router-link> |

    </div>

    <!--参考文档：https://router.vuejs.org/zh/api/#router-view-->
    <!--可以存在多个router-view组件，该组件有一个name属性，表示路由为demo01时，加载的是components里面key为demo01AddComp的组件-->
    <router-view/>
    <!--<router-view name="demo01AddComp"/>-->
  </div>
</template>

<script>
  export default {
    data(){
      return {
        type: 1
      }
    },
  }
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
  .active{
    color: red;
  }
}
</style>
