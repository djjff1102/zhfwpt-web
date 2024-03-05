import { DeptForm } from "@/api/dept/types";

export type openDialogProps = (param?: DeptForm | string) => void;
export type handleDeleteProps = (deptId?: string) => void;

export const getDeptColumns = (
  openDialog: openDialogProps,
  handleDelete: handleDeleteProps
): BaseColumn[] => [
  {
    prop: "name",
    label: "部门名称",
  },
  {
    label: "操作",
    isActionColumn: true,
    width: 200,
    align: "left",
    fixed: "right",
    actions: [
      {
        label: "新增",
        "v-has-perm": ["107"],
        action: (scope) => {
          openDialog(scope.row.id);
        },
      },
      {
        label: "编辑",
        "v-has-perm": ["108"],
        action: (scope) => {
          openDialog(scope.row);
        },
      },
      {
        label: "删除",
        type: "danger",
        "v-has-perm": ["109"],
        action: (scope) => {
          handleDelete(scope.row.id);
        },
      },
    ],
  },
];
