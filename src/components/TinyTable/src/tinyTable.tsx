import { defineComponent, h } from "vue";
import { ElTable, ElTableColumn, ElButton } from "element-plus";
import { TinyTableProps } from "./props";
import { BasicColumn, TableColumnScope } from "./types/table";
import "element-plus/es/components/table/style/css";
import { checkPermission } from "@/directive/permission";

export default defineComponent({
  name: "TinyTable",
  props: TinyTableProps,
  setup(props) {
    // 检测是否有固定列
    const hasFixedColumn = computed(() =>
      props.columns.some(
        (column) => column.fixed === true || column.fixed === "left"
      )
    );

    // base Column
    const createBaseColumn = (column: BasicColumn) => {
      // 检测是否为操作列
      if (column.isActionColumn) {
        return (
          <ElTableColumn key={column.prop} {...column} v-memo={[column]}>
            {{
              default: (scope: TableColumnScope) => {
                return (
                  <div>
                    {column.actions?.map((action) => {
                      const vHasPerm = action["v-has-perm"];
                      const hasPermission =
                        (vHasPerm && checkPermission(vHasPerm)) ||
                        vHasPerm == undefined;
                      if (hasPermission) {
                        return (
                          <ElButton
                            type="text"
                            onClick={() => action.action(scope)}
                          >
                            {action.label}
                          </ElButton>
                        );
                      }
                      return null;
                    })}
                  </div>
                );
              },
            }}
          </ElTableColumn>
        );
      } else {
        // 其他普通列的处理
        return (
          <ElTableColumn key={column.prop} {...column} v-memo={[column]}>
            {{
              default: (scope: TableColumnScope) => {
                const { row, column, $index } = scope;
                return column.render
                  ? column.render(row, column, $index)
                  : column.prop && row[column.prop];
              },
            }}
          </ElTableColumn>
        );
      }
    };

    // index Column
    const IndexColumn = () => (
      <ElTableColumn
        align="center"
        width="60"
        label="序号"
        type="index"
        fixed={hasFixedColumn.value ? "left" : false}
      />
    );

    // selection Column
    const SelectionColumn = () => (
      <ElTableColumn
        align="center"
        type="selection"
        fixed={hasFixedColumn.value ? "left" : false}
      />
    );

    return () => (
      <ElTable data={props.tableData}>
        {props.showSelectColumn && <SelectionColumn />}
        {props.showIndexColumn && <IndexColumn />}
        {props.columns.map(createBaseColumn)}
      </ElTable>
    );
  },
});
