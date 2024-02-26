import { ElTableColumn } from "element-plus/es";

export interface TableColumnScope<T = any> {
  row: T;
  $index: number;
  column: {
    prop?: string;
    label?: string;
    [key: string]: any;
  };
}

type actionProps = {
  label: string;
  action: (scope: TableColumnScope) => void;
  [key: string]: any;
};

// 必填字段
type RequiredProps = {
  label: string;
};

type ActionColumn = {
  isActionColumn: boolean;
  prop?: string;
  actions: actionProps[];
};

type DataColumn = {
  isActionColumn?: boolean;
  prop: string;
  actions?: actionProps[];
};

type TableColumnProps = Parameters<
  Exclude<(typeof ElTableColumn)["setup"], undefined>
>[0];

export type BasicColumn = RequiredProps &
  (ActionColumn | DataColumn) &
  Partial<TableColumnProps> & {
    render?: (...args: any[]) => VNode;
  };

export interface BasicTableProps<T = any> {
  columns: BasicColumn[];
  dataSource: T[];
  pagination?: any;
  loading?: boolean;
  bordered?: boolean;
  size?: "default" | "small" | "large";
  showIndexColumn?: boolean;
  showSelectColumn?: boolean;
}
