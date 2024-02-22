/**
 * 菜单类型options
 */
export const menuTypeOptions: OptionType[] = [
  {
    value: 4,
    label: "包",
  },
  {
    value: 1,
    label: "菜单",
  },
];

/**
 * 资源类型options
 */
export const sourceOptions: OptionType[] = [
  {
    value: "2",
    label: "按钮",
  },
  {
    value: "5",
    label: "页面",
  },
];

export enum MenuDialogConfigEnum {
  ADD_MENU = "addMenu",
  UPDATE_MENU = "updateMenu",
  ADD_SUB_MENU = "addSubMenu",
}

export enum ResourceDialogConfigEnum {
  ADD_RESOURCE = "addResource",
  UPDATE_RESOURCE = "updateResource",
}
