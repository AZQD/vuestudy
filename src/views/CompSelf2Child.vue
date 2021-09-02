<template>
  <div class="box">

    <div class="testBox">
      <div v-for="(item, index) in contentListNew" :key="item.id">
        <span>{{`第${level}层-第${index + 1}条数据`}}</span>
        <button @click="siblingFun(index)">新增同级分组</button>
        <button @click="addChildFun(index)">新增子分组</button>
        <div v-if="item.inner" class="item.inner">
          <detail-content :level='level + 1' :contentList="item.inner" />
        </div>
      </div>
    </div>


  </div>
</template>

<script>

export default {

  name: 'DetailContent',
  props:{
    contentList: {
      type: Array,
      default: function () {
        return []
      }
    },
    level: {
      type: Number
    }
  },
  data() {
    return {
      contentListNew: this.contentList
    }
  },

  created () {
    console.log(this.level);
  },

  methods: {
    // 新增同级分组
    siblingFun(){
      this.contentListNew.push({});
    },
    // 新增子分组
    addChildFun(index){
      if(this.contentListNew[index].inner){
        this.contentListNew[index].inner.push({});
      }else{
        let item = this.contentListNew[index];
        item.inner = [{}]
        this.contentListNew.splice(index, 1, item)
      }
    }
  },
}

</script>

<style lang="scss">

.box {

}
.testBox{
  padding: 20px 0 20px 20px;
  border: 1px solid pink;
}

</style>
