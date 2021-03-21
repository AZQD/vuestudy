<template>
  <div class="box">
    <h1>This is Demo04 page</h1>

    <input v-model="number" type="text" />
    <button @click="add">+</button>
    <br/>
    <br/>
    <button @click="fun1">触发事件（不传参）</button>
    <button @click="fun2(123)">触发事件（传参）</button>
    <button @click="fun3($event, 123)">触发事件（event、传参）</button>

    <br/>
    <br/>
    <input type="text" @keyup.enter="submit" placeholder="回车执行多次">
    <input type="text" @keyup.enter.once="submit" placeholder="回车只执行一次">

    <br/>
    <br/>
    <!--动态更新class样式：-->
    <button :class="isActive1 ? 'active1' : ''" @click="changeClassFun1">更新样式1：三元表达式</button>
    <br/>
    <button :class="{active1: isActive2}" @click="changeClassFun2">更新样式2：直接通过{}绑定一个类</button>
    <br/>
    <button :class="{active31: isActive31, active32: isActive32}" @click="changeClassFun3">更新样式3：可以通过判断，传入多个值</button>
    <br/>
    <button class="normal4" :class="{active4: isActive4}" @click="changeClassFun4">更新样式4：和普通的类存在，并不冲突</button>
    <br/>
    <button :class="computedActive5">更新样式5：过于复杂，可以放在methods或者computed中，computedActive5是一个计算属性</button>
  </div>
</template>

<script>
  export default {

    name: 'Demo04',

    components: {},

    data () {
      return {
        number: 1,

        isActive1: false,
        isActive2: false,
        isActive31: false,
        isActive32: false,
        isActive4: false,
      }
    },

    // vue组件常用生命周期；
    beforeCreate () {
      console.log('Demo4 beforeCreate');
    },
    created () {
      console.log('Demo4 created', this.$el);
    },

    beforeMount () {
      console.log('Demo4 beforeMount');
    },
    mounted () {
      console.log('Demo4 mounted', this.$el);
    },

    beforeUpdate () {
      console.log('Demo4 beforeUpdate');
    },
    updated () {
      console.log('Demo4 updated');
    },

    beforeDestory () {
      console.log('Demo4 beforeDestory');
    },
    // 一般用于清空数据，清除定时器，清除绑定事件等
    destoryed () {
      console.log('Demo4 destoryed');
    },

    methods: {
      add(){
        console.log('add');
        this.number ++
      },

      fun1(e){
        console.log('fun1', e);
      },

      fun2(params){
        console.log('fun2', params);
      },

      fun3(e, params){
        console.log('fun3-e', e);
        console.log('fun3-params', params);
      },


      submit(){
        console.log('提交');
      },


      changeClassFun1(){
        this.isActive1 = !this.isActive1;
      },
      changeClassFun2(){
        this.isActive2 = !this.isActive2;
      },
      changeClassFun3(){
        this.isActive31 = !this.isActive31;
        this.isActive32 = !this.isActive32;
      },
      changeClassFun4(){
        this.isActive4 = !this.isActive4;
      }
    },

    computed: {
      computedActive5: function () {
        return {
          active5: this.isActive1 && this.isActive2 && this.isActive31 && this.isActive32 && this.isActive4
        }
      }
    }
  }

</script>

<style lang="scss">

  .box {

    .active1, .active2{
      background-color: pink;
    }
    .active31{
      color: red;
    }
    .active32{
      background-color: pink;
    }
    .normal4{
      color: red;
    }
    .active4{
      background-color: pink;
    }
    .active5{
      background-color: pink;
    }
  }

</style>