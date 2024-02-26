import { propTypes } from "@/utils/propTypes";
import { BasicColumn } from "./types/table";

export const TinyTableProps = {
  // 标题
  title: {
    type: [String, Function] as PropType<
      string | ((data: Recordable) => string)
    >,
    default: null,
  },
  // 接口
  api: {
    type: Function as PropType<(...arg: any[]) => Promise<any>>,
    default: null,
  },
  tableData: {
    type: Array as any,
    default: () => [],
  },
  // 列配置
  columns: {
    type: Array as PropType<BasicColumn[]>,
    default: () => [],
  },
  // 是否启用search （需要配合easysearch）
  useSearchForm: propTypes.bool,
  // show index
  showIndexColumn: { type: Boolean, default: false },
  // show checkbox
  showSelectColumn: { type: Boolean, default: false },
};
