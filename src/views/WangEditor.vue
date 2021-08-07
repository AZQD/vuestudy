<template>
  <div>
    <h3>学习重点：WangEditor富文本编辑器</h3>
    <div id="div1"></div>
  </div>
</template>

<script>
import E from 'wangeditor'
  export default {

    name: 'WangEditor',

    components: {},

    data () {
      return {}
    },

    created () {

    },

    mounted () {
      const editor = new E('#div1');

      // config写在create上面
      editor.config.height = 500; // 设置编辑区域高度为 500px（注意，先配置 height ，再执行 create()）
      editor.config.zIndex = 500; // 层级
      editor.config.placeholder = '自定义 placeholder 提示文字'; // placeholder
      editor.config.focus = false; // 取消自动 focus
      editor.config.onchange = function (html) { // 监控内容变化
        console.log('获取编辑区内容方式1：', html);
      }
      editor.config.onblur = function (newHtml) {
        console.log('onblur', newHtml) // 获取最新的 html 内容
      }
      editor.config.onfocus = function (newHtml) {
        console.log('onfocus', newHtml) // 获取最新的 html 内容
      }
      // editor.config.menus = ['bold', 'head', 'link', 'italic', 'underline']; // 配置菜单栏，删减菜单，调整顺序（隐藏菜单可设置数组为空）
      // editor.config.excludeMenus = ['emoticon', 'video']; // 配置菜单栏，设置不需要的菜单
      // editor.config.showFullScreen = false // 配置全屏功能按钮是否展示

      // 上传图片：uploadImgShowBase64（base64 格式）和 uploadImgServer（上传图片到服务器）两者不能同时使用！！！
      editor.config.uploadImgShowBase64 = true; // 使用 base64 格式保存图片
      // editor.config.uploadImgServer = '/upload-img'; // 配置 server 接口地址


      editor.create() // 初始化逻辑需要在mounted中执行；

      // console.log('获取编辑区内容方式2：', editor.txt.html()); // 获取html
      // console.log('获取编辑区内容方式3：', editor.txt.text()); // 获取text
      // editor.txt.clear(); // 清空编辑器内容
    },

    methods: {},
  }

</script>

<style lang="scss">

  .box {

  }

</style>