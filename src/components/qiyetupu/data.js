export const COLLAPSE_ICON = function COLLAPSE_ICON(x, y, r) {
  return [
    ["M", x - r, y - r],
    ["a", r, r, 0, 1, 0, r * 2, 0],
    ["a", r, r, 0, 1, 0, -r * 2, 0],
    ["M", x + 2 - r, y - r],
    ["L", x + r - 2, y - r],
  ];
};

export const EXPAND_ICON = function EXPAND_ICON(x, y, r) {
  return [
    ["M", x - r, y - r],
    ["a", r, r, 0, 1, 0, r * 2, 0],
    ["a", r, r, 0, 1, 0, -r * 2, 0],
    ["M", x + 2 - r, y - r],
    ["L", x + r - 2, y - r],
    ["M", x, y - 2 * r + 2],
    ["L", x, y - 2],
  ];
};

export const defaultStateStyles = {
  hover: {
    stroke: "#1890ff",
    lineWidth: 2,
  },
};

export const defaultNodeStyle = {
  fill: "#ffffff",
  stroke: "rgba(52, 112, 255, 1)",
  radius: 5,
};

export const defaultEdgeStyle = {
  type: "polyline",
  stroke: "rgba(191, 196, 205, 0.5)",
  endArrow: false,
};

export const defaultLayout = {
  type: "mindmap",
  direction: "H", // V
  getId: function getId(d) {
    // d是一个node
    return d.id;
  },
  getHeight: function getHeight() {
    return 16;
  },
  getWidth: function getWidth() {
    return 200;
  },
  getVGap: function getVGap() {
    // 节点的水平间隙
    return 16;
  },
  getHGap: function getHGap() {
    // 节点的垂直间隙
    return 10;
  },
};

export const defaultLabelCfg = {
  style: {
    fill: "#000",
    fontSize: 12,
    textAlign: "center",
    textBaseline: "middle", // 设置文本垂直居中
  },
};
