<template>
  <div class="g-bg" ref="fullRefGQ" >
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
const windowHeight = ref(0)
const gr = ref()
const fullFlag = ref(false)
const fullRefGQ = ref()

window.addEventListener("resize", getWindow());
getWindow();
function getWindow() {
  windowWidth.value =
    document.documentElement.clientWidth || document.body.clientWidth;
    windowHeight.value = document.documentElement.clientHeight || document.body.clientHeight;
}

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
    gr.value.addBehaviors(['collapse-expand', 'drag-canvas', 'zoom-canvas'], 'default');
    gr.value.fitView()
  }
})

// 全屏
function toggleFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    fullRefGQ.value.requestFullscreen().catch(err => {
      console.error('进入全屏失败:', err);
    });
  }
}

function init(d) {
  const graph = new G6.TreeGraph({
    container: props.id,
    width: windowWidth.value - 200, // 因为右侧导航栏，调整一下图的居中位置
    height: 300,
    linkCenter: true,
    modes: {
      default: [],
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
  // graph.fitView();
  graph.fitCenter()
  gr.value = graph
}

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
        if(cfg.point_type.length > 12) {
          styles.width = cfg.point_type.length * 14;
        }
      }
      let nodeMsg = ''
      if(cfg.point_type == '法定代表人') {
        nodeMsg = cfg.point_message['法定代表人']
      } else if(cfg.point_type == '控股企业') {
        nodeMsg = cfg.point_message['公司名称']
      }
      if(nodeMsg.length > 12 ) {
        styles.width = nodeMsg.length * 14;
      }
    
      const keyShape = group.addShape("rect", {
        attrs: {
          ...styles,
          x: -styles.width / 2,
          y: -h / 2,
        },
      });

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
      if (cfg.point_message) {
        group.addShape("text", {
          attrs: {
            ...labelCfg.style,
            text: nodeMsg,
            // width: getName(cfg.point_message).length * 14,
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
    // console.log("股权穿透-边msg-----------:", cfg.targetNode._cfg.model);
    // console.log("边-----------:", cfg);
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
    if (cfg.targetNode._cfg.model.point_message["股份占比"]) {
      const label = cfg.targetNode._cfg.model.point_message["股份占比"] * 100 + '%';
      group.addShape("text", {
        attrs: {
          text: label,
          x: endPoint.x + 4,
          y: (startPoint.y + endPoint.y) / 2,
          fill: "#3470FF",
          stroke: "#fff",
        },
        name: "text-node",
      });
    }
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
