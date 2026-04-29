<template>
  <div class="box">

    <h3>学习重点：Vue项目中生成二维码</h3>
    参考文档：
    https://developer.aliyun.com/article/1269811 <br/>
    https://blog.csdn.net/gitblog_01064/article/details/154975103

    <br/>
    <br/>
    注意点：
    中间带logo的二维码，如果logo周边想要留白，强烈不要使用logo-margin属性。
    如果使用logo-margin属性，手机直接扫描二维码可以识别，但是从相册识别却不行。
    推荐方式：
    不适用logo-margin属性，而是编辑logo图片，周边留白，即可！

    <el-card>
      <VueQr
          :text="`Hello World !`"
          :size="200"
          :logo-src="require(`@/assets/logo-margin.png`)"
      />
    </el-card>
  </div>
</template>

<script>
import VueQr from 'vue-qr';

export default {
  components: {
    VueQr
  },
};
</script>

<style lang="scss" scoped>
.box{
  .el-card{
    .el-card__body{
    }
  }
}
</style>
