import { VNodeChild } from "vue";
export interface ColumnFilterItem {
  text?: string;
  value?: string;
  children?: any;
}

export declare type SortOrder = "ascend" | "descend";

export interface RecordProps<T> {
  text: any;
  record: T;
  index: number;
}
