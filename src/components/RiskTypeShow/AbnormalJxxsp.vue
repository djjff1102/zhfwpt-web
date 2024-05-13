<template>
  <div class="content-one">
    <div class="flex-base-around">
      <span class="bar-name">进项数量</span>
      <span class="bar-unit">单位：{{ unit }}</span>
      <span class="bar-name">销项数量</span>
    </div>
    <div class="risk-reason flex-base-center">
      <line-echart :echartData="echartData"></line-echart>
    </div>
  </div>
</template>

<script setup>
import { watch, ref } from 'vue'
const echartData = ref({
  left: [],
  right: [],
  yValue: []
})
const unit = ref()

const props = defineProps({
  info: { // 风险信息
    default: {}
  }
})

const scroll = ref({
  y: 300,
});

watch(() => props.info, (v) => {
  if(v) {
    nextTick(() => {
      handleData(v)
    })
  }
}, {
  immediate: true
})

function handleData(d) {
  console.log('进销项异常传入----------：', d)
  const left = []
  const right = []
  const yValue = []
  const otherSource = d.other_source;
  d.source.forEach((e, i) => {
    yValue.push(e.goodName);
    left.push(e.quantity);
    right.push(otherSource[i].quantity)
    unit.value = otherSource[i].unit
  });
  echartData.value.left = left
  echartData.value.right = right
  echartData.value.yValue = yValue
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
  // padding: 16px 24px;
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
.bar-unit {
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 14px;
  color: #999999;
  line-height: 20px;
  font-style: normal;
}
.bar-name {
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 20px;
  color: #333333;
  line-height: 22px;
  text-align: center;
  font-style: normal;
}
</style>
