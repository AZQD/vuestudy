<template>
  <div class="super-flow-base-demo">
    <h3>学习重点：vue中使用@antv/x6显示流程图_BPMN</h3>
    <div id="container" style="width: 600px; height: 400px"></div>
  </div>
</template>


<script>
import {Graph} from '@antv/x6'
import AntvX6BpmnJson from './AntvX6BpmnJson.json'


export default {
  name: 'AntvX6Bpmn',

  data() {
    return {}
  },
  created() {

  },
  mounted() {
    this.initFun();
  },
  methods: {

    initFun() {

      Graph.registerNode(
          'event',
          {
            inherit: 'circle',
            attrs: {
              body: {
                strokeWidth: 2,
                stroke: '#5F95FF',
                fill: '#FFF',
              },
            },
          },
          true,
      )

      Graph.registerNode(
          'activity',
          {
            inherit: 'rect',
            markup: [
              {
                tagName: 'rect',
                selector: 'body',
              },
              {
                tagName: 'image',
                selector: 'img',
              },
              {
                tagName: 'text',
                selector: 'label',
              },
            ],
            attrs: {
              body: {
                rx: 6,
                ry: 6,
                stroke: '#5F95FF',
                fill: '#EFF4FF',
                strokeWidth: 1,
              },
              img: {
                x: 6,
                y: 6,
                width: 16,
                height: 16,
                'xlink:href':
                    'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*pwLpRr7QPGwAAAAAAAAAAAAAARQnAQ',
              },
              label: {
                fontSize: 12,
                fill: '#262626',
              },
            },
          },
          true,
      )

      Graph.registerNode(
          'gateway',
          {
            inherit: 'polygon',
            attrs: {
              body: {
                refPoints: '0,10 10,0 20,10 10,20',
                strokeWidth: 2,
                stroke: '#5F95FF',
                fill: '#EFF4FF',
              },
              label: {
                text: '+',
                fontSize: 40,
                fill: '#5F95FF',
              },
            },
          },
          true,
      )

      Graph.registerEdge(
          'bpmn-edge',
          {
            inherit: 'edge',
            attrs: {
              line: {
                stroke: '#A2B1C3',
                strokeWidth: 2,
              },
            },
          },
          true,
      )

      const graph = new Graph({
        container: document.getElementById('container'),
        connecting: {
          router: 'orth',
        },
      })

      setTimeout(() => {
        const cells = []
        AntvX6BpmnJson.forEach((item) => {
          if (item.shape === 'bpmn-edge') {
            cells.push(graph.createEdge(item))
          } else {
            cells.push(graph.createNode(item))
          }
        })
        graph.resetCells(cells)
        graph.zoomToFit({padding: 10, maxScale: 1})
      }, 1000)

    }
  }
}
</script>


