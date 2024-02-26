import { defineComponent, h } from "vue";
import { ElTable, ElTableColumn, ElButton, ElStep } from "element-plus";
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
      return (
        <ElTableColumn key={column.prop} {...column}>
          {{
            default: (scope: TableColumnScope) => {
              // 访问当前行的数据和索引
              const { row } = scope;
              // 直接使用 column 中的属性，例如 column.prop
              const columnValue = column.prop ? row[column.prop] : null;

              if (column.isActionColumn && column.actions) {
                return (
                  <div>
                    {column.actions.map((action, index) => {
                      // 示例：根据权限或其他条件显示按钮
                      const isShow =
                        (action["v-has-perm"] &&
                          checkPermission(action["v-has-perm"])) ||
                        !Object.hasOwn(action, "v-has-perm");
                      if (!isShow) {
                        return null;
                      }
                      return (
                        <ElButton
                          key={index}
                          link
                          type="primary"
                          onClick={() => action.action(scope)}
                        >
                          {action.label}
                        </ElButton>
                      );
                    })}
                  </div>
                );
              } else {
                return column.render ? column.render(scope) : columnValue;
              }
            },
          }}
        </ElTableColumn>
      );
    };

    // index Column
    const IndexColumn = () => (
      <ElTableColumn
        align="center"
        width="60"
        label="序号"
        type="index"
        fixed={hasFixedColumn.value ? "left" : true}
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
