<template>
  <div :id="id"></div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import G6 from "@antv/g6";
import {
  COLLAPSE_ICON,
  EXPAND_ICON,
  data,
  defaultStateStyles,
  defaultNodeStyle,
  defaultEdgeStyle,
  defaultLayout,
  defaultLabelCfg,
} from "./data.js";

const props = defineProps({
  id: {
    default: "G6id",
  },
  data: {
    deafult: [],
  },
});

watch(
  () => props.data,
  (v) => {
    if (v) {
      nextTick(() => {
        const d = JSON.parse(JSON.stringify(v));
        d.children.forEach((e) => {
          delete e.children;
        });
        init(d);
      });
    }
  },
  {
    deep: true,
  }
);

const windowWidth = ref(0);

window.addEventListener("resize", getWindow());
getWindow();
function getWindow() {
  windowWidth.value =
    document.documentElement.clientWidth || document.body.clientWidth;
}

function init(d) {
  const graph = new G6.TreeGraph({
    container: props.id,
    width: windowWidth.value - 200, // 因为右侧导航栏，调整一下图的居中位置
    height: 400,
    linkCenter: true,
    modes: {
      default: [
        {
          type: "collapse-expand",
          onChange: function onChange(item, collapsed) {
            const data = item.getModel();
            data.collapsed = collapsed;
            return true;
          },
        },
        "drag-canvas",
        "zoom-canvas",
      ],
    },
    defaultNode: {
      type: "icon-node",
      anchorPoints: [
        [0.5, 0],
        [0.5, 1],
      ],
      size: [200, 40],
      textAlign: "center", // 设置文本居中
      style: defaultNodeStyle,
      labelCfg: defaultLabelCfg,
    },
    defaultEdge: {
      type: "flow-line",
      style: defaultEdgeStyle,
    },
    nodeStateStyles: defaultStateStyles,
    edgeStateStyles: defaultStateStyles,
    layout: defaultLayout,
  });

  graph.data(d);
  graph.render();
  graph.fitView();

  // graph.on('node:mouseenter', (evt) => {
  //   const { item } = evt;
  //   graph.setItemState(item, 'hover', true);
  // });

  // graph.on('node:mouseleave', (evt) => {
  //   const { item } = evt;
  //   graph.setItemState(item, 'hover', false);
  // });

  // graph.on('node:click', (evt) => {
  //   const { item, target } = evt;
  //   const targetType = target.get('type');
  //   const name = target.get('name');

  //   // 增加元素
  //   if (targetType === 'marker') {
  //     const model = item.getModel();
  //     if (name === 'add-item') {
  //       if (!model.children) {
  //         model.children = [];
  //       }
  //       const id = `n-${Math.random()}`;
  //       model.children.push({
  //         id,
  //         label: id.substr(0, 8),
  //         leftIcon: {
  //           style: {
  //             fill: '#e6fffb',
  //             stroke: '#e6fffb',
  //           },
  //           img:
  //             'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Q_FQT6nwEC8AAAAAAAAAAABkARQnAQ',
  //         },
  //       });
  //       graph.updateChild(model, model.id);
  //     } else if (name === 'remove-item') {
  //       graph.removeChild(model.id);
  //     }
  //   }
  // });

  // if (typeof window !== 'undefined') {
  //   window.onresize = () => {
  //     if (!graph || graph.get('destroyed')) return;
  //     if (!container || !container.scrollWidth || !container.scrollHeight) return;
  //     graph.changeSize(container.scrollWidth, container.scrollHeight);
  //   };
  // }
}

// 注册节点左侧icon
// G6.Util.traverseTree(data, (d) => {
//   d.leftIcon = {
//     style: {
//       fill: '#e6fffb',
//       stroke: '#e6fffb',
//     },
//     img: 'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Q_FQT6nwEC8AAAAAAAAAAABkARQnAQ',
//   };
//   return true;
// });

G6.registerNode(
  "icon-node",
  {
    options: {
      size: [60, 20],
      stroke: "red",
      fill: "red",
    },
    draw(cfg, group) {
      const styles = this.getShapeStyle(cfg);
      const { labelCfg = {} } = cfg;

      const w = styles.width;
      const h = styles.height;

      if (cfg.point_id == "1") {
        styles.fill = "#3470FF";
      }
      const keyShape = group.addShape("rect", {
        attrs: {
          ...styles,
          x: -w / 2,
          y: -h / 2,
        },
      });
      // console.log("cfg----------:", cfg);
      if (cfg.point_id == "1") {
        group.addShape("text", {
          attrs: {
            ...labelCfg.style,
            fill: "#fff",
            text: cfg.point_type,
            // width: getName(cfg.point_type).length * 14,
          },
        });
      }
      if (cfg.point_type == "主要人员") {
        // group.addShape('rect', {
        //   attrs: {
        //     x: 1 - w / 2,
        //     y: 1 - h / 2,
        //     width: 38,
        //     height: styles.height - 2,
        //     fill: '#8c8c8c',
        //     // ...style,
        //   },
        // });
        group.addShape("text", {
          attrs: {
            ...labelCfg.style,
            text: getName(cfg.point_message),
            width: getName(cfg.point_message).length * 14,
          },
        });
      }

      if (cfg.point_message) {
        group.addShape("text", {
          attrs: {
            ...labelCfg.style,
            text: getName(cfg.point_message),
            width: getName(cfg.point_message).length * 14,
            // x: 2,
            // y: 25 - h / 2,
          },
        });
      }

      return keyShape;
    },
    update: undefined,
  },
  "rect"
);

// 边绘制为折线
G6.registerEdge("flow-line", {
  draw(cfg, group) {
    const startPoint = cfg.startPoint;
    const endPoint = cfg.endPoint;
    const { style } = cfg;
    console.log("边msg-----------:", cfg.targetNode._cfg.model);
    console.log("边-----------:", cfg);
    const shape = group.addShape("path", {
      attrs: {
        stroke: style.stroke,
        endArrow: style.endArrow,
        path: [
          ["M", startPoint.x, startPoint.y],
          ["L", startPoint.x, (startPoint.y + endPoint.y) / 2],
          ["L", endPoint.x, (startPoint.y + endPoint.y) / 2],
          ["L", endPoint.x, endPoint.y],
        ],
      },
    });
    if (cfg.targetNode._cfg.model.point_message["职位"]) {
      const label = cfg.targetNode._cfg.model.point_message["职位"];
      group.addShape("text", {
        attrs: {
          text: label,
          x: endPoint.x + 4,
          y: (startPoint.y + endPoint.y) / 2,
          fill: "green",
          stroke: "#fff",
        },
        name: "text-node",
      });
    }

    if (cfg.targetNode._cfg.model.point_type == "控股企业") {
      const label = "控股企业";
      group.addShape("text", {
        attrs: {
          text: label,
          x: endPoint.x + 4,
          y: (startPoint.y + endPoint.y) / 2,
          fill: "#4ea2f0",
          stroke: "#fff",
        },
        name: "text-node",
      });
    }
    return shape;
  },
});

function getName(d) {
  let m = "";
  Object.keys(d).forEach((item, i) => {
    if (i == 0) {
      m = d[item];
    }
  });
  return m;
}
</script>
