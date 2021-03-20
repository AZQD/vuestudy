<template>
  <div class="commandBox"><!--最外层必须有标签-->
    <p class="text">累加器</p>
    <button v-on:click="sub">-</button>
    <input v-model="number" type="text" />
    <button @click="add">+</button>
  </div>
</template>
<script>

  export default {
    // name属性作用：
    // 1.配置<keep-alive>标签的exclude或者include属性做组件筛选
    // 2.DOM做递归组件
    // 3.当你用vue-tools
    name: 'Command',
    components: {
    },

    data(){
      return {
        number: 1
      }
    },

    created(){
      // console.log(123, this);
      // console.log(123, this.$toast);
      // console.log(123, this.$router.push({ name: "userinfo" }));
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
  .commandBox {
    .text {
      color: pink;
    }
  }
</style>