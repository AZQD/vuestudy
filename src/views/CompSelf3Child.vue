<template>
  <div>
    <fliterCondition :group-list="item"/>
  </div>
</template>

<script>
import { operator, conditionItem, propItem } from './index';
import { bus } from './bus.js';
import ConditionItem from './condition-item';
export default {
  name: 'FliterCondition',
  components: {
    // 组件内部的内容，在此不做展示
    ConditionItem
  },
  props: {
    // 单个组件的数据结构
    groupList: {
      type: Object,
      default: () => {
        return {
          id: '1',
          index: 1,
          // 单个条件
          conditionList: [],
          children: []
        };
      }
    },
    // 用于判断是不是显示删除条件组
    type: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      activeName: '1',
      condition: 1,
      operator,
      conditionItem,
      propItem
    };
  },
  methods: {
    addCondition (type) {
      // 注册触发事件并传值
      bus.$emit('addCondition', this.groupList.index, this.groupList.id, type);
    },
    deleteCondition (conditionId) {
      // 注册触发事件并传值
      bus.$emit('deleteCondition', this.groupList.index, this.groupList.id, conditionId);
    },
    deleteGroup () {
      // 注册触发事件并传值
      bus.$emit('deleteGroup', this.groupList.index, this.groupList.id);
    }
  }
};
</script>
