<template functional>
  <div v-bind="data.attrs" v-on="listeners">
    <h1>{{ props.title }}</h1>
    <div>
      <p v-for="(item,index) in props.listData" :key="index">{{ item }}</p>
    </div>
    <el-table :data="props.listData" border style="width: 100%">
      <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
      <el-table-column prop="modelId" label="模型ID" align="center"></el-table-column>
      <el-table-column prop="modelName" label="模型名称" align="center"></el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button @click="props.editorFun(scope.row, scope.$index)" type="primary" size="mini">编辑</el-button>
          <el-button @click="props.deleteFun(scope.row, scope.$index)" type="danger" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
