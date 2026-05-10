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
      <div class="qr-wrapper">
        <img :src="qrUrl" alt="QR Code" class="qr-img"/>
        <img :src="logoSrc" alt="Logo" class="qr-logo"/>
      </div>
    </el-card>
  </div>
</template>

<script>
import QRCode from 'qrcode'
import logoMargin from '@/assets/logo-margin.png'

export default {
  data() {
    return {
      qrUrl: '',
      logoSrc: logoMargin
    }
  },
  mounted() {
    QRCode.toDataURL('Hello World !', {
      width: 200,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#ffffff'
      }
    }).then(url => {
      this.qrUrl = url
    }).catch(err => {
      console.error('QRCode generate error:', err)
    })
  }
}
</script>

<style lang="scss" scoped>
.box{
  .el-card{
    .el-card__body{
    }
  }
}

.qr-wrapper {
  position: relative;
  display: inline-block;
  width: 200px;
  height: 200px;
}

.qr-img {
  width: 100%;
  height: 100%;
}

.qr-logo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  border-radius: 4px;
  background: #fff;
  padding: 2px;
}
</style>
