<template>
  <div class="block">
    <h3>学习重点：el-select数据过多，分页加载的解决方案</h3>

    <el-select v-model="currentChecked" placeholder="请选择" filterable clearable
               @change="handleSelectChange"
               @clear="handleSelectClear"
               v-el-select-loadmore:rangeNumber="loadMore(rangeNumber)"
               :filter-method="filterListDataFun"
    >
      <el-option
          v-for="item in listData_new.slice(0, rangeNumber)"
          :key="item.value"
          :label="item.label"
          :value="item.value">
      </el-option>
    </el-select>

  </div>
</template>

<script>
// 该示例仅展示了单选的情况，多选的情况和这个示例类似
  export default {

    name: 'SelectLoadMore',

    data () {
      return {
        rangeNumber: 30, // 初始化select加载数据条数
        // currentChecked: '', // 选中的数据，无默认值
        currentChecked: 'value100', // 选中的数据，有默认值
        listData: [], // 数据源
        listData_new: [], // 符合匹配条件的数据源
      }
    },

    created () {
      this.getListData();
    },

    methods: {

      loadMore() {
        return () => this.rangeNumber += 5;
      },

      filterListDataFun(query = '') {
        this.listData_new = Object.assign([], this.listData)
        if(query) {
          this.listData_new = this.listData_new.filter(item => {
            if(item.label.includes(query)) {
              return item;
            }
          })
        }
      },

      handleSelectClear() { // 清空后重置列表
        this.listData_new = Object.assign([], this.listData)
      },

      getListData() {
        setTimeout(() => {
          for (let i = 0; i < 1000; i++) {
            this.listData.push({
              label: 'label' + i,
              value: 'value' + i,
            });
            if(this.currentChecked) {
              // 为已选的数据重新排序，把已选的数据放在列表的最前面
              this.listData_new = Object.assign([], this.listData)
              this.listData_new = this.listData_new.sort(item => {
                if (this.currentChecked === item.value) {
                  return -1;
                }else {
                  return 1;
                }
              });
            } else{
              this.listData_new = this.listData;
            }
          }
        }, 1000);
      },

      handleSelectChange(val){
        console.log(val);
        this.$forceUpdate();
      }
    },
  }

</script>
