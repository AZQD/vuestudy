<template>
  <div class="box">

    <div class="testBox">
      <div v-for="(item, index) in contentListNew" :key="item.id">
        <span>{{`第${level}层-第${index + 1}条数据`}}</span>
        <button @click="clickFun(index)">新增子分组</button>
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
    console.log(this.$bus);
  },

  methods: {
    clickFun(index){
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
  border: 1px solid pink;
  //padding: 20px;
  //margin: 10px;
  padding-left: 20px;
}

</style>
