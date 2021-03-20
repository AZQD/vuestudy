<template>
  <div class="box"><!--最外层必须有标签-->
    <p class="text">累加器</p>
    <button v-on:click="sub">-</button>
    <input v-model="number" type="text" />
    <button @click="add">+</button>
  </div>
</template>
<script>

  // name,components,methods为对象，所以需要加冒号，如：name:
  // data、created为函数，所以不需要加冒号，如：data(){}

  export default {
    // name属性作用：
    // 1.配置<keep-alive>标签的exclude或者include属性做组件筛选
    // 2.DOM做递归组件
    // 3.当你用vue-tools
    name: 'Demo01',
    components: {
    },

    data(){
      return {
        number: 1
      }
    },

    created(){
      // console.log('this.$router', this.$router);
      // console.log('this.$route', this.$route);
      console.log('this.$route.query', this.$route.query);
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
  .box {
    .text {
      color: pink;
    }
  }
</style>