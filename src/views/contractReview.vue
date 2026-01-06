<template>
  <div class="box">
    <h3>学习重点：百度智能云 智能文档分析平台 - 合同审查</h3>
    <p>参考文档：https://console.bce.baidu.com/textmind/application/textReview/sampleTask</p>
    <div id="jsonId">{{aaa}}</div>
  </div>
</template>
<script>
import textreview from './textreview.json'

  export default {
    name: 'ContractReview',
    components: {
    },

    data(){
      return {
        textreview,
        aaa: "''"
      }
    },

    created(){
      console.log(666, this.textreview);
      this.aaa = JSON.parse(this.textreview)
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

  }
</style>
