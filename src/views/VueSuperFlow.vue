<template>
  <div class="super-flow-base-demo">
    <h3>学习重点：vue中使用vue-super-flow显示流程图</h3>

<!--    DEMO参考地址：https://blog.csdn.net/cindy6666/article/details/124703192-->
<!--    Vue-super-flow使用说明：https://caohuatao.github.io/guide/#%E4%BB%8B%E7%BB%8D-->

    注意：因为坐标数值是通过接口返回，因此不适合模型管理平台中使用。这个插件适合显示固定的流程图，不适合显示动态的流程图；

    <super-flow
        ref="superFlow"
        :linkEditable="false"
        :node-list="nodeList"
        :link-list="linkList"
        :origin="origin">
      <template slot="node" slot-scope="{ meta }">
        <div :class="`flow-node flow-node-${meta.status}`">
          <div :title="meta.name" class="node-content">
            {{ meta.name }}
          </div>
        </div>
      </template>
    </super-flow>


  </div>
</template>

<script>
import superFlowData from '@/data/superFlowData.json'

export default {
  name: 'VueSuperFlow',

  data() {
    return {
      origin: [650, 550],
      nodeList: [],
      linkList: [],
    }
  },
  created() {
    const { nodeList, linkList } = superFlowData

    setTimeout(() => {
      this.nodeList = nodeList
      this.linkList = linkList
    }, 100)
  },
  mounted() {
    this.$nextTick(() => {
    })
  },
}
</script>

<style lang="scss" scoped>
.ellipsis {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-wrap: break-word;
}

.super-flow-base-demo {
  width: 100%;
  margin: 0 auto;
  background-color: #f5f5f5;
  overflow-x: auto;
  height: calc(150vh - 60px);

  .super-flow {
    width: 2000px;
    height: 100%
  }

  .super-flow__node {
    .flow-node {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      line-height: 40px;
      font-size: 16px;
      color: #333;
      font-weight: 700;

      .node-content {
        text-align: center;
      }

      &.flow-node-green {
        .node-content {
          background-color: #30b95c;
        }
      }

      &.flow-node-yellow {
        .node-content {
          background-color: #ffa91a;
        }
      }

      &.flow-node-blue {
        .node-content {
          background-color: #55abfc;
        }
      }

    }
  }
}
</style>
