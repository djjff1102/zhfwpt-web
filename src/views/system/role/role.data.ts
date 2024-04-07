import { RolePageVO } from "@/api/role/types";

export const areaTypeOptions: OptionType[] = [
  {
    value: 1,
    label: "税务",
  },
  {
    value: 2,
    label: "企业",
  },
];

export const enum RoleDialogConfigEnum {
  /**
   * 添加角色
   */
  CREATE_ROLE = "createRole",
  /**
   * 编辑角色
   */
  UPDATE_ROLE = "updateRole",
  /**
   * 菜单权限
   */
  AUTHORITY_ROLE = "authorityRole",
  /**
   * 信息权限
   */
  INFOR_PERMISSION_ROLE = "infoPermissionRole",
}

export type openMenuDialogProps = (
  type: RoleDialogConfigEnum,
  row?: RolePageVO
) => void;
export type handleDeleteProps = (roleId: string) => void;

export const getRoleColumns = (
  openMenuDialog: openMenuDialogProps,
  handleDelete: handleDeleteProps
): BaseColumn[] => {
  return [
    {
      label: "角色名称",
      prop: "name",
      minWidth: 100,
    },
    {
      label: "层级",
      prop: "area_type",
      width: 100,
      render: (scope) => {
        const { row, column } = scope;
        const areaTypeString =
          areaTypeOptions.find((o) => o.value === row[column.property])
            ?.label || "";
        return areaTypeString;
      },
    },
    {
      label: "描述",
      prop: "remark",
      width: 150,
      showOverflowTooltip: true,
    },
    {
      label: "创建人",
      prop: "create_user_name",
      width: 100,
      showOverflowTooltip: true,
    },
    {
      label: "创建时间",
      prop: "create_date",
      width: 180,
    },
    {
      label: "操作",
      isActionColumn: true,
      width: 320,
      actions: [
        {
          label: "编辑",
          action: (scope) => {
            openMenuDialog(RoleDialogConfigEnum.UPDATE_ROLE, scope.row);
          },
        },
        {
          label: "菜单权限",
          action: (scope) => {
            openMenuDialog(RoleDialogConfigEnum.AUTHORITY_ROLE, scope.row);
          },
        },
        {
          label: "信息权限",
          action: (scope) => {
            openMenuDialog(
              RoleDialogConfigEnum.INFOR_PERMISSION_ROLE,
              scope.row
            );
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
};
