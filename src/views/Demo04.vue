<template>
  <div class="about">
    <h1>This is Demo04 page</h1>

    <input v-model="number" type="text" />
    <button @click="add">+</button>
    <br/>
    <br/>
    <button @click="toHomeFun">通过replace跳转到Home</button>
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
      toHomeFun(){
        // this.$router.replace('/');
        window.location.reload()
      }
    },
  }

</script>

<style lang="scss">

  .box {

  }

</style>