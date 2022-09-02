<template>
  <div>
    <el-card class="box-card">
      <fileUpload ref="fileUpload" :ext="ext" :countLimit="5" :tip="tip">aaa</fileUpload>
    </el-card>
  </div>
</template>
<script>
import fileUpload from './upload'
export default{
  name: 'hello',
  components: {fileUpload},
  data(){
    return{
      fileList: [],
      ext: 'png,jpg,jpeg,mp3,mp4,pdf',
      tip: '可上传png/jpg/jpeg/mp3/mp4/pdf，大小不超过200M'
    }
  },
  created(){

  },
  methods: {
    getFileList: function(){
      this.fileList = this.$refs.fileUpload.getFileList();
      console.log(this.fileList);
    }
  }
}
</script>
