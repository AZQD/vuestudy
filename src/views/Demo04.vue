<template>
  <div class="about">
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
    <input type="text" @keyup.enter="submit">
    <input type="text" @keyup.enter.once="submit"><!--执行一次-->
  </div>
</template>

<script>
  export default {

    name: 'Demo04',

    components: {},

    data () {
      return {
        number: 1
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
      }
    },
  }

</script>

<style lang="scss">

  .box {

  }

</style>