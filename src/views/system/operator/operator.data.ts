export const operatorColumns: BaseColumn[] = [
  {
    prop: "organization",
    label: "部门",
    width: 300,
  },
  {
    prop: "role",
    label: "操作角色",
    width: 150,
  },
  {
    prop: "name",
    label: "操作人",
    width: 200,
    // align: "center",
    showOverflowTooltip: true,
  },
  {
    prop: "operationModule",
    label: "操作模块",
    width: 140,
    // align: "center",
    showOverflowTooltip: true,
  },
  {
    prop: "operationDescription",
    label: "操作描述",
    minWidth: 200,
    // align: "center",
    showOverflowTooltip: true,
  },
  {
    prop: "updateDate",
    label: "操作时间",
    width: 180,
    // align: "center",
  },
];
