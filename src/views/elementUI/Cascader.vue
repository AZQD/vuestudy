<template>
  <div class="block">
    <h3>学习重点：级联选择器</h3>
    <span class="demonstration">单选选择任意一级选项</span>
    <el-cascader
            v-model="defaultVal"
            :options="options"
            :props="{ checkStrictly: true, expandTrigger: 'hover' }"
            clearable
            filterable
            :show-all-levels="false"
            ref="ref_cascader"
            @change="changeFun"
    >
    </el-cascader>
  </div>
</template>

<script>
  import cascaderOptions from '@/data/cascaderOptions.json'

  export default {

    name: 'Cascader',

    data () {
      return {
        defaultVal: 'daohang',
        options: cascaderOptions
      }
    },

    methods: {
      changeFun(val){
        console.log(val);
        this.$refs.ref_cascader.dropDownVisible = false; //  选中后，隐藏选择框
      }
    },
  }

</script>

<style lang="scss" scoped>
</style>
