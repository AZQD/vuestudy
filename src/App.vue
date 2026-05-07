<template>
  <div id="app">

    <el-container>

      <div id="nav">

      </div>

      <el-aside :width="isCollapse ? '64px' : '200px'" class="sidebar">
        <div class="collapse-btn" @click="toggleCollapse">
          <i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
        </div>
        <div class="menu-wrapper">
          <el-menu
            ref="menu"
            :default-active="$route.path"
            :collapse="isCollapse"
            :collapse-transition="false"
            unique-opened
            router
          >

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

              <template slot="title"><i class="el-icon-menu"></i>Vue基础总结</template>
              <el-menu-item index="/">Home</el-menu-item>
              <el-menu-item index="/demo01" :route="{ path: '/demo01', query: { a: '1' }}">Demo01</el-menu-item>
              <el-menu-item :index="'/demo02/'+type">Demo02</el-menu-item>
              <el-menu-item index="/demo03">Demo03</el-menu-item>
              <el-menu-item index="/demo04">Demo04</el-menu-item>
              <el-menu-item index="/demo05">Demo05 插槽</el-menu-item>
              <el-menu-item index="/compSelf">组件自调用</el-menu-item>
              <el-menu-item index="/compSelf2">组件自调用2</el-menu-item>
              <el-menu-item index="/functional">函数式组件</el-menu-item>
              <el-menu-item index="/xss">XSS</el-menu-item>
              <el-menu-item index="/contractReview">ContractReview</el-menu-item>
              <el-menu-item index="/vueOfficeDocx">VueOfficeDocx</el-menu-item>
              <el-menu-item index="/vueOfficeExcel">VueOfficeExcel</el-menu-item>
              <el-menu-item index="/vueMammoth">VueMammoth</el-menu-item>
              <el-menu-item index="/vueQr">VueQr</el-menu-item>
            </el-submenu>

            <el-submenu index="2"><!--第二部分-->
              <template slot="title"><i class="el-icon-menu"></i>ElementUI总结</template>
              <el-menu-item index="/cascader">Cascader级联选择器</el-menu-item>
              <el-menu-item index="/dialogParent">Dialog组件抽离</el-menu-item>
              <el-menu-item index="/dialogHeight">Dialog高度自适应</el-menu-item>
              <el-menu-item index="/textareaHeight">Textarea高度自适应</el-menu-item>
              <el-menu-item index="/selectLoadMore">SelectLoadMore</el-menu-item>
              <el-menu-item index="/tableTest">Table表格</el-menu-item>
            </el-submenu>


            <el-submenu index="3"><!--第二部分-->
              <template slot="title"><i class="el-icon-menu"></i>WangEditor总结</template>
              <el-menu-item index="/wangEditor">WangEditor富文本</el-menu-item>
              <el-menu-item index="/wangEditor2">dialog中的WangEditor富文本</el-menu-item>
            </el-submenu>

            <el-submenu index="4"><!--第二部分-->
              <template slot="title"><i class="el-icon-menu"></i>导航菜单</template>
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

            <el-submenu index="5">
              <template slot="title"><i class="el-icon-menu"></i>上传与代码</template>
              <el-menu-item index="/uploadByPieces/demo1">分片上传 Demo1</el-menu-item>
              <el-menu-item index="/uploadByPieces/demo2">分片上传 Demo2</el-menu-item>
              <el-menu-item index="/vuePrismEditor">代码高亮</el-menu-item>
            </el-submenu>

            <el-submenu index="6">
              <template slot="title"><i class="el-icon-menu"></i>可视化与对比</template>
              <el-menu-item index="/vueSuperFlow">流程图-super-flow</el-menu-item>
              <el-menu-item index="/antvX6Bpmn">流程图-AntV X6 BPMN</el-menu-item>
              <el-menu-item index="/antvX6FlowDesign">流程图-AntV X6 设计</el-menu-item>
              <el-menu-item index="/mergely">文本对比</el-menu-item>
            </el-submenu>

            <el-submenu index="7">
              <template slot="title"><i class="el-icon-menu"></i>拖拽交互</template>
              <el-menu-item index="/vueDragResize">拖拽缩放-组件</el-menu-item>
              <el-menu-item index="/vueDragDefine">拖拽缩放-自定义</el-menu-item>
            </el-submenu>

          </el-menu>
        </div>
      </el-aside>

      <el-main class="main-content">

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

        <!--(方式2).使用新增属性include(包含)/exclude(不包含)-->
        <!--只包含Demo02，其他不使用keep-alive；（Demo02为该组件内定义的name（这里一定要注意！！！），文件位置：src/views/Demo02.vue:16）-->

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
const MENU_ROUTE_MAP = {
  '1': ['/', '/demo01', '/demo02', '/demo03', '/demo04', '/demo05', '/compSelf', '/compSelf2', '/functional', '/xss', '/contractReview', '/vueOfficeDocx', '/vueOfficeExcel', '/vueMammoth', '/vueQr'],
  '2': ['/cascader', '/dialogParent', '/dialogHeight', '/textareaHeight', '/selectLoadMore', '/tableTest'],
  '3': ['/wangEditor', '/wangEditor2'],
  '5': ['/uploadByPieces/demo1', '/uploadByPieces/demo2', '/vuePrismEditor'],
  '6': ['/vueSuperFlow', '/antvX6Bpmn', '/antvX6FlowDesign', '/mergely'],
  '7': ['/vueDragResize', '/vueDragDefine']
}

export default {
  data(){
    return {
      type: 1,
      isCollapse: false
    }
  },
  methods: {
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    getMatchedMenu(path) {
      for (const [index, paths] of Object.entries(MENU_ROUTE_MAP)) {
        if (paths.some(p => path === p || path.startsWith(p + '/'))) {
          return index
        }
      }
      return null
    }
  },
  created(){
    console.log('App.vue ---- created');
    this.$router.onReady(() => {
      this.$nextTick(() => {
        const menu = this.$refs.menu
        if (menu) {
          const matched = this.getMatchedMenu(this.$route.path)
          menu.openedMenus = matched ? [matched] : []
        }
      })
    })
  }
}
</script>

<!--scoped：样式作用域为当前组件-->
<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  overflow: hidden;
}

#app > .el-container {
  height: 100%;
}

.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.sidebar {
  color: #333;
  background-color: rgb(238, 241, 246);
  display: flex;
  flex-direction: column;
  transition: width 0.3s;
  overflow: hidden;
}

.collapse-btn {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: rgb(238, 241, 246);
  border-bottom: 1px solid #e6e6e6;
  flex-shrink: 0;

  i {
    font-size: 18px;
    color: #606266;
  }

  &:hover i {
    color: #409EFF;
  }
}

.menu-wrapper {
  flex: 1;
  overflow-y: auto;
}

.menu-wrapper::-webkit-scrollbar {
  width: 6px;
}

.menu-wrapper::-webkit-scrollbar-thumb {
  background-color: #c0c4cc;
  border-radius: 3px;
}

.menu-wrapper::-webkit-scrollbar-track {
  background-color: transparent;
}

.main-content {
  overflow-x: hidden;
  overflow-y: auto;
}

.el-menu {
  border-right: none;
}

/* 一级菜单图标统一对齐 */
.el-submenu__title i {
  display: inline-block;
  width: 20px;
  text-align: center;
  margin-right: 8px;
}

/* 二级菜单项缩进 */
.el-submenu .el-menu-item {
  padding-left: 50px !important;
}

/* 三级菜单项缩进（嵌套 submenu 内的 item） */
.el-submenu .el-submenu .el-menu-item {
  padding-left: 70px !important;
}

/* 分组标题与二级菜单对齐 */
.el-menu-item-group__title {
  padding-left: 50px !important;
}

.el-menu-item{
  a{
    display: block;
  }
}
</style>
