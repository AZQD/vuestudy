<template>

  <div class="box">
    <h3>学习重点：多种文件(docx、excel、pdf)预览</h3>
    目前只支持docx文件预览，不支持doc文件。 <br/>
    参考文档：https://501351981.github.io/vue-office/examples/docs/guide/preview-docx.html

    <div class="partItem">
      <el-upload
          :limit="1"
          :file-list="fileList"
          accept=".docx"
          :beforeUpload="beforeUpload"
          action=""
      >
        <el-button size="small" type="warning">点击上传</el-button>
      </el-upload>
      <vue-office-docx :src="src"/>
    </div>

  </div>
</template>

<script>
//引入VueOfficeDocx组件
import VueOfficeDocx from '@vue-office/docx'
//引入相关样式
import '@vue-office/docx/lib/index.css'

export default {
  components: {
    VueOfficeDocx
  },
  data() {
    return {
      src: '',
      fileList: []
    }
  },
  methods: {
    //在beforeUpload中读取文件内容
    beforeUpload(file) {
      let reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = (loadEvent) => {
        let arrayBuffer = loadEvent.target.result;
        this.src = arrayBuffer
      };
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
.box{
  .partItem{
    margin: 20px;
    border: 1px solid red;
  }
}
</style>

