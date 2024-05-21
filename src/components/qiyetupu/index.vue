<template>
  <div class="g-bg" ref="fullRef" >
    <div :id="id"></div>
    <w-button class="full-window" @click="toggleFullscreen">
      <div class="full-btn">
        <img src="@/assets/fullwindow.svg">
      {{ fullFlag ? '退出': '全屏' }}
      </div>
    </w-button>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { countCharacters } from '@/utils/common'
import G6 from "@antv/g6";
import {
  COLLAPSE_ICON,
  EXPAND_ICON,
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
const fullRef = ref()

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
const windowHeight = ref(0)
const gr = ref()
const fullFlag = ref(false)

window.addEventListener("resize", getWindow());
getWindow();

// 点击esc按钮或者浏览器退出的时候，↩↩️恢复侧边栏
document.addEventListener('fullscreenchange', event => {
  if (!document.fullscreenElement) {
    fullFlag.value = false
    gr.value.changeSize( windowWidth.value * (2/3), 200 )
    gr.value.removeBehaviors(['collapse-expand','drag-canvas', 'zoom-canvas'], 'default');
    gr.value.fitView();
  } else {
    fullFlag.value = true
    gr.value.changeSize( windowWidth.value - 60, windowHeight.value - 60 )
    gr.value.addBehaviors([{
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
    },'drag-canvas', 'zoom-canvas'], 'default');
    gr.value.fitView()
  }
})

// 全屏
function toggleFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    fullRef.value.requestFullscreen().catch(err => {
      console.error('进入全屏失败:', err);
    });
  }
}

function getWindow() {
  windowWidth.value = document.documentElement.clientWidth || document.body.clientWidth;
  windowHeight.value = document.documentElement.clientHeight || document.body.clientHeight;
}

function init(d) {
  const graph = new G6.TreeGraph({
    container: props.id,
    width: windowWidth.value * (2/3), // 因为右侧导航栏，调整一下图的居中位置
    height: 200,
    // linkCenter: true,
    modes: {
      default: [
        // {
        //   type: "collapse-expand",
        //   onChange: function onChange(item, collapsed) {
        //     var data = item.get("model");
        //     var icon = item.get("group").findByClassName("collapse-icon");
        //     if (collapsed) {
        //       icon.attr("symbol", EXPAND_ICON);
        //     } else {
        //       icon.attr("symbol", COLLAPSE_ICON);
        //     }
        //     data.collapsed = collapsed;
        //     return true;
        //   },
        // },
        // "drag-canvas",
        // "zoom-canvas",
      ],
    },
    defaultNode: {
      type: "icon-node-en",
      anchorPoints: [
        [0, 0.5], 
        [1, 0.5],
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
  // graph.fitCenter()
  gr.value = graph;
}

G6.registerNode(
  "icon-node-en",
  {
    draw(cfg, group) {
      const styles = this.getShapeStyle(cfg);
      const { labelCfg = {} } = cfg;
      // console.log("node---cfg=====", cfg);
      // console.log("node----styles=======", styles);
      const w = styles.width;
      const h = styles.height;
      if (cfg.point_type == 1) {
        styles.fill = "#3470FF";
      }
      if (cfg.point_type == 2) {
        styles.stroke = "rgba(252, 252, 252, 1)"
        styles.fill = "rgba(252, 252, 252, 1)"
      }
      styles.width = Math.max(countCharacters(cfg.point_name) * 10 + 10, 200) 
      const keyShape = group.addShape("rect", {
        attrs: {
          ...styles,
          x: -((styles.width - 200) + styles.width) / 2,
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
          className: "collapse-icon",
        });
      } else if (cfg.point_type == 2) {
        const textObj = group.addShape("text", {
          attrs: {
            ...labelCfg.style,
            text: cfg.point_name,
            // x: -((styles.width - 200) + styles.width) / 2,
            // y: -h / 2,
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
            x: -((styles.width - 200)) / 2,
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
          ["L", (startPoint.x + endPoint.x) / 2, ( startPoint.y)],
          ["L", (startPoint.x + endPoint.x) / 2, ( endPoint.y)],
          ["L", endPoint.x, endPoint.y],
        ],
      },
    });
    return shape;
  },
});
</script>

<style lang="scss" scoped>
.full-btn {
  display: flex;
  align-items: center;
  img {
    display: block;
    margin-top: 2px;
  }
}
.g-bg {
  padding: 24px;
  background: rgba(252, 252, 252, 1);
}
.full-window {
  position: absolute;
  top: 25px;
  right: 10%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
}
.full-bg {
  position: fixed;
  top:0;
  width: 100%;
  bottom: 0;
  z-index: 99999;
}
</style>