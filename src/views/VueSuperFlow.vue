<template>
  <div class="super-flow-base-demo">
    <h3>学习重点：vue中使用vue-super-flow显示流程图</h3>

<!--    DEMO参考地址：https://blog.csdn.net/cindy6666/article/details/124703192-->
<!--    Vue-super-flow使用说明：https://caohuatao.github.io/guide/#%E4%BB%8B%E7%BB%8D-->

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
    const nodeList = [
      {
        'id': 'node_bjyy',
        'width': 120,
        'height': 40,
        'coordinate': [-600, -148],
        'meta': {
          'status': 'green',
          'prop': 'bjyy',
          'name': '报建预约'
        }
      },
      {
        'id': 'node_ysh',
        'width': 120,
        'height': 40,
        'coordinate': [-400, -148],
        'meta': {
          'status': 'green',
          'prop': 'ysh',
          'name': '预审核'
        }
      },

      {
        'id': 'node_zsbj',
        'width': 120,
        'height': 40,
        'coordinate': [-200, -148],
        'meta': {
          'status': 'green',
          'prop': 'zsbj',
          'name': '正式报建'
        }
      },

      {
        'id': 'node_cmwyhsh',
        'width': 160,
        'height': 40,
        'coordinate': [0, -148],
        'meta': {
          'status': 'yellow',
          'prop': 'cmwyhsh',
          'name': '村民委员会审核'
        }
      },

      {
        'id': 'node_nyncjbrsh',
        'width': 180,
        'height': 40,
        'coordinate': [230, -148],
        'meta': {
          'status': 'blue',
          'prop': 'nyncjbrsh',
          'name': '农业农村经办人审核'
        }
      },

      {
        'id': 'node_zgbmjbrsh',
        'width': 180,
        'height': 40,
        'coordinate': [230, -248],
        'meta': {
          'status': 'blue',
          'prop': 'zgbmjbrsh',
          'name': '资规部门经办人审核'
        }
      },

      {
        'id': 'node_zjbmjbrsh',
        'width': 180,
        'height': 40,
        'coordinate': [230, -48],
        'meta': {
          'status': 'blue',
          'prop': 'zjbmjbrsh',
          'name': '住建部门经办人审核'
        }
      },


      {
        'id': 'node_nyncbmfzrsh',
        'width': 200,
        'height': 40,
        'coordinate': [450, -148],
        'meta': {
          'status': 'blue',
          'prop': 'nyncbmfzrsh',
          'name': '农业农村部门负责人审核'
        }
      },


      {
        'id': 'node_zgbmfzrsh',
        'width': 200,
        'height': 40,
        'coordinate': [450, -248],
        'meta': {
          'status': 'blue',
          'prop': 'zgbmfzrsh',
          'name': '资规部门负责人审核'
        }
      },

      {
        'id': 'node_zjbmfzrsh',
        'width': 200,
        'height': 40,
        'coordinate': [450, -48],
        'meta': {
          'status': 'blue',
          'prop': 'zjbmfzrsh',
          'name': '住建部门负责人审核'
        }
      },

      {
        'id': 'node_qtbm',
        'width': 120,
        'height': 40,
        'coordinate': [365, -348],
        'meta': {
          'status': 'blue',
          'prop': 'qtbm',
          'name': '其他部门'
        }
      },

      {
        'id': 'node_fgldsp',
        'width': 130,
        'height': 40,
        'coordinate': [700, -148],
        'meta': {
          'status': 'blue',
          'prop': 'fgldsp',
          'name': '分管领导审批'
        }
      },

      {
        'id': 'node_xzzyldsp',
        'width': 150,
        'height': 40,
        'coordinate': [880, -148],
        'meta': {
          'status': 'blue',
          'prop': 'xzzyldsp',
          'name': '乡镇主要领导审批'
        }
      },

      {
        'id': 'node_blghxk',
        'width': 150,
        'height': 40,
        'coordinate': [1080, -148],
        'meta': {
          'status': 'blue',
          'prop': 'blghxk',
          'name': '办理规划许可'
        }
      },

    ]
    const linkList = [
      //报建预约----->预审核
      {
        'id': 'bjyy_ysh',
        'startId': 'node_bjyy',
        'endId': 'node_ysh',
        'startAt': [100, 20],
        'endAt': [0, 20],
        'meta': null
      },
      //预审核----->正式报建
      {
        'id': 'ysh_zsbj',
        'startId': 'node_ysh',
        'endId': 'node_zsbj',
        'startAt': [100, 20],
        'endAt': [0, 20],
        'meta': null
      },

      //正式报建----->村民委员会审核
      {
        'id': 'zsbj_cmwyhsh',
        'startId': 'node_zsbj',
        'endId': 'node_cmwyhsh',
        'startAt': [100, 20],
        'endAt': [0, 20],
        'meta': null
      },

      //村民委员会审核----->农业农村经办人审核
      {
        'id': 'cmwyhsh_nyncjbrsh',
        'startId': 'node_cmwyhsh',
        'endId': 'node_nyncjbrsh',
        'startAt': [100, 20],
        'endAt': [0, 20],
        'meta': null
      },

      //村民委员会审核----->资规部门经办人审核
      {
        'id': 'cmwyhsh_zgbmjbrsh',
        'startId': 'node_cmwyhsh',
        'endId': 'node_zgbmjbrsh',
        'startAt': [80, 0],
        'endAt': [0, 20],
        'meta': null
      },


      //村民委员会审核----->住建部门经办人审核
      {
        'id': 'cmwyhsh_zjbmjbrsh',
        'startId': 'node_cmwyhsh',
        'endId': 'node_zjbmjbrsh',
        'startAt': [0, 80],
        'endAt': [0, 20],
        'meta': null
      },

      //农业农村经办人审核----->农业农村部门负责人审核
      {
        'id': 'nyncjbrsh_nyncbmfzrsh',
        'startId': 'node_nyncjbrsh',
        'endId': 'node_nyncbmfzrsh',
        'startAt': [100, 20],
        'endAt': [0, 20],
        'meta': null
      },


      //资规部门经办人审核----->资规部门负责人审核
      {
        'id': 'zgbmjbrsh_zgbmfzrsh',
        'startId': 'node_zgbmjbrsh',
        'endId': 'node_zgbmfzrsh',
        'startAt': [100, 20],
        'endAt': [0, 20],
        'meta': null
      },

      //住建部门经办人审核----->住建部门负责人审核
      {
        'id': 'zjbmjbrsh_zjbmfzrsh',
        'startId': 'node_zjbmjbrsh',
        'endId': 'node_zjbmfzrsh',
        'startAt': [100, 20],
        'endAt': [0, 20],
        'meta': null
      },

      //村民委员会审核----->其他部门
      {
        'id': 'cmwyhsh_qtbm',
        'startId': 'node_cmwyhsh',
        'endId': 'node_qtbm',
        'startAt': [80, 0],
        'endAt': [0, 20],
        'meta': null
      },

      //其他部门----->分管领导审批
      {
        'id': 'qtbm_fgldsp',
        'startId': 'node_qtbm',
        'endId': 'node_fgldsp',
        'startAt': [100, 20],
        'endAt': [50, 0],
        'meta': null
      },


      // 农业农村部门负责人审核----->分管领导审批
      {
        'id': 'nyncbmfzrsh_fgldsp',
        'startId': 'node_nyncbmfzrsh',
        'endId': 'node_fgldsp',
        'startAt': [100, 20],
        'endAt': [0, 20],
        'meta': null
      },

      // 分管领导审批-----> 乡镇主要领导审批
      {
        'id': 'fgldsp_xzzyldsp',
        'startId': 'node_fgldsp',
        'endId': 'node_xzzyldsp',
        'startAt': [100, 20],
        'endAt': [0, 20],
        'meta': null
      },

      // 乡镇主要领导审批-----> 办理规划许可
      {
        'id': 'xzzyldsp_blghxk',
        'startId': 'node_xzzyldsp',
        'endId': 'node_blghxk',
        'startAt': [100, 20],
        'endAt': [0, 20],
        'meta': null
      },

      // 住建部门负责人审核-----> 分管领导审批
      {
        'id': 'zjbmfzrsh_gldsp',
        'startId': 'node_zjbmfzrsh',
        'endId': 'node_fgldsp',
        'startAt': [100, 20],
        'endAt': [0, 50],
        'meta': null
      },

      // 资规部门负责人审核-----> 分管领导审批
      {
        'id': 'zgbmfzrsh_fgldsp',
        'startId': 'node_zgbmfzrsh',
        'endId': 'node_fgldsp',
        'startAt': [100, 20],
        'endAt': [50, 0],
        'meta': null
      },

    ]

    setTimeout(() => {
      this.nodeList = nodeList
      this.linkList = linkList
    }, 100)
  },
  mounted() {
    this.$nextTick(() => {
      // this.$el.scrollBy({
      //   left: (this.$el.scrollWidth - this.$el.clientWidth) / 2,
      //   top: (this.$el.scrollHeight - this.$el.clientHeight) / 2
      // })
    })
  },
  methods: {


  }
}
</script>


<style lang="scss">
.ellipsis {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-wrap: break-word;
}

.super-flow-base-demo {
  width: 100%;
  //height: 800px;
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
      //padding: 0 6px;
      font-size: 16px;
      color: #333;
      font-weight: 700;

      .node-content {
        text-align: center;
        //padding-left: 3%;
        //overflow: hidden;
        //text-overflow: ellipsis;
        //white-space: nowrap;
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
