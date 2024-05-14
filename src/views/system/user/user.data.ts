import { UserPageVO } from "@/api/user/types";
import { ElSwitch } from "element-plus";

export type UserActionProps = (row: UserPageVO) => void;
export type handleDeleteProps = (id: string) => void;

export const getUserColumns = (
  handleStatusChange: UserActionProps,
  resetPassword: UserActionProps,
  openDialog: UserActionProps,
  handleDelete: handleDeleteProps
): BaseColumn[] => {
  return [
    {
      prop: "name",
      label: "用户名",
      width: 140,
      showOverflowTooltip: true,
      fixed: "left",
    },
    {
      prop: "real_name",
      label: "真实姓名",
      width: 140,
      // align: "center",
    },
    {
      prop: "organization_name",
      label: "部门",
      width: 160,
      // align: "center",
      showOverflowTooltip: true,
    },
    {
      prop: "role_name",
      width: 120,
      label: "角色",
      // align: "center",
    },
    {
      prop: "enable_flag",
      label: "状态",
      width: 120,
      // align: "center",
      render: (scope) => {
        const { row, column } = scope;
        return h(ElSwitch, {
          modelValue: row[column.property],
          onChange: () =>
            handleStatusChange({
              ...row,
              [column.property]: !row[column.property],
            }),
        });
      },
    },
    {
      prop: "create_date",
      label: "添加时间",
      width: 180,
      // align: "center",
    },
    {
      label: "操作",
      isActionColumn: true,
      fixed: "right",
      width: 220,
      actions: [
        {
          label: "重置密码",
          action: (scope) => {
            resetPassword(scope.row);
          },
        },
        {
          label: "编辑",
          action: (scope) => {
            openDialog(scope.row);
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

export const levelList: OptionType[] = [
  {
    value: "",
    label: "全部",
  },
  {
    value: true,
    label: "本级",
  },
  {
    value: false,
    label: "下级",
  },
];
