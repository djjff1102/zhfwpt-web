<template>
  <div id="mountNode"></div>
</template>

<script setup>
import G6 from '@antv/g6';
import { onMounted, ref } from 'vue';

const graph = ref()
const windowWidth = ref(0) // 浏览器窗口的宽度

// window.addEventListener('resize', getWindow())
// getWindow()
// function getWindow() {
//   windowWidth.value = document.documentElement.clientWidth || document.body.clientWidth;
// }

function init() {
  graph.value =  new G6.TreeGraph({
    container,
    width,
    height,
    layout: {
      type: 'compactBox',
      direction: 'V',
      // 每个节点高度
      getHeight: () => 54,
      // 每个节点宽度
      getWidth: () => 144,
      // 每个节点的垂直间隙
      getVGap: () => 70,
      // 每个节点的水平间隙
      getHGap: () => 16,
      // 节点排布在根节点的哪一侧
      getSide: (item) => item.data.location
    },
    modes: {
      default: [
        'drag-canvas',
        {
          type: 'zoom-canvas',
          sensitivity: 1, // 缩放灵敏度
          minZoom: 0.5,
          maxZoom: 1.5
        }
      ]
    },
    defaultNode: {
      // 使用自定义节点
      type: 'icon-node',
      // 节点的连接点
      // https://g6.antv.antgroup.com/manual/middle/elements/nodes/anchorpoint
      anchorPoints: [
        [0.5, 0],
        [0.5, 1]
      ],
    },
    defaultEdge: {
      // 使用自定义边
      type: 'flow-line'
    }
  })
  const data = [];
  data?.children?.forEach(item => {
    // 根据条件把图渲染在上边或者下边
    item.location = 'right'
  })
  // 绘制自定义节点
  customNode()
  // 绘制自定义边
  customEdge()
  // 解决渲染残影问题
  graph.value.get('canvas').set('localRefresh', false)
  graph.value.read(data)
  graph.value.fitCenter()
}

function customNode() {
  G6.registerNode('icon-node',{
    draw(cfg, group) {
      const isRoot = '根节点'
      // 取宽高的一半 后边的文本方便居中
      const x = -144 / 2
      const y = -54 / 2
      // 画外边的盒子
      const rectShape = group.addShape('rect', {
        attrs: {
          x,
          y,
          width: 144,
          height: 54,
          fill: isRoot ? '#4ea2f0' : '#fff',
          stroke: '#4ea2f0',
          radius: 2,
          cursor: 'pointer'
        },
        name: 'container-node'
      })
      // 处理文本换行
      const label = fittingString(cfg.name, 124, 12, 2)
      // 画文本
      group.addShape('text', {
        attrs: {
          text: label,
          x: 0,
          y: 0,
          textAlign: 'center',
          textBaseline: 'middle',
          fill: isRoot ? '#fff' : '#303242',
          cursor: 'pointer'
        },
        name: 'text-node'
      })
      // 画展开图标
      if (cfg.hasChild) {
        group.addShape('marker', {
          attrs: {
            x: 0,
            y: -y + 6,
            r: 6,
            fill: '#fff',
            stroke: '#4ea2f0',
            cursor: 'pointer',
            symbol: EXPAND_ICON // 图标的路径函数
          },
          name: 'collapse-node'
        })
      }
      return rectShape
    },
})
}

function customEdge() {
  G6.registerEdge('flow-line',{
    draw(cfg, group) {
        // 分别是边两端与起始节点和结束节点的交点
        const startPoint = cfg.startPoint;
        const endPoint = cfg.endPoint;
        const { stockProportion } = cfg.targetNode.getModel()
        // 根据两个点画出想要的边
        const pathShape = group.addShape('path', {
        attrs: {
          stroke: '#eee',
          // svg path
          // https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Paths
          path: [
            ['M', startPoint.x, startPoint.y],
            ['L', startPoint.x, (startPoint.y + endPoint.y) / 2],
            ['L', endPoint.x, (startPoint.y + endPoint.y) / 2],
            ['L', endPoint.x, endPoint.y]
          ],
          // 箭头
          endArrow: {
            fill: '#4ea2f0',
            stroke: '#4ea2f0',
            path: G6.Arrow.triangle(10, 15, 0)
          }
        },
        name: 'flow-edge'
      })
      // 画边的文字
      if (stockProportion) {
        const label = stockProportion + '%'
        group.addShape('text', {
          attrs: {
            text: label,
            x: endPoint.x + 4,
            y: (startPoint.y + endPoint.y) / 2,
            fill: '#4ea2f0',
            stroke: '#fff',
          },
          name: 'text-node'
        })
      }
      return pathShape
    }
})
}

onMounted(() => {
  init()
  new G6.TreeGraph({
    modes: {
        default: [
            {
                type: 'collapse-expand',
                // 未点击到图标或者不能展开的时候阻止行为
                shouldBegin(e) {
                  const targetType = e.target.get('type')
                  const { hasChild } = e.item.getModel()
                  return targetType === 'marker' && hasChild
                },
                // 展开收起时切换图标
                onChange(item, collapsed) {
                  const group = item.getContainer()
                  const icon = group.find((e) => e.get('name') === 'collapse-icon')
                  if (collapsed) {
                    icon.attr('symbol', EXPAND_ICON)
                  } else {
                    icon.attr('symbol', COLLAPSE_ICON)
                  }
                }
            }
        ]
    }
})
})
</script>
