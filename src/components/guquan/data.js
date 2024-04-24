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

const result = [
  {
    name: "莱佛公司",
    type: 1,
    id: "公司id",
    label: "莱佛公司",
    children: [
      {
        name: "李某某",
        id: "用户id",
        label: "法定代表人", // 角色
      },
    ],
  },
];

export const data = {
  id: "公司id",
  label: "莱佛公司",
  children: [
    {
      id: "c1",
      label: "c1",
      children: [
        {
          id: "c1-1",
          label: "c1-1",
        },
        {
          id: "c1-2",
          label: "c1-2",
        },
      ],
    },
    {
      id: "c2",
      label: "c2",
    },
  ],
};

export const defaultStateStyles = {
  hover: {
    stroke: "#1890ff",
    lineWidth: 2,
  },
};

export const defaultNodeStyle = {
  fill: "#91d5ff",
  stroke: "#40a9ff",
  radius: 5,
};

export const defaultEdgeStyle = {
  stroke: "#91d5ff",
  endArrow: {
    path: "M 0,0 L 12, 6 L 9,0 L 12, -6 Z",
    fill: "#91d5ff",
    d: -20,
  },
};

export const defaultLayout = {
  type: "compactBox",
  direction: "TB", // V
  getId: function getId(d) {
    // d是一个node
    return d.id;
  },
  getHeight: function getHeight() {
    return 16;
  },
  getWidth: function getWidth() {
    return 16;
  },
  getVGap: function getVGap() {
    // 节点的水平间隙
    return 40;
  },
  getHGap: function getHGap() {
    // 节点的垂直间隙
    return 70;
  },
};

export const defaultLabelCfg = {
  style: {
    fill: "#000",
    fontSize: 12,
  },
};
