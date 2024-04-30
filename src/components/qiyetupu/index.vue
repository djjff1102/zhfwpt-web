<template>
  <div :id="id">
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import G6 from '@antv/g6';
import { COLLAPSE_ICON, EXPAND_ICON, defaultStateStyles, defaultNodeStyle, defaultEdgeStyle, defaultLayout, defaultLabelCfg } from './data.js'

const props = defineProps({
  id: {
    default:'G6id'
  },
  data: {
    deafult: []
  }
})

watch(() => props.data, (v) => {
  if(v) {
    nextTick(() =>{
      const d =JSON.parse(JSON.stringify(v))
      d.children.forEach(e => {
        delete e.children
      });
      init(d)
    })
  }
}, {
  deep: true
})

const windowWidth = ref(0);

window.addEventListener('resize', getWindow())
function getWindow() {
  windowWidth.value = document.documentElement.clientWidth || document.body.clientWidth;
}

function init(d) {
  const graph = new G6.TreeGraph({
    container: props.id,
    width: windowWidth.value - 200, // 因为右侧导航栏，调整一下图的居中位置
    height: 600,
    linkCenter: true,
    modes: {
      default: [
        {
          type: 'collapse-expand',
          onChange: function onChange(item, collapsed) {
            const data = item.getModel();
            data.collapsed = collapsed;
            return true
          },
        },
        'drag-canvas', 'zoom-canvas'],
    },
    defaultNode: {
      type: 'icon-node',
      anchorPoints: [
        [0.5, 0],
        [0.5, 1]
      ],
      size: [200, 40],
      textAlign: 'center', // 设置文本居中
      style: defaultNodeStyle,
      labelCfg: defaultLabelCfg,
    },
    defaultEdge: {
      type: 'flow-line',
      style: defaultEdgeStyle,
    },
    nodeStateStyles: defaultStateStyles,
    edgeStateStyles: defaultStateStyles,
    layout: defaultLayout,
  });

graph.data(d);
graph.render();
graph.fitView();
}

G6.registerNode(
  'icon-node',
  {
    options: {
      size: [60, 20],
      stroke: 'red',
      fill: 'red',
    },
    draw(cfg, group) {
      console.log('node----------------:', cfg)
      const styles = this.getShapeStyle(cfg);
      const { labelCfg = {} } = cfg;

      const w = styles.width;
      const h = styles.height;

      const keyShape = group.addShape('rect', {
        attrs: {
          ...styles,
          x: -w / 2,
          y: -h / 2
        },
      });
      
      group.addShape('text', {
        attrs: {
          ...labelCfg.style,
          text:'niode',
          width: 200
          
        },
      });
      // if (cfg.point_type == '主要人员') {
      //   group.addShape('image', {
      //     attrs: {
      //       x: 8 - w / 2,
      //       y: 8 - h / 2,
      //       width: 24,
      //       height: 24,
      //       img:'https://g.alicdn.com/cm-design/arms-trace/1.0.155/styles/armsTrace/images/TAIR.png',
      //     },
      //     name: 'image-shape',
      //   });
      //   group.addShape('text', {
      //     attrs: {
      //       ...labelCfg.style,
      //       text: getName(cfg.point_message),
      //       width: getName(cfg.point_message).length * 14
      //     },
      //   });
      // } else if(cfg.point_id == 1) {
      //   group.addShape('text', {
      //     attrs: {
      //       ...labelCfg.style,
      //       text: cfg.point_type,
      //     },
      //   });
      // } else if (cfg.point_message) {
      //   group.addShape('text', {
      //     attrs: {
      //       ...labelCfg.style,
      //       text: getName(cfg.point_message),
      //       width: getName(cfg.point_message).length * 14
      //       // x: 2,
      //       // y: 25 - h / 2,
      //     },
      //   });
      // } else {
      //   group.addShape('text', {
      //     attrs: {
      //       ...labelCfg.style,
      //       text:'niode',
      //       width: 200
            
      //     },
      //   });
      // }

      return keyShape;
    },
    update: undefined,
  },
  'rect',
);

// 边绘制为折线
G6.registerEdge('flow-line', {
  draw(cfg, group) {
    const startPoint = cfg.startPoint;
    const endPoint = cfg.endPoint;
    const { style } = cfg;
    console.log('边---------------：', cfg)
    const shape = group.addShape('path', {
      attrs: {
        stroke: style.stroke,
        endArrow: style.endArrow,
        path: [
          ['M', startPoint.x, startPoint.y],
          ['L', startPoint.x, (startPoint.y + endPoint.y) / 2],
          ['L', endPoint.x, (startPoint.y + endPoint.y) / 2],
          ['L', endPoint.x, endPoint.y],
        ],
      },
    });
    if (cfg.targetNode._cfg.model.point_message['股份占比']) {
        const label = Number(cfg.targetNode._cfg.model.point_message['股份占比']) * 100 + '%'
        group.addShape('text', {
          attrs: {
            text: label,
            x: endPoint.x + 4,
            y: (startPoint.y + endPoint.y) / 2,
            fill: 'green',
            stroke: '#fff',
          },
          name: 'text-node'
        })
      }
    return shape;
  },
});

</script>
