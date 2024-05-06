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

const colorObj = {
  主要人员: "#379C0D",
  对外投资: "#2691E8",
  法定代表人: "#D3AF07",
  最终受益人: "#FF7B44",
  股东信息: "#00E1E1",
  分支机构: "#2691E8",
};

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
        // d.children.forEach((e) => {
        //   delete e.children;
        // });
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
    height: 500,
    linkCenter: true,
    modes: {
      default: [
        {
          type: "collapse-expand",
          onChange: function onChange(item, collapsed) {
            var data = item.get("model");
            var icon = item.get("group").findByClassName("collapse-icon");
            if (collapsed) {
              icon.attr("symbol", EXPAND_ICON);
            } else {
              icon.attr("symbol", COLLAPSE_ICON);
            }
            data.collapsed = collapsed;
            return true;
          },
        },
        "drag-canvas",
        "zoom-canvas",
      ],
    },
    defaultNode: {
      type: "icon-node-en",
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
      type: "flow-line-en",
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
  "icon-node-en",
  {
    draw(cfg, group) {
      const styles = this.getShapeStyle(cfg);
      const { labelCfg = {} } = cfg;
      // console.log("cfg=", cfg);
      // console.log("styles=", styles);
      const w = styles.width;
      const h = styles.height;
      if (cfg.point_type == 1) {
        styles.fill = "#3470FF";
      }
      if (cfg.point_type == 2) {
        styles.stroke = "#fff";
      }
      if(cfg.point_name.length > 12 ) {
        styles.width = cfg.point_name.length * 14;
      }
      const keyShape = group.addShape("rect", {
        attrs: {
          ...styles,
          x: -styles.width / 2,
          y: -h / 2,
        },
      });
      if (cfg.point_type == 1) {
        group.addShape("text", {
          attrs: {
            ...labelCfg.style,
            text: cfg.point_name,
            fill: "#fff",
            // width: getName(cfg.point_message).length * 14,
          },
        });
      } else if (cfg.point_type == 2) {
        const textObj = group.addShape("text", {
          attrs: {
            ...labelCfg.style,
            text: cfg.point_name,
          },
        });
        let textX = Math.floor(textObj.getBBox().maxX);
        var hasChildren = cfg.children && cfg.children.length > 0;
        if (hasChildren) {
          group.addShape("marker", {
            attrs: {
              x: textX + 14,
              y: h / 2 - 16,
              r: 6,
              symbol: COLLAPSE_ICON,
              stroke: "#3470FF",
              lineWidth: 1,
            },
            className: "collapse-icon",
          });
        }
        let color = colorObj[cfg.point_name] || "#379C0D";
        group.addShape("circle", {
          attrs: {
            // x: -(w - textX) / 2 + 34,
            x: -(textX + 14),
            y: 0,
            r: 6, // 圆的半径
            fill: color, // 小圆点的颜色
          },
          name: "circle-shape",
        });
      } else {
        // console.log("其他-------cfg", cfg);
        group.addShape("text", {
          attrs: {
            ...labelCfg.style,
            text: cfg.point_name,
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
G6.registerEdge("flow-line-en", {
  draw(cfg, group) {
    const startPoint = cfg.startPoint;
    const endPoint = cfg.endPoint;
    const { style } = cfg;
    // console.log("边-----------：", cfg);
    const shape = group.addShape("path", {
      attrs: {
        stroke: style.stroke,
        // endArrow: false,
        path: [
          ["M", startPoint.x, startPoint.y],
          ["L", startPoint.x, (startPoint.y + endPoint.y) / 2],
          ["L", endPoint.x, (startPoint.y + endPoint.y) / 2],
          ["L", endPoint.x, endPoint.y],
        ],
      },
    });
    return shape;
  },
});
</script>
