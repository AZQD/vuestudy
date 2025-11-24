<template>
  <div class="box">

    <h3>学习重点：Vue项目中使用mammoth库来转换Word文档(.doc、.docx)为HTML</h3>
    参考文档：https://www.npmjs.com/package/mammoth

    <el-card>
      <span>第一种方式：</span>
      <el-upload
          action="#"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="handleLocalDoc">
        <el-button size="small" type="primary">转换本地文件</el-button>
      </el-upload>
    </el-card>
    <br>

    <el-card>
      <span>第二种方式：</span>
      <el-button size="small" type="primary" @click="handleOnlineDoc">转换外部文件</el-button>
    </el-card>

    <div v-html="htmlContent"></div>
  </div>
</template>

<script>
import mammoth from "mammoth";
import axios from "axios";

// 在Node.js环境中，mammoth.convertToHtml方法可以直接传path参数；
// 在浏览器环境中，需要将docx文件转化为arrayBuffer数组再传递给mammoth.convertToHtml方法；

export default {
  data() {
    return {
      htmlContent: ''
    };
  },
  methods: {

    // 第一种方式：预览本地文件
    handleLocalDoc(file){
      console.log('预览本地文件-file:', file);
      this.arrayBufferFun(file.raw);
    },

    // 第二种方式：预览外部文件
    handleOnlineDoc(){
      axios({
        url: 'http://static.shanhuxueyuan.com/test.docx',
        // url: 'https://501351981.github.io/vue-office/examples/dist/static/test-files/test.docx',
        method: "get",
        responseType: 'blob',
      }).then(res => {
        console.log('预览外部文件-res:', res);
        this.arrayBufferFun(res.data);
      }).catch(err => {
        console.log('err', err);
      })
    },

    // 文件转化成arrayBuffer数据类型
    arrayBufferFun(fileData){
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        const arrayBuffer = loadEvent.target.result;
        console.log('arrayBuffer:', arrayBuffer);
        this.convertWordToHtml(arrayBuffer);
      };
      reader.readAsArrayBuffer(fileData); // 开始读取指定的Blob中的内容, 读取后数据格式为ArrayBuffer类型
    },

    // 转换为HTML格式
    async convertWordToHtml(arrayBuffer) {
      try {
        const result = await mammoth.convertToHtml({ arrayBuffer });
        console.log('convertToHtml:', result);
        this.htmlContent = result.value;
      } catch (err) {
        console.error(err);
      }
    },
  }
};
</script>

<style lang="scss">
.box{
  .el-card{
    .el-card__body{
      div{
        display: inline-block;
      }
    }
  }
}
</style>
