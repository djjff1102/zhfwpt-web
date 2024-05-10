<template>
  <div class="content-one">
    <div class="risk-result">
      <threeRow :info="info.error"></threeRow>
    </div>
    <m-table
      :columns="columnsData"
      :data="table"
      style="height: 100%"
      :pagination="false"
      :scroll="scroll"
    >
    <template v-slot:index="{ rowIndex }">
      {{ rowIndex + 1 }}
    </template>
  </m-table>
  </div>
</template>

<script setup>
import { watch, ref } from 'vue'
import threeRow from './threeRow.vue'

const table = ref([])
const columnsData = ref([])

const props = defineProps({
  info: { // 风险信息
    default: {}
  },
  fieldMapping: {
    default: ''
  }
})

const scroll = ref({
  y: 300,
});

watch(() => props.info, (v) => {
  if(v) {
    init(v)
  }
}, {
  deep: true,
  immediate: true
})

function init(v) {
  let fieldMapping = JSON.parse(props.fieldMapping)
  let source = v.source[0]
  let tableData = []
  let columns = []
  Object.keys(fieldMapping).forEach((item ,i) => {
    const row = {
      index: item,
    }
    if(i == 0) {
      let columnsItem = {
        title: "",
        dataIndex: "index",
        slotName: 'rowIndex'
      }
      columns.push(columnsItem)
    }
    fieldMapping[item].forEach((d, j) => { // 遍历一次生成table的row 数据
      let key = item + d; // 以这个key在source中取值
      row['row'+j] = source[key] || '';
      if(i == 0) {
        let columnsItem = {
          title: d,
          dataIndex: 'row'+j
        }
        columns.push(columnsItem)
      }
    })
    tableData.push(row)
  })
  table.value = tableData;
  columnsData.value = columns;
}

</script>

<style lang="scss" scoped>
.three-row {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;/*省略几行写几*/
    -webkit-box-orient: vertical;
    cursor: pointer;
}
.content-one {
  padding: 16px 24px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 14px;
  color: #000000;
  line-height: 20px;
  text-align: left;
  font-style: normal;
  .risk-result {
    background: #FFF4E5;
    border-radius: 8px;
    border: 1px solid #FF9100;
    padding: 14px;
    margin-bottom: 18px;
  }
  .risk-reason {
    margin-top: 16px;
    display: flex;
    justify-content: flex-start;
    div:first-child {
      flex-shrink: 0;
    }
  }
}
:deep(.el-descriptions__cell) {
  width: 100px;
}
:deep(.w-table-tr .w-table-td:first-child) {
background: #eef6ff !important;
}
</style>
