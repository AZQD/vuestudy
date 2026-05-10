<template>
  <div>
    <h1>{{ title }}</h1>
    <div>
      <p v-for="(item, index) in listData" :key="index">{{ item }}</p>
    </div>
    <el-table :data="listData" border style="width: 100%">
      <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
      <el-table-column prop="modelId" label="模型ID" align="center"></el-table-column>
      <el-table-column prop="modelName" label="模型名称" align="center"></el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template #default="scope">
          <el-button @click="editorFun(scope.row, scope.$index)" type="primary" size="small">编辑</el-button>
          <el-button @click="deleteFun(scope.row, scope.$index)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'FunctionalList',
  props: {
    title: String,
    listData: Array,
    editorFun: Function,
    deleteFun: Function
  }
}
</script>
