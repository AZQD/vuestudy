<template>
  <div class="box">

    <div class="testBox">
      <button @click="clickFun">新增</button>
      <div v-for="item in contentListNew" :key="item.id">
        <span class="title border-bottom">
          {{item.title}}
        </span>
        <div v-if="item.inner" class="item.inner">
          <detail-content :contentList="item.inner" />
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
    }
  },
  data() {
    return {
      contentListNew: this.contentList
    }
  },

  created () {
  },

  methods: {
    clickFun(){
      this.contentListNew.push(
          {
            inner: [
              {
                id: 'test' + new Date().getTime(),
                title: '新增数据',
              }
            ]
          }
      )
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
