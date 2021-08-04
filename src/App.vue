<template>
  <div id="app">

    <el-container>

      <div id="nav">

      </div>

      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1']" router :default-active="$route.path">

          <el-submenu index="1"><!--第一部分-->

            <!--跳转到指定路由，比a标签好用，有多个属性可以定义-->
            <!--参考文档：https://router.vuejs.org/zh/api/#router-link-->

            <!--<router-link to="/">Home</router-link> |

            <router-link :to="{ path: '/demo01', query: { a: '1' }}">Demo01</router-link> |
            &lt;!&ndash;<router-link replace active-class="active" tag="span" :to="{ path: '/demo01', query: { a: '1' }}">Demo01</router-link>&ndash;&gt;

            <router-link :to = "'/demo02/'+type">Demo02</router-link> |
            &lt;!&ndash;命名的路由：&ndash;&gt;
            &lt;!&ndash;// name字段，也就是src/router/index.js:38里面，对应的Demo02；&ndash;&gt;
            &lt;!&ndash;// type这个键名，需要和/demo02/:type对应；&ndash;&gt;
            &lt;!&ndash;<router-link :to="{ name: 'Demo02', params: { type: 123 }}">Demo02</router-link>&ndash;&gt;

            <router-link to="/demo03">Demo03</router-link> |
            <router-link to="/demo04">Demo04</router-link> |
            <router-link to="/demo05">Demo05</router-link> |-->

            <template slot="title"><i class="el-icon-menu"></i>Demo汇总</template>
            <el-menu-item-group>
              <el-menu-item index="/">Home</el-menu-item>
              <el-menu-item index="/demo01" :route="{ path: '/demo01', query: { a: '1' }}">Demo01</el-menu-item>
              <el-menu-item :index="'/demo02/'+type">Demo02</el-menu-item>
              <el-menu-item index="/demo03">Demo03</el-menu-item>
              <el-menu-item index="/demo04">Demo04</el-menu-item>
              <el-menu-item index="/demo05">Demo05 插槽</el-menu-item>
              <el-menu-item index="/cascader">Cascader 级联选择器</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="2"><!--第二部分-->
            <template slot="title"><i class="el-icon-menu"></i>导航二</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="2-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>

        </el-menu>
      </el-aside>

      <el-main>

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

      </el-main>
    </el-container>





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

<!--scoped：样式作用域为当前组件-->
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

  .el-menu-item{
    a{
      display: block;
    }
  }


.el-cascader-panel .el-radio{
  z-index: 10;
  width: 99%;
  height: 99%;
  position: absolute;
  top: 10px;
  right: -12px;
}
.el-cascader-panel .el-radio__input{
  visibility: hidden;
}
.el-cascader-panel .el-cascader-node__postfix{
  top: 10px;
}
</style>
