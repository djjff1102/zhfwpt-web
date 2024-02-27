import { MenuVO } from "@/api/menu/types";
import { ElSwitch } from "element-plus";

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

export type updateMenuItemProps = (row: MenuVO) => void;
export type openDialogProps = (
  type: MenuDialogConfigEnum,
  row?: MenuVO
) => void;
export type openFunctionDialogProps = (menuId: string) => void;
export type handleDeleteProps = (menuId: string) => void;

export function getMenuColumns(
  updateMenuItem: updateMenuItemProps,
  openDialog: openDialogProps,
  openFunctionDialog: openFunctionDialogProps,
  handleDelete: handleDeleteProps
): BaseColumn[] {
  return [
    {
      prop: "name",
      label: "菜单",
      minWidth: 250,
      showOverflowTooltip: true,
    },
    {
      label: "路由路径",
      align: "left",
      minWidth: 250,
      prop: "routing_address",
    },
    {
      label: "路由编码",
      prop: "code",
      align: "left",
    },
    {
      label: "排序",
      prop: "sort",
      align: "center",
    },
    {
      label: "状态",
      prop: "enable_flag",
      render: (scope) => {
        const { row, column } = scope;
        return h(ElSwitch, {
          modelValue: row[column.property],
          onChange: () =>
            updateMenuItem({
              ...row,
              [column.property]: !row[column.property],
            }),
        });
      },
    },
    {
      label: "备注",
      prop: "remark",
      align: "left",
      minWidth: 250,
      showOverflowTooltip: true,
    },
    {
      label: "操作",
      isActionColumn: true,
      fixed: "right",
      width: 320,
      actions: [
        {
          label: "编辑",
          action: (scope) => {
            openDialog(MenuDialogConfigEnum.UPDATE_MENU, scope.row);
          },
        },
        {
          label: "子菜单配置",
          action: (scope) => {
            openDialog(MenuDialogConfigEnum.ADD_SUB_MENU, scope.row);
          },
        },
        {
          label: "功能配置",
          action: (scope) => {
            openFunctionDialog(scope.row.id);
          },
        },
        {
          label: "删除",
          type: "danger",
          action: (scope) => {
            handleDelete(scope.row.id);
          },
        },
      ],
    },
  ];
}
