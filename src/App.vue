<template>
  <div id="app">
    <div id="nav">
      <el-button type="success">成功按钮</el-button>

      <!--跳转到指定路由，比a标签好用，有多个属性可以定义-->
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
      <router-link to="/demo04">Demo04</router-link> |
      <router-link to="/demo05">Demo05</router-link> |

    </div>

    <!--参考文档：https://router.vuejs.org/zh/api/#router-view-->
    <!--可以存在多个router-view组件，该组件只有一个name属性，表示路由为demo01时，加载的是components里面key为demo01AddComp的组件-->
    <!--<router-view/>-->
    <!--<router-view name="demo01AddComp"/>-->

    <!--
    keep-alive：缓存组件,避免多次加载相应的组件,减少性能消耗；
    被 keep-alive 包裹的组件被缓存之后有两个独有的生命周期： activated 和 deactivated。
    activated 生命周期在组件激活时调用（包含初始化）、deactivated 生命周期在组件停用时调用。
    参考文档：https://www.jianshu.com/p/e565cfef48e7
    https://www.jb51.net/article/179487.htm
    -->

    <!--keep-alive的两种使用方式：-->
    <!--(方式1)：使用router.meta属性；如对/demo02路由配置meta.keepAlive为true，即缓存该组件-->
    <!--
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/>
    -->

    <!--(方式2).使用新增属性inlcude(包含)/exclude(不包含)-->
    <!--只包含Demo02，其他不使用keep-alive；（Demo02为该组件内定义的name，文件位置：src/views/Demo02.vue:16）-->

    <!--include和exclude属性允许组件有条件地缓存。二者都可以用逗号分割字符串、正则表达式、数组等三种方式。-->
    <!--如include="Demo01,Demo02"、:include="/Demo01|Demo02/"、:include="['Demo01', 'Demo02']"-->
    <keep-alive include="Demo01,Demo02">
      <router-view/>
    </keep-alive>
    <!--不包含Demo02，其他都使用keep-alive；-->
    <!--<keep-alive exclude="Demo02">
      <router-view/>
    </keep-alive>-->
  </div>
</template>

<script>
  export default {
    data(){
      return {
        type: 1
      }
    },
    created(){
      console.log('App.vue ---- created');
    }
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
