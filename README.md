# vuestudy

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### 官网

[Vue](https://cn.vuejs.org/v2/guide/)
[Vue Router](https://router.vuejs.org/zh/)


### 常见报错总结


```
   1.控制台报错：Maximum call stack size exceeded
   调用栈溢出了，需要检查代码有没有出现死循环调用，或者大量的递归调用。
   
   2.Eslint报错：TypeError: this.CliEngine is not a constructor
   解决方案：https://blog.csdn.net/qq_34817440/article/details/104278778 
```


### 常见问题总结


```

    1.1.Vue中的router-link、router-view作用：参考文件：src/App.vue
    1.2.获取URL的参数，两种方式：1./user/123，2./user?type=123；
    详见：src/App.vue
    参考：https://www.jianshu.com/p/b052fb3c23f1
    
    
    2.this.$router和this.$route的区别；
    this.$route是路由参数对象，所有路由中的参数，name，path，params，query都属于它。
    this.$router 是一个路由（导航对象），用它方便的使用js 代码，实现路由的前进，后退，跳转到新的url地址。
    this.$router常用方法：
    push：跳转新页面，保存上一页记录；例：push('')、push({path:'', query:{a:1}})、push({name:'', params:{a:1}});
    replace：跳转新页面，替换上一页；例：同上；
    go：跳转到指定页面；例：go(-1)、go(1)、go(3)；
    back：返回；back();
    forward：前进；forward();
    参考：https://blog.csdn.net/qq_26030541/article/details/105139797
         https://router.vuejs.org/zh/guide/essentials/navigation.html
         https://router.vuejs.org/zh/api/#router-push
    
    通过router-link跳转，和this.$router跳转逻辑相似，尤其需要记忆"命名的路由"；


    3.router 属性 name的作用：
    (1).使用$router.name获取组件name值；
    (2).通过router-link、this.$router跳转，使用的是"命名的路由"方式，使用name字段；
    参考：https://www.jianshu.com/p/f86fea2cd109
    （该文章说的第一种方式不符；官方的标准描述：<router-view>设置了name名称，则会渲染对应的路由配置中 components 下的相应组件。
    参考：https://router.vuejs.org/zh/api/#router-view-props）
    
    
    4.vue 组件属性 name的作用：
    name属性作用：
    (1).配置<keep-alive>标签的exclude或者include属性做组件筛选
    (2).DOM做递归组件
    (3).用vue-tools调试
    https://cn.vuejs.org/v2/api/#name
    https://blog.csdn.net/kangkang_style/article/details/88689821
    
    
    5.mode: 'history'；// 值为history或hash路由方式是否加#号；
    
    
    6.var vm=new Vue({});
    官网原话：虽然没有完全遵循 MVVM 模型，但是 Vue 的设计也受到了它的启发。因此在文档中经常会使用 vm (ViewModel 的缩写) 这个变量名表示 Vue 实例。
    
    
    7.keep-alive作用；
    参考：src/App.vue:36 
   
   
    8.生命周期；
    参考：src/views/Demo04.vue
    
    
    9.事件调用传参；event使用；
    参考：src/views/Demo04.vue
    
    
    10.常用命令；
    参考：src/views/Demo04.vue
    绑定事件：v-on:click  简写为 @click  @click.stop  @click.prevent  @click.stop.prevent
    @keyup.enter  @keyup.13  v-on:click.once  参考：https://cn.vuejs.org/v2/api/#v-on
    绑定属性：v-bind:src  简写为 :src
    v-if v-else-if v-else
    v-model 数据的双向绑定：表单元素的值，如input，textarea，select；
    
    
    11.class样式用法；
    参考：src/views/Demo04.vue:20
    class类添加data-v；
    
    
    12.导航守卫：导航守卫主要用来通过跳转或取消的方式守卫导航；
    全局前置守卫、全局后置钩子、路由独享的守卫、组件内的守卫；
    参考：src/router/index.js:12；src/views/Demo01.vue:19；
    参考文档：https://router.vuejs.org/zh/guide/advanced/navigation-guards.html
    
    
    13.插槽；
    v-slot:header 可以被重写为 #header
    参考：Demo05.vue
    
    8.引入第三方工具，如vant；
    高阶组件使用：https://www.jianshu.com/p/8b650a0f274a；
    插件；
    vuex;
    
    axios
    https://autumnfish.cn/comment/music?id=186016&limit=1
    https://autumnfish.cn/api/joke/list?num=10
    
    axios.post("https://autumnfish.cn/api/user/reg",{username:"太子殿下"})
    
    mock
    
    vuex
   
```
传统方式：
父子：v-bind属性绑定；
子父：v-on属性绑定；
兄弟：EventBus：
    $on   接收数据的组件
    $emit 发送数据的组件

Vuex：
共享数据存在vuex；私有数据存在组件内即可；

vue ui vue可视化界面

vscode使用


Vuex的核心概念：

一、State
组件访问State中数据的方式：
方式1.this.$store.state.count;
方式2.使用mapState;
...js
   computed(){
    ...mapState(['count']);
   }
...

二、Mutation 用于变更Store中的数据
1.更改Store中的状态的唯一方法；
2.必须是同步的；
3.触发Mutation函数写法：
方式1：
...js
    // 定义
    mutations: {
        add(state){
            state.count ++;
        }
        // 传参
        add2(state, step){
            state.count += step;
        }
    }

    // 业务触发 （commit就是调用mutations里面的函数）
    this.$store.commit('add');
    this.$store.commit('add', 10); // 传参
...

方式2.使用mapMutations：
...js
    // 定义
    mutations: {
        add(state){
            state.count ++;
        }
        // 传参
        add2(state, step){
            state.count += step;
        }
    }

    // 业务触发
    methods: {
        ...mapMutations('add', 'add2');
    }

    this.add();
    this.add2(10); // 传参

...

三、Action 用于处理异步任务；
触发Mutation函数写法：
方式1.
...js
    // 定义：
    actions: {
        addAsync(context){
            setTimeout(() => {
                // 必须通过 context.commit 触发某个 mutation 才行；
                context.commit('add');
            }, 1000);
        }
        // 传参
        addAsync2(context, step){
            setTimeout(() => {
                // 必须通过 context.commit 触发某个 mutation 才行；
                context.commit('add', step);
            }, 1000);
        }
    }

    // 业务触发 （这里的dispatch函数专门用来触发 action）
    this.$store.dispatch('addAsync');
    this.$store.dispatch('addAsync', 10); // 传参
...

方式2.使用mapActions：
...js
    // 定义：
        actions: {
            addAsync(context){
                setTimeout(() => {
                    // 必须通过 context.commit 触发某个 mutation 才行；
                    context.commit('add');
                }, 1000);
            }
            // 传参
            addAsync2(context, step){
                setTimeout(() => {
                    // 必须通过 context.commit 触发某个 mutation 才行；
                    context.commit('add', step);
                }, 1000);
            }
        }

    // 业务触发
    methods: {
        ...mapActions('add', 'add2');
    }

    this.add();
    this.add2(10); // 传参

...

四、Getter 对store的数据起到计算属性作用，不会改变store；
定义：
...js
    // 定义：
    getter: {
        doubleCount(state){
                return state.count * 2
            }
    }
...
触发Getter写法：
方式1.this.$store.getter.名称
方式2.
...js
    computed: {
        ...mapGetters('doubleCount');
    }
...

五、Mudules：分模块管理
...js
    modules: {
        a: moduleA
        b: moduleB
    }
...

组件使用是否必须驼峰；