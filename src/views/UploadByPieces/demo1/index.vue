<template>
  <el-upload :data="data" action="" :http-request="uploadFile">
    <el-button icon="el-icon-upload2">文件上传</el-button>
  </el-upload>
</template>
<script>
// 引入上传文件方法
import { Loading } from 'element-ui';
import { upload, uploadByPieces } from "./upload.js";
export default {
  data () {
    return {
      data: {}
    }
  },
  methods: {
    async uploadFile({ data, file }) {
      // data是上传时附带的额外参数，file是文件
      let url = "xxx" //上传文件接口
      let loadingInstance = Loading.service({
        text: "正在上传文件，请稍后...",
      });
      try {
        // 如果文件小于5MB，直接上传
        if (file.size < 5 * 1024 * 1024) {
          console.log(11);
          let formData = new FormData();
          for (let key in data) {
            formData.append(key, data[key]);
          }
          formData.append("file", file);

          const res = await upload(url,formData);
          loadingInstance.close();
          return res;
        } else {
          console.log(22);
          // 如果文件大于等于5MB，分片上传
          data.file = file;
          const res = await uploadByPieces(url,data);
          console.log(23456, res);
          loadingInstance.close();
          return res;
        }
      } catch (e) {
        loadingInstance.close();
        return e;
      }
    }
  }
}
</script>
