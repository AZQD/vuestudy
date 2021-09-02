<template>
  <div class="testBox">
    <div v-for="(item, index) in listDataNew" :key="item.id">
      <span>{{`第${level}层-第${index}条数据`}}</span>
      <button @click="siblingFun(index)">新增同级分组</button>
      <button @click="addChildFun(index)">新增子分组</button>
      <div v-if="item.children" class="item.children">
        <!--组件自调用，递归嵌套，使用当前组件的name属性即可-->
        <detail-content :level='level + 1' :listData="item.children" />
      </div>
    </div>
  </div>
</template>

<script>

export default {

  name: 'DetailContent',
  props:{
    // 当前组件的数据
    listData: {
      type: Array,
      default: function () {
        return []
      }
    },
    // 当前组件层级
    level: {
      type: Number
    }
  },
  data() {
    return {
      listDataNew: this.listData
    }
  },

  created () {
    console.log('层级：', this.level);
  },

  methods: {
    // 新增同级分组
    siblingFun(){
      this.listDataNew.push({});
    },
    // 新增子分组
    addChildFun(index){
      if(this.listDataNew[index].children){
        this.listDataNew[index].children.push({});
      }else{
        let item = this.listDataNew[index];
        item.children = [{}]
        this.listDataNew.splice(index, 1, item)
      }
    }
  },
}

</script>

<style lang="scss">

.testBox{
  padding: 20px 0 20px 20px;
  border: 1px solid pink;
}

</style>
