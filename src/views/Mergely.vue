
<template>
  <div>
    <h3>学习重点：vue中使用mergely.js进行字符串对比</h3>

    <div class="box">
      <div class="mergely-resizer">
        <div id="mergely"></div>
      </div>
    </div>
  </div>
</template>

<script>

// 参考文档：
// 官方文档：https://mergely.com/
// github地址：https://github.com/wickedest/Mergely
// 实现方案：https://blog.csdn.net/qq_33697094/article/details/121767084
// DEMO示例：https://www.jianshu.com/p/8e582a99ea89

import 'codemirror/lib/codemirror.css'
import 'codemirror/lib/codemirror.js'
import 'mergely/lib/mergely.css'
import 'mergely/lib/mergely.js'
import jQuery from 'jquery'

export default {
  data() {
    return {}
  },
  mounted() {
    jQuery(document).ready(function () {
      // 渲染diff界面
      jQuery('#mergely').mergely({
        license: 'lgpl',
        bgcolor: '#bbffaa',
        cmsettings: {
          mode: 'text/html',
          readOnly: true,
          // lineWrapping: true
        },
        lhs: (setValue) => {
          // setValue('the quick red fox\njumped over the hairy dog');
          setValue('<h3>模型详情1</h3>');
        },
        rhs: (setValue) => {
          // setValue('the quick brown fox\njumped over the lazy dogs');
          setValue('<h3>模型详情2</h3>');
        }
      });
    });
  }
}
</script>

<style lang="scss">

.box {
  height: 500px;
  //background-color: pink ;
}

</style>
