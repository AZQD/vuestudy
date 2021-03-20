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


### 常见问题总结


```
    1.vue 组件属性 name的作用：
    https://cn.vuejs.org/v2/api/#name
    https://blog.csdn.net/kangkang_style/article/details/88689821
```

---

```
    2.router 属性 name的作用：
```

---

```
    3.控制台报错：Maximum call stack size exceeded
    调用栈溢出了，需要检查代码有没有出现死循环调用，或者大量的递归调用。
    
    Eslint报错：TypeError: this.CliEngine is not a constructor
    解决方案：https://blog.csdn.net/qq_34817440/article/details/104278778
```

---

```
    4.1.Vue中的router-link、router-view作用；
    4.2.获取URL的参数，两种方式：1./user/123，2./user?type=123；
    详见：src/App.vue
    参考：https://www.jianshu.com/p/b052fb3c23f1
    
    5.keep-alive作用；
    6.常用命令；
    7.导航守卫；
    8.this.$router和this.$route的区别；
    9.mode: 'history'；// 值为history或hash路由方式是否加#号；
```

---