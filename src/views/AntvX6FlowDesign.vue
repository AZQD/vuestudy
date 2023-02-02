<template>
  <div class="super-flow-base-demo">
    <h3>学习重点：vue中使用@antv/x6显示流程图_设计</h3>

    <div class="flow_wrapper">

      <div id="container" style="width: 100%; height: 100%"></div>

      <div class="ctrlBox">
        <div class="export">
          <el-button class="exportBtn" @click="exportFun">导出</el-button>
        </div>


        <div id="node-info">
          <div class="node-item">
            <div class="node-item-key">节点名称：</div>
            <input class="node-item-value" type="text" id="node-name">
          </div>
        </div>
      </div>

    </div>


  </div>
</template>


<script>
let graph = null;
import { Graph, Shape } from '@antv/x6'
import { Stencil } from '@antv/x6-plugin-stencil'
import { Transform } from '@antv/x6-plugin-transform'
import { Selection } from '@antv/x6-plugin-selection'
import { Snapline } from '@antv/x6-plugin-snapline'
import { Keyboard } from '@antv/x6-plugin-keyboard'
import { Clipboard } from '@antv/x6-plugin-clipboard'
import { History } from '@antv/x6-plugin-history'
import insertCss from 'insert-css'

import flowDesignJson from './flowDesign.json'

export default {
  name: 'AntvX6FlowDesign',

  data() {
    return {}
  },
  created() {

  },
  mounted() {
    this.initFun();
  },
  methods: {

    exportFun(){
      let cells = JSON.stringify(graph.toJSON().cells);
      const url = window.URL.createObjectURL(new Blob([cells], {type: 'text/json'}))
      const link = document.createElement('a');
      let name = '流程图JSON_' + Date.now() + '.json';
      link.href = url;
      link.setAttribute('download', name);
      document.body.appendChild(link);
      link.click();
    },

    initFun() {

      setTimeout(()=> {

        graph.fromJSON(flowDesignJson); // 初始化流程图

        // 更新流程图节点状态
        // const nodes = graph.getNodes();
        // console.log('所有节点：', nodes);
        // nodes.map(node => {
        //   // 已完成的节点
        //   if(['开始', '过程'].includes(node.label)) {
        //     node.attr('body', {
        //       stroke: '#334fd8',
        //       fill: 'rgba(51,79,126,.2)'
        //     })
        //   }
        //   // 正在进行中的节点
        //   if(node.label === '可选过程') {
        //     node.attr('body', {
        //       stroke: '#334fd8',
        //       fill: '#334fd8',
        //     })
        //     node.attr('text', {
        //       fill: '#fff'
        //     })
        //   }
        // });

      }, 0);


// 为了协助代码演示
      preWork()

// #region 初始化画布
      graph = new Graph({
        container: document.getElementById('graph-container'),
        grid: true,
        mousewheel: {
          enabled: true,
          zoomAtMousePosition: true,
          modifiers: 'ctrl',
          minScale: 0.5,
          maxScale: 3,
        },
        connecting: {
          router: {
            name: 'manhattan',
            args: {
              padding: 1,
            },
          },
          connector: {
            name: 'rounded',
            args: {
              radius: 8,
            },
          },
          anchor: 'center',
          connectionPoint: 'anchor',
          allowBlank: false,
          snap: {
            radius: 20,
          },
          createEdge() {
            return new Shape.Edge({
              attrs: {
                line: {
                  stroke: '#A2B1C3',
                  strokeWidth: 2,
                  targetMarker: {
                    name: 'block',
                    width: 12,
                    height: 8,
                  },
                },
              },
              zIndex: 0,
            })
          },
          validateConnection({ targetMagnet }) {
            return !!targetMagnet
          },
        },
        highlighting: {
          magnetAdsorbed: {
            name: 'stroke',
            args: {
              attrs: {
                fill: '#5F95FF',
                stroke: '#5F95FF',
              },
            },
          },
        },
      })
// #endregion

// #region 使用插件
      graph
          .use(new Transform({
            resizing: true,
            rotating: true,
          }))
          .use(new Selection({
            enabled: true,
            rubberband: true,
            showNodeSelectionBox: true,
          }))
          .use(new Snapline({
            enabled: true,
          }))
          .use(new Keyboard({
            enabled: true,
          }))
          .use(new Clipboard({
            enabled: true,
          }))
          .use(new History({
            enabled: true,
          }))
// #endregion

// #region 初始化 stencil
      const stencil = new Stencil({
        title: '流程图',
        target: graph,
        stencilGraphWidth: 200,
        stencilGraphHeight: 180,
        collapsable: true,
        groups: [
          {
            title: '基础流程图',
            name: 'group1',
          },
        ],
        layoutOptions: {
          columns: 2,
          columnWidth: 80,
          rowHeight: 55,
        },
      })
      document.getElementById('stencil').appendChild(stencil.container)
// #endregion

// #region 快捷键与事件
      graph.bindKey(['meta+c', 'ctrl+c'], () => {
        const cells = graph.getSelectedCells()
        if (cells.length) {
          graph.copy(cells)
        }
        return false
      })
      graph.bindKey(['meta+x', 'ctrl+x'], () => {
        const cells = graph.getSelectedCells()
        if (cells.length) {
          graph.cut(cells)
        }
        return false
      })
      graph.bindKey(['meta+v', 'ctrl+v'], () => {
        if (!graph.isClipboardEmpty()) {
          const cells = graph.paste({ offset: 32 })
          graph.cleanSelection()
          graph.select(cells)
        }
        return false
      })

//undo redo
      graph.bindKey(['meta+z', 'ctrl+z'], () => {
        if (graph.canUndo()) {
          graph.undo()
        }
        return false
      })
      graph.bindKey(['meta+shift+z', 'ctrl+shift+z'], () => {
        if (graph.canRedo()) {
          graph.redo()
        }
        return false
      })

// select all
      graph.bindKey(['meta+a', 'ctrl+a'], () => {
        const nodes = graph.getNodes()
        if (nodes) {
          graph.select(nodes)
        }
      })

//delete
      graph.bindKey('backspace', () => {
        const cells = graph.getSelectedCells()
        if (cells.length) {
          graph.removeCells(cells)
        }
      })

// zoom
      graph.bindKey(['ctrl+1', 'meta+1'], () => {
        const zoom = graph.zoom()
        if (zoom < 1.5) {
          graph.zoom(0.1)
        }
      })
      graph.bindKey(['ctrl+2', 'meta+2'], () => {
        const zoom = graph.zoom()
        if (zoom > 0.5) {
          graph.zoom(-0.1)
        }
      })

// 控制连接桩显示/隐藏
      const showPorts = (ports, show) => {
        for (let i = 0, len = ports.length; i < len; i = i + 1) {
          ports[i].style.visibility = show ? 'visible' : 'hidden'
        }
      }
      graph.on('node:mouseenter', () => {
        const container = document.getElementById('graph-container')
        const ports = container.querySelectorAll(
            '.x6-port-body',
        )
        showPorts(ports, true)
      })
      graph.on('node:mouseleave', () => {
        const container = document.getElementById('graph-container')
        const ports = container.querySelectorAll(
            '.x6-port-body',
        )
        showPorts(ports, false)
      })
// #endregion

// #region 初始化图形
      const ports = {
        groups: {
          top: {
            position: 'top',
            attrs: {
              circle: {
                r: 4,
                magnet: true,
                stroke: '#5F95FF',
                strokeWidth: 1,
                fill: '#fff',
                style: {
                  visibility: 'hidden',
                },
              },
            },
          },
          right: {
            position: 'right',
            attrs: {
              circle: {
                r: 4,
                magnet: true,
                stroke: '#5F95FF',
                strokeWidth: 1,
                fill: '#fff',
                style: {
                  visibility: 'hidden',
                },
              },
            },
          },
          bottom: {
            position: 'bottom',
            attrs: {
              circle: {
                r: 4,
                magnet: true,
                stroke: '#5F95FF',
                strokeWidth: 1,
                fill: '#fff',
                style: {
                  visibility: 'hidden',
                },
              },
            },
          },
          left: {
            position: 'left',
            attrs: {
              circle: {
                r: 4,
                magnet: true,
                stroke: '#5F95FF',
                strokeWidth: 1,
                fill: '#fff',
                style: {
                  visibility: 'hidden',
                },
              },
            },
          },
        },
        items: [
          {
            group: 'top',
          },
          {
            group: 'right',
          },
          {
            group: 'bottom',
          },
          {
            group: 'left',
          },
        ],
      }

      Graph.registerNode(
          'custom-rect',
          {
            inherit: 'rect',
            width: 66,
            height: 36,
            attrs: {
              body: {
                strokeWidth: 1,
                stroke: '#5F95FF',
                fill: '#EFF4FF',
              },
              text: {
                fontSize: 12,
                fill: '#262626',
              },
            },
            ports: { ...ports },
          },
          true,
      )

      Graph.registerNode(
          'custom-polygon',
          {
            inherit: 'polygon',
            width: 66,
            height: 36,
            attrs: {
              body: {
                strokeWidth: 1,
                stroke: '#5F95FF',
                fill: '#EFF4FF',
              },
              text: {
                fontSize: 12,
                fill: '#262626',
              },
            },
            ports: {
              ...ports,
              items: [
                {
                  group: 'top',
                },
                {
                  group: 'bottom',
                },
              ],
            },
          },
          true,
      )

      Graph.registerNode(
          'custom-circle',
          {
            inherit: 'circle',
            width: 45,
            height: 45,
            attrs: {
              body: {
                strokeWidth: 1,
                stroke: '#5F95FF',
                fill: '#EFF4FF',
              },
              text: {
                fontSize: 12,
                fill: '#262626',
              },
            },
            ports: { ...ports },
          },
          true,
      )

      Graph.registerNode(
          'custom-image',
          {
            inherit: 'rect',
            width: 52,
            height: 52,
            markup: [
              {
                tagName: 'rect',
                selector: 'body',
              },
              {
                tagName: 'image',
              },
              {
                tagName: 'text',
                selector: 'label',
              },
            ],
            attrs: {
              body: {
                stroke: '#5F95FF',
                fill: '#5F95FF',
              },
              image: {
                width: 26,
                height: 26,
                refX: 13,
                refY: 16,
              },
              label: {
                refX: 3,
                refY: 2,
                textAnchor: 'left',
                textVerticalAnchor: 'top',
                fontSize: 12,
                fill: '#fff',
              },
            },
            ports: { ...ports },
          },
          true,
      )

      const r1 = graph.createNode({
        shape: 'custom-rect',
        label: '开始',
        attrs: {
          body: {
            rx: 20,
            ry: 26,
          },
        },
      })
      const r2 = graph.createNode({
        shape: 'custom-rect',
        label: '过程',
      })
      const r3 = graph.createNode({
        shape: 'custom-rect',
        attrs: {
          body: {
            rx: 6,
            ry: 6,
          },
        },
        label: '可选过程',
      })
      const r4 = graph.createNode({
        shape: 'custom-polygon',
        attrs: {
          body: {
            refPoints: '0,10 10,0 20,10 10,20',
          },
        },
        label: '决策',
      })
      const r5 = graph.createNode({
        shape: 'custom-polygon',
        attrs: {
          body: {
            refPoints: '10,0 40,0 30,20 0,20',
          },
        },
        label: '数据',
      })
      const r6 = graph.createNode({
        shape: 'custom-circle',
        label: '连接',
      })
      stencil.load([r1, r2, r3, r4, r5, r6], 'group1')

// #endregion

      function preWork() {
        // 这里协助演示的代码，在实际项目中根据实际情况进行调整
        const container = document.getElementById('container')
        const stencilContainer = document.createElement('div')
        stencilContainer.id = 'stencil'
        const graphContainer = document.createElement('div')
        graphContainer.id = 'graph-container'
        container.appendChild(stencilContainer)
        container.appendChild(graphContainer)

        insertCss(`
    #container {
      display: flex;
      border: 1px solid #dfe3e8;
    }
    #stencil {
      width: 180px;
      height: 100%;
      position: relative;
      border-right: 1px solid #dfe3e8;
    }
    #graph-container {
      width: calc(100% - 180px);
      height: 100%;
    }
    .x6-widget-stencil  {
      background-color: #fff;
    }
    .x6-widget-stencil-title {
      background-color: #fff;
    }
    .x6-widget-stencil-group-title {
      background-color: #fff !important;
    }
    .x6-widget-transform {
      margin: -1px 0 0 -1px;
      padding: 0px;
      border: 1px solid #239edd;
    }
    .x6-widget-transform > div {
      border: 1px solid #239edd;
    }
    .x6-widget-transform > div:hover {
      background-color: #3dafe4;
    }
    .x6-widget-transform-active-handle {
      background-color: #3dafe4;
    }
    .x6-widget-transform-resize {
      border-radius: 0;
    }
    .x6-widget-selection-inner {
      border: 1px solid #239edd;
    }
    .x6-widget-selection-box {
      opacity: 0;
    }
  `)
      }


      /**
       * 当前选中的节点
       * */
      var actionNode;
      /**
       * 监听lable变化
       * */
      // Object.defineProperty(actionNode, 'label', {
      //     enumerable: true,
      //     configurable: true,
      //     set(newVal){
      //         this.label=newVal
      //         console.log('set:'+this.label)
      //     },
      //     get(){
      //         console.log('get:'+this.label)
      //         return this.label
      //     }
      // })
      /**
       * 节点点击事件
       * */
      graph.on('node:click', (event) => {
        actionNode = event.node;
        document.querySelector("#node-name").value = actionNode.label;
        document.querySelector("#node-info").style.display  = "block";
      })
      /**
       * 空白画布点击事件
       * */
      graph.on('blank:click', () => {
        actionNode = null;
        document.querySelector("#node-info").style.display  = "none";
      })
      /**
       * 监听输入框修改事件，如果没有选择节点也不报错。
       * */
      document.querySelector("#node-name").addEventListener("input", (e)=>{
        try{
          actionNode.label = e.target.value
        }catch(e){
          console.log(e);
        }
      })


    }
  }
}
</script>

<style lang="scss">

.flow_wrapper {
  height: 400px;
  position: relative;

  .ctrlBox{
    position: absolute;
    right: 0;
    top: 0;
    //width: 200px;
    .export{
      text-align: right;
      .exportBtn{

      }
    }
    #node-info{
      display: none;
      .node-item{
        display: flex;
        align-items: center;
        color: #606266;
        font-size: 14px;
        padding: 10px 0;
        .node-item-key{

        }
        .node-item-value{
          width: 100px;
          outline: none;
        }
      }
    }
  }
}

</style>


