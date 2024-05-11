<template>
  <div>
    <div v-if="info?.result && info?.result.length < 15" class="risk-result" @click="handleResult">
      {{ info?.result }}
    </div>
    <w-tooltip v-else>
      <div class="risk-result" @click="handleResult">
        {{ info?.result.substring(0, 14) }}...
      </div>
      <template #content>{{ info?.result }}</template>
    </w-tooltip>
    <w-modal v-model:visible="dialogTableVisible" ok-text="知道了" :hide-cancel="true" :width="1200">
      <template #title>
        <div class="modal-header flex-base-start">
          <img src="@/assets/base/waring.svg">
          <div class="risk-title">{{ info?.name }}异常</div>
        </div>
      </template>
      <el-tabs type="card" v-if="sourceList.length > 1">
        <el-tab-pane :label="item.key" v-for="(item, i) in sourceList" :key="i">
          <abnormal-ty v-if="riskType == abnormalStatus.TY" :info="item" :columns="columns"></abnormal-ty>
          <abnormal-djpl v-else-if="riskType == abnormalStatus.DJPL" :info="item" :columns="columns"></abnormal-djpl>
          <abnormal-cfwjy v-else-if="riskType == abnormalStatus.CFWJY" :info="item" :columns="columns"></abnormal-cfwjy>
          <abnormal-jxxsp v-else-if="riskType == abnormalStatus.JXXSP" :info="item"></abnormal-jxxsp>
          <abnormal-glyc v-else-if="riskType == abnormalStatus.GLYC" :info="item" :columns="columns"></abnormal-glyc>
          <abnormal-htzt v-else-if="riskType == abnormalStatus.HTZT" :info="item" :columns="columns"></abnormal-htzt>
          <abnormal-jygm v-else-if="riskType == abnormalStatus.JYGM" :info="item" :columns="columns"></abnormal-jygm>
        </el-tab-pane>
      </el-tabs>
      <div v-else>
        <abnormal-ty v-if="riskType == abnormalStatus.TY" :info="sourceList[0] || []" :columns="columns"></abnormal-ty>
        <abnormal-djpl v-else-if="riskType == abnormalStatus.DJPL" :info="sourceList[0] || []" :columns="columns"></abnormal-djpl>
        <abnormal-cfwjy v-else-if="riskType == abnormalStatus.CFWJY" :info="sourceList[0] || []" :columns="columns"></abnormal-cfwjy>
        <abnormal-jxxsp v-else-if="riskType == abnormalStatus.JXXSP" :info="sourceList[0] || []"></abnormal-jxxsp>
        <abnormal-glyc v-else-if="riskType == abnormalStatus.GLYC" :info="sourceList[0] || []" :columns="columns"></abnormal-glyc>
        <abnormal-htzt v-else-if="riskType == abnormalStatus.HTZT" :info="sourceList[0] || []" :fieldMapping="info.fieldMapping"></abnormal-htzt>
        <abnormal-jygm v-else-if="riskType == abnormalStatus.JYGM" :info="sourceList[0] || []" :columns="columns"></abnormal-jygm>
      </div>
    </w-modal>
  </div>
</template>

<script setup lang="ts">

// 已联调：
// htzt 6 合同主体一致性
// ty 1 通用
// JXXSP 4  
// cfwjy 3 超范围经营
// TODO: 待联调
// DJPL 2 单价偏理性异常
// GLYC 5 关联交易检测
// JYGM 7 交易规模合理性

import { ref, computed } from 'vue'
import { abnormalStatus } from './type'

const props = defineProps({
  info: { // 风险信息
    default: {
      result: '',
      source: '',
      fieldMapping:'',
      handleMethod: -1,
      name: ''
    }
  }
})

const dialogTableVisible = ref(false)
const riskType = ref(-1); // 根据风险类型控制页面显示
const columns = ref([])
const sourceList = ref([])

const getWidth = computed(() => {
  if(riskType.value == 1){
    return 900;
  } else {
    return 1200;
  }
})

// 处理数据，生成columns
function formateWord(d: any) {
  columns.value = []
  const arr = [{
    title: "序号",
    dataIndex: "index",
    slotName: 'index',
    width: 80,
  }]
  Object.keys(d).forEach(item => {
    let cur = {
      title: d[item],
      dataIndex: item,
      width: d[item].length * 28,
      ellipsis: true,
      tooltip: {position: 'left'},
    }
    arr.push(cur as any)
  })
  columns.value = arr as any;
}


// 处理字段对应关系
function handleResult() {
  dialogTableVisible.value = true;
  riskType.value = props.info.handleMethod
  if(props.info.source) {
    sourceList.value = JSON.parse(props.info.source)
  }
  props.info.fieldMapping && formateWord(JSON.parse(props.info.fieldMapping)); // 字段对应关系
  // console.log('source--------------:', JSON.parse(props.info.source))
  // console.log('map--------------:', columns.value)
}

</script>

<style scoped lang="scss">
:deep(.w-modal-body) {
  padding: 0 !important;
}
.modal-header {
  width: 100%;
}
.risk-result {
  color:#3470FF;
  cursor: pointer;
  overflow:hidden;
  text-overflow:ellipsis;//文本溢出显示省略号
  white-space:nowrap;//文本不会换行
}
.risk-title {
  font-family: PingFangSC, PingFang SC;
  font-weight: 600;
  font-size: 18px;
  color: #383B40;
  text-align: left;
  font-style: normal;
  margin-left: 12px;
}
// :deep(.el-dialog__header) {
//   border-bottom: none;
// }
// :deep(.el-dialog__footer) {
//   border-top: none;
// }
</style>
